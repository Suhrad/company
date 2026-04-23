import os
import re

migrations_dir = 'database/migrations'
duplicates = [
    'user_id', 'warehouse_id', 'product_id', 'client_id', 'company_id', 'employee_id', 
    'account_id', 'sale_id', 'purchase_id', 'provider_id', 'payment_method_id', 
    'department_id', 'category_id', 'sale_unit_id', 'sale_return_id', 'transfer_id', 
    'to_warehouse_id', 'to_account_id', 'role_id', 'quotation_id', 'purchase_return_id', 
    'project_id', 'from_warehouse_id', 'from_account_id', 'expense_category_id', 
    'deposit_category_id', 'currency_id', 'base_unit', 'subscription_id', 
    'purchase_unit_id', 'id'
]

def patch_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find table name
    table_match = re.search(r"Schema::(?:create|table)\s*\(\s*['\"]([^'\"]+)['\"]", content)
    if not table_match:
        return False

    table_name = table_match.group(1)
    modified = False

    def replace_func(match):
        nonlocal modified
        method = match.group(1)
        args_str = match.group(2)
        
        # Split args by comma, but be careful of quotes/arrays
        # For simplicity, we'll just check if it's a "drop" method or a "create" method
        
        if method.startswith('drop'):
            # First argument is the name
            m = re.search(r"['\"]([^'\"]+)['\"]", args_str)
            if m:
                name = m.group(1)
                # If it's a duplicate or already prefixed, we should ensure it has our prefix
                # To REVERT previous mess:
                if name.endswith('_idx') and name.startswith(table_name):
                    # Keep it as is if it's correct
                    return match.group(0)
                if name in duplicates:
                    new_name = f"{table_name}_{name}_idx"
                    modified = True
                    return f"->{method}('{new_name}')"
        else:
            # index, unique, foreign
            # If foreign, first is col, second is name
            # If index/unique, first can be name IF it's a string and the method only takes one arg, 
            # but usually first is column. 
            # Actually, $table->index('col') uses default naming.
            # $table->index('col', 'name') uses custom naming.
            
            # Find all quoted strings
            qs = re.findall(r"['\"]([^'\"]+)['\"]", args_str)
            if not qs:
                return match.group(0)
            
            # If foreign(COL, NAME) -> rename NAME
            if method == 'foreign' and len(qs) >= 2:
                col = qs[0]
                name = qs[1]
                if name in duplicates:
                    new_name = f"{table_name}_{name}_idx"
                    new_args = args_str.replace(f"'{name}'", f"'{new_name}'").replace(f'"{name}"', f'"{new_name}"')
                    modified = True
                    return f"->{method}({new_args})"
            
            # If index(COL, NAME) -> rename NAME
            if method in ['index', 'unique'] and len(qs) >= 2:
                col = qs[0]
                name = qs[1]
                if name in duplicates:
                    new_name = f"{table_name}_{name}_idx"
                    new_args = args_str.replace(f"'{name}'", f"'{new_name}'").replace(f'"{name}"', f'"{new_name}"')
                    modified = True
                    return f"->{method}({new_args})"
            
            # Special case: $table->integer('col')->index('name')
            # This is hard to catch with this regex, but we saw it in the logs.
            # Actually $table->integer('purchase_id')->index('purchase_id')
            # Here 'index('purchase_id')' has only one string. 
            # In this case, 'purchase_id' IS the name because it's chained to a column.
            if method in ['index', 'unique'] and len(qs) == 1:
                name = qs[0]
                if name in duplicates:
                    new_name = f"{table_name}_{name}_idx"
                    new_args = args_str.replace(f"'{name}'", f"'{new_name}'").replace(f'"{name}"', f'"{new_name}"')
                    modified = True
                    return f"->{method}({new_args})"

        return match.group(0)

    # REVERT previous mess first? 
    # Actually, let's just use a fresh copy if possible, but I can't.
    # I'll manually fix the 'combined_products' one first to see if I can run migrations.
    
    methods = "index|unique|foreign|dropIndex|dropUnique|dropForeign"
    new_content = re.sub(r"->(" + methods + r")\s*\(([^)]+)\)", replace_func, content)
    
    if modified:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

# STEP 1: Undo the mess by replacing [table]_[duplicate]_idx back to [duplicate]
# ONLY if the column name was accidentally replaced. 
# This is hard. I'll just use a smarter script that targets ONLY the name parameter.
