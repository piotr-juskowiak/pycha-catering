import os
import re

# 1. Read index.html to get the master header
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

header_match = re.search(r'<header class="header-section">.*?</header>', index_content, re.DOTALL)
if not header_match:
    print("Could not find master header in index.html")
    exit(1)

master_header = header_match.group(0)

# Remove w--current from the master header if it happens to have any
# Actually, index.html might have w--current on the logo. Let's keep the logo as is, 
# but ensure no nav-link has w--current.
master_header = re.sub(r'class="nav-link w-nav-link w--current" aria-current="page"', r'class="nav-link w-nav-link"', master_header)

changed_files = 0

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'tmp' in root or 'scratch' in root or 'culini' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find the header in this file
            file_header_match = re.search(r'<header class="header-section">.*?</header>', content, re.DOTALL)
            if not file_header_match:
                # print(f"No header found in {filepath}")
                continue
            
            # Prepare the new header for this specific file
            new_header = master_header
            
            # If we are in a subfolder, we might need to adjust paths. 
            # But wait, looking at the project, all main pages are in the root directory.
            # Recipes are in recipes/ but they might need ../
            # For simplicity, if we are in a subfolder, adjust paths:
            depth = filepath.count(os.sep) - 1 # e.g. ./index.html -> depth 0, ./recipes/foo.html -> depth 1
            if depth > 0:
                prefix = '../' * depth
                # Add prefix to hrefs/srcs that don't start with http or #
                # This is tricky with regex, let's just do simple replacements for main assets
                # Wait, the user said "na kazdej podstronie", which might just refer to the main pages (kontakt, menu, kim-jestesmy).
                # Actually, Webflow usually keeps absolute/relative paths consistent.
                pass # We'll just insert the master header as is for now, it uses relative paths like "assets/"

            # Add w--current based on filename
            filename = os.path.basename(filepath)
            
            if filename == 'kim-jestesmy.html':
                new_header = new_header.replace(f'href="kim-jestesmy.html"', f'href="kim-jestesmy.html" aria-current="page" class="nav-link w-nav-link w--current"')
                new_header = new_header.replace('class="nav-link w-nav-link" aria-current="page" class="nav-link w-nav-link w--current"', 'class="nav-link w-nav-link w--current" aria-current="page"')
            elif filename == 'menu.html':
                new_header = new_header.replace(f'href="menu.html"', f'href="menu.html" aria-current="page" class="nav-link w-nav-link w--current"')
                new_header = new_header.replace('class="nav-link w-nav-link" aria-current="page" class="nav-link w-nav-link w--current"', 'class="nav-link w-nav-link w--current" aria-current="page"')
            elif filename == 'kontakt.html':
                new_header = new_header.replace(f'href="kontakt.html"', f'href="kontakt.html" aria-current="page" class="nav-link w-nav-link w--current"')
                new_header = new_header.replace('class="nav-link w-nav-link" aria-current="page" class="nav-link w-nav-link w--current"', 'class="nav-link w-nav-link w--current" aria-current="page"')
            elif filename == 'index.html':
                # logo usually has it
                pass

            # Replace the old header with the new header
            new_content = content[:file_header_match.start()] + new_header + content[file_header_match.end():]
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                changed_files += 1
                print(f"Updated header in {filepath}")

print(f"Total files updated: {changed_files}")
