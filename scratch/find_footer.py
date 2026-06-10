import os
import re

root_dir = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

html_files = []
for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith(".html"):
            html_files.append(os.path.join(dirpath, filename))

print(f"Total HTML files: {len(html_files)}")

footer_blocks = {}

for filepath in html_files:
    rel_path = os.path.relpath(filepath, root_dir)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Let's search for <footer ...> ... </footer> tags
    # We want to match outer <footer ...>...</footer>
    matches = list(re.finditer(r'<footer\s+[^>]*>([\s\S]*?)</footer>', content))
    if matches:
        for match in matches:
            full_match = match.group(0)
            # Just class name/id or preview of the footer tag
            tag_opening = re.match(r'<footer\s+[^>]*>', full_match).group(0)
            if tag_opening not in footer_blocks:
                footer_blocks[tag_opening] = []
            footer_blocks[tag_opening].append(rel_path)
    else:
        print(f"No <footer ...> tag found in: {rel_path}")

print("\nFooter types found:")
for tag, files in footer_blocks.items():
    print(f"Footer tag: {tag}")
    print(f"Used in {len(files)} files: {', '.join(files[:3])} ... and {len(files)-3} more.")
