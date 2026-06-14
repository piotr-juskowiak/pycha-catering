import os
import re

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'tmp' in root or 'scratch' in root or 'culini' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Use regex to find elements with double class attributes and fix them.
            # Example target: class="nav-link w-nav-link" href="kim-jestesmy.html" aria-current="page" class="nav-link w-nav-link w--current"
            # It could also be split by newlines.
            # A more robust regex:
            new_content = re.sub(
                r'class="nav-link w-nav-link"([\s\n]+)href="(kim-jestesmy\.html|menu\.html|kontakt\.html)"\s+aria-current="page"\s+class="nav-link w-nav-link w--current"',
                r'class="nav-link w-nav-link w--current" aria-current="page"\1href="\2"',
                content
            )
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed double class in {filepath}")

