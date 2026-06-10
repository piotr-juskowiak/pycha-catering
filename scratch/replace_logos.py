import os
import re

root_dir = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

html_files = []
for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith(".html"):
            html_files.append(os.path.join(dirpath, filename))

def get_replacement_src(rel_path):
    # Determine the nesting level
    parts = rel_path.split(os.sep)
    # If in root directory, level is 0. If in category/post/product/utility, level is 1.
    level = len(parts) - 1
    if level == 0:
        return "assets/pycha-logo-transparent.png"
    else:
        return "../assets/pycha-logo-transparent.png"

def update_img_tag(match, target_src):
    tag = match.group(0)
    # Check if this tag has class matching nav-logo or footer-logo-img
    class_match = re.search(r'class="([^"]*)"', tag)
    if class_match:
        classes = class_match.group(1).split()
        if "nav-logo" in classes or "footer-logo-img" in classes or "pycha-callback-logo" in classes:
            # We found the target logo image!
            # Replace the src attribute in this tag
            new_tag = re.sub(r'src="[^"]*"', f'src="{target_src}"', tag)
            return new_tag
    return tag

print(f"Starting logo updates for {len(html_files)} files...")
updated_count = 0

for filepath in html_files:
    rel_path = os.path.relpath(filepath, root_dir)
    target_src = get_replacement_src(rel_path)
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We find all img tags and process them
    new_content, count = re.subn(r'<img\s+[^>]+>', lambda m: update_img_tag(m, target_src), content)
    
    if content != new_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {rel_path} -> {target_src}")
        updated_count += 1

print(f"\nSuccessfully updated {updated_count} files.")
