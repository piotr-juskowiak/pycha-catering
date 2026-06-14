import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore interactive-menu-grid images
interactive_urls = [
    "https://i.imgur.com/7synHWz.png",
    "https://i.imgur.com/T5njIhv.jpeg",
    "assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68aad4dca112084fd9fbd570_hero-1.png",
    "https://i.imgur.com/YDePnDk.jpeg",
    "https://i.imgur.com/ZdmFXda.png",
    "https://i.imgur.com/gEUz0Uh.png"
]

interactive_idx = 0
def restore_interactive(match):
    global interactive_idx
    if interactive_idx < len(interactive_urls):
        url = interactive_urls[interactive_idx]
        interactive_idx += 1
        return re.sub(r'src="[^"]+"', f'src="{url}"', match.group(0))
    return match.group(0)

# 2. Update simple-img-card images
simple_urls = [
    "https://i.imgur.com/1z7Oi5n.png",
    "https://i.imgur.com/vthixoG.png",
    "https://i.imgur.com/Y6PXu5o.png",
    "https://i.imgur.com/2caQzLR.png",
    "https://i.imgur.com/tyJ34p1.png",
    "https://i.imgur.com/IuJn0e4.jpeg"
]

simple_idx = 0
def update_simple(match):
    global simple_idx
    if simple_idx < len(simple_urls):
        url = simple_urls[simple_idx]
        simple_idx += 1
        return re.sub(r'src="[^"]+"', f'src="{url}"', match.group(0))
    return match.group(0)

# Apply updates
new_content = re.sub(r'<img[^>]+class="interactive-menu-img"[^>]+>', restore_interactive, content)
new_content = re.sub(r'<img[^>]+class="simple-card-img"[^>]+>', update_simple, new_content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Restored {interactive_idx} interactive images.")
print(f"Updated {simple_idx} simple images.")
