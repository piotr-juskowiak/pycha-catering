import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_urls = [
    "https://i.imgur.com/1z7Oi5n.png",
    "https://i.imgur.com/vthixoG.png",
    "https://i.imgur.com/Y6PXu5o.png",
    "https://i.imgur.com/2caQzLR.png",
    "https://i.imgur.com/tyJ34p1.png",
    "https://i.imgur.com/IuJn0e4.jpeg"
]

# We want to replace the src="..." inside <img ... class="interactive-menu-img" ...> 
# The actual tags look like:
# <img alt="Śniadanie Mistrzów" class="interactive-menu-img" src="https://i.imgur.com/7synHWz.png" />
# We can find all occurrences of class="interactive-menu-img" and replace their src attribute.

def replace_src(match):
    global url_index
    if url_index < len(new_urls):
        url = new_urls[url_index]
        url_index += 1
        # match.group(0) is the entire <img> tag
        # We need to replace its src="..."
        return re.sub(r'src="[^"]+"', f'src="{url}"', match.group(0))
    return match.group(0)

url_index = 0
new_content = re.sub(r'<img[^>]+class="interactive-menu-img"[^>]+>', replace_src, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Replaced {url_index} images.")
