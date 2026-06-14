import os
import re

# 1. Read the new CTA from index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

cta_match = re.search(r'<section class="cta-section-new" id="zamow-catering">.*?</section>', index_content, re.DOTALL)
if not cta_match:
    print("Could not find the new CTA in index.html!")
    exit(1)

cta_root = cta_match.group(0)

# Replace local paths in cta_root with depth-appropriate paths if needed
# The only local paths seem to be 'assets/...'
cta_sub = cta_root.replace('"assets/', '"../assets/')
cta_sub_2 = cta_root.replace('"assets/', '"../../assets/')

# 2. Iterate and replace in all HTML files
def process_file(filepath):
    if filepath.endswith('index.html'):
        return False
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The old section might have class="cta-section" or "cta-section-new" with newsletter text
    # Let's match any section that contains "Zapisz się do newslettera" or "Subscribe to our newsletter"
    pattern = re.compile(r'<section[^>]*>[\s\S]*?(?:Zapisz się do newslettera|Subscribe to our newsletter)[\s\S]*?</section>', re.IGNORECASE)
    
    if not pattern.search(content):
        return False

    depth = len(filepath.split(os.sep)) - 2
    if depth == 0:
        replacement = cta_root
    elif depth == 1:
        replacement = cta_sub
    elif depth == 2:
        replacement = cta_sub_2
    else:
        replacement = cta_sub_2
        
    new_content = pattern.sub(replacement, content)
    
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
                print(f"Replaced CTA in {filepath}")

print(f"Total files updated: {changed}")
