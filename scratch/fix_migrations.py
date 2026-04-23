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

    # Patterns to match:
    # 1. index('NAME')
    # 2. index(['col'], 'NAME')
    # 3. foreign('col', 'NAME')
    # 4. foreign(['col'], 'NAME')
    # 5. dropIndex('NAME')
    # 6. dropForeign('NAME')
    # etc.

    # This regex is a bit generic but we will verify the name is in duplicates
    # and handle the most common formats.
    
    # Replacement function
    def replace_name(match):
        nonlocal modified
        method = match.group(1)
        args_str = match.group(2)
        
        # Try to find a string argument that matches a duplicate
        # We look for a string that is not the first argument if there are multiple,
        # OR the only argument if it's an index/unique/foreign name.
        
        # Simple approach: find all quoted strings in the args
        quoted_strings = re.findall(r"['\"]([^'\"]+)['\"]", args_str)
        
        new_args_str = args_str
        for name in quoted_strings:
            if name in duplicates:
                new_name = f"{table_name}_{name}_idx"
                # Avoid double prefixing if script runs twice
                if not name.startswith(table_name):
                    new_args_str = new_args_str.replace(f"'{name}'", f"'{new_name}'").replace(f'"{name}"', f'"{new_name}"')
                    modified = True
        
        return f"->{method}({new_args_str})"

    # Match common methods
    methods = "index|unique|foreign|dropIndex|dropUnique|dropForeign|dropUnique|spatialIndex|dropSpatialIndex"
    new_content = re.sub(r"->(" + methods + r")\s*\(([^)]+)\)", replace_name, content)
    
    if modified:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

count = 0
for filename in os.listdir(migrations_dir):
    if filename.endswith('.php'):
        if patch_file(os.path.join(migrations_dir, filename)):
            count += 1

print(f"Patched {count} migration files.")
