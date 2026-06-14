import re

with open('kim-jestesmy.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all assets/cdn.prod... in srcset and src to culini/assets/cdn.prod...
# Only do this if they are not already culini/assets...
new_content = re.sub(r'(?<!culini/)assets/cdn\.prod\.website-files\.com/685', r'culini/assets/cdn.prod.website-files.com/685', content)

with open('kim-jestesmy.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
