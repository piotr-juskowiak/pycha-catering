import os
import re
import glob

# Paths
base_dir = '/Users/piotrjuskowiak/Desktop/pycha-catering'
popup_js_path = os.path.join(base_dir, 'assets/menu-popup/weekly-menu-popup.js')
data_js_path = os.path.join(base_dir, 'assets/menu-popup/weekly-menu-data.js')

with open(popup_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract weeklyMenu
weekly_match = re.search(r'(const\s+weeklyMenu\s*=\s*\{.*?\n  \};\n)', content, re.DOTALL)
sandwiches_match = re.search(r'(const\s+sandwiches\s*=\s*\[.*?\n  \];\n)', content, re.DOTALL)

if not weekly_match or not sandwiches_match:
    print("Could not find weeklyMenu or sandwiches in weekly-menu-popup.js")
    exit(1)

weekly_code = weekly_match.group(1)
sandwiches_code = sandwiches_match.group(1)

# Write to weekly-menu-data.js
data_js_content = "window.PYCHA_MENU_DATA = {};\n\n"
data_js_content += weekly_code.replace('const weeklyMenu', 'window.PYCHA_MENU_DATA.weeklyMenu')
data_js_content += "\n"
data_js_content += sandwiches_code.replace('const sandwiches', 'window.PYCHA_MENU_DATA.sandwiches')

with open(data_js_path, 'w', encoding='utf-8') as f:
    f.write(data_js_content)
print(f"Created {data_js_path}")

# Update weekly-menu-popup.js
new_content = content.replace(weekly_match.group(0), 'const weeklyMenu = window.PYCHA_MENU_DATA.weeklyMenu;\n')
new_content = new_content.replace(sandwiches_match.group(0), 'const sandwiches = window.PYCHA_MENU_DATA.sandwiches;\n')

with open(popup_js_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"Updated {popup_js_path}")

# Find all HTML files
html_files = []
for root, dirs, files in os.walk(base_dir):
    if 'node_modules' in root or '.git' in root or 'forkly-kopia' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    if 'weekly-menu-popup.js' in html and 'weekly-menu-data.js' not in html:
        # Find the script tag for weekly-menu-popup.js
        # Handle cases where it might have a leading slash or not
        html = re.sub(
            r'(<script[^>]*src=["\'][^"\']*weekly-menu-popup\.js["\'][^>]*></script>)',
            r'<script src="/assets/menu-popup/weekly-menu-data.js"></script>\n  \1',
            html
        )
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Updated {file_path}")

print("Done extracting data and updating HTML files.")
