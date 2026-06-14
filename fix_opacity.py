import re

with open('kim-jestesmy.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the inline <style> block from the head that sets opacity:0
content = re.sub(r'<style>@media \(min-width:992px\).*?</style>', '', content, flags=re.DOTALL)

# Remove all inline style="opacity:0"
content = content.replace('style="opacity:0"', '')

with open('kim-jestesmy.html', 'w', encoding='utf-8') as f:
    f.write(content)
