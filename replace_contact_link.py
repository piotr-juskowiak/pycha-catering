import os

changed_files = 0
for root, dirs, files in os.walk('.'):
    # Exclude .git and others
    if '.git' in root or 'tmp' in root or 'scratch' in root:
        continue
        
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = content.replace('contact.html', 'kontakt.html')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                changed_files += 1
                print(f"Updated {filepath}")

print(f"Total files updated: {changed_files}")
