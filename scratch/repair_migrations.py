import os
import re

migrations_dir = 'database/migrations'

def repair_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    modified = False

    def fix_foreign(match):
        nonlocal modified
        full_match = match.group(0)
        method = match.group(1)
        args_str = match.group(2)
        
        # We're looking for foreign('something_col_idx', 'something_col_idx')
        # where the first arg was accidentally prefixed.
        
        qs = re.findall(r"['\"]([^'\"]+)['\"]", args_str)
        if method == 'foreign' and len(qs) >= 1:
            first_arg = qs[0]
            if first_arg.endswith('_idx'):
                # Extract the base column name. 
                # e.g. 'combined_products_product_id_idx' -> 'product_id'
                # This is tricky without the exact table name, but we can try to infer it.
                # Actually, we can just remove the table prefix if we find it.
                
                # Let's find table name again
                table_match = re.search(r"Schema::(?:create|table)\s*\(\s*['\"]([^'\"]+)['\"]", content)
                if table_match:
                    table_name = table_match.group(1)
                    if first_arg.startswith(table_name + "_"):
                        base_col = first_arg[len(table_name)+1:-4] # remove prefix and _idx
                        new_args_str = args_str.replace(f"'{first_arg}'", f"'{base_col}'").replace(f'"{first_arg}"', f'"{base_col}"')
                        modified = True
                        return f"->{method}({new_args_str})"
        
        return full_match

    new_content = re.sub(r"->(foreign)\s*\(([^)]+)\)", fix_foreign, content)
    
    if modified:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

count = 0
for filename in os.listdir(migrations_dir):
    if filename.endswith('.php'):
        if repair_file(os.path.join(migrations_dir, filename)):
            count += 1
print(f"Repaired {count} files.")
