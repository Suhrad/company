import os
import re

file_path = 'app/Http/Controllers/DashboardController.php'

with open(file_path, 'r') as f:
    content = f.read()

# Pattern for DATE_FORMAT(expr, format)
# We want to turn it into strftime(format, expr)
pattern = r"DATE_FORMAT\s*\(\s*([^,]+)\s*,\s*(['\"][^'\"]+['\"])\s*\)"
replacement = r"strftime(\2, \1)"

new_content = re.sub(pattern, replacement, content)

if new_content != content:
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Patched DashboardController.php for SQLite compatibility.")
else:
    print("No occurrences of DATE_FORMAT found in DashboardController.php.")
