import os
import re

dir_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

count = 0
for root, _, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            # Calculate relative path to root
            rel_dir = os.path.relpath(dir_path, root)
            if rel_dir == '.':
                script_path = "cookies.js"
            else:
                script_path = os.path.join(rel_dir, "cookies.js")
            
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Avoid inserting multiple times
            if 'src="{}"'.format(script_path) in content or 'src="cookies.js"' in content or 'src="../cookies.js"' in content:
                continue

            # Insert before </body>
            script_tag = f'<script src="{script_path}"></script>\n</body>'
            new_content = re.sub(r'</body>', script_tag, content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f"Updated {filepath}")

print(f"Total files updated: {count}")
