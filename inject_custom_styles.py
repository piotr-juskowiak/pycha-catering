import os
import re

def process_file(filepath):
    if filepath.endswith('index.html'):
        return False
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Calculate depth to figure out path prefix
    depth = len(filepath.split(os.sep)) - 2
    prefix = ""
    if depth == 1:
        prefix = "../"
    elif depth == 2:
        prefix = "../../"
        
    link_tag = f'<link rel="stylesheet" href="{prefix}custom-styles.css">'
    
    # Check if already injected
    if 'href="{}custom-styles.css"'.format(prefix) in content or 'href="custom-styles.css"' in content:
        if depth == 0:
            pass # Maybe it's already there
        # Wait, if it has it, let's skip
        # Let's check if 'custom-styles.css' is present at all
        if 'custom-styles.css' in content:
            return False

    # Also, we only want to inject in files where we actually added the new CTA
    # The new CTA has id="zamow-catering"
    if 'id="zamow-catering"' not in content:
        return False

    # Inject right before </head>
    pattern = re.compile(r'</head>', re.IGNORECASE)
    if not pattern.search(content):
        return False
        
    new_content = pattern.sub(f'  {link_tag}\n</head>', content, count=1)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

changed = 0
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            if process_file(filepath):
                changed += 1
                print(f"Injected custom-styles.css into {filepath}")

print(f"Total files updated: {changed}")
