import os
import re

root_dir = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

html_files = []
for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith(".html"):
            html_files.append(os.path.join(dirpath, filename))

print(f"Total HTML files found: {len(html_files)}")
print("Grouping findings by unique tag definitions to keep it short:\n")

summary = {}
for filepath in html_files:
    rel_path = os.path.relpath(filepath, root_dir)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    matches = re.finditer(r'<img\s+([^>]+)>', content)
    for match in matches:
        img_attr = match.group(1)
        if any(term in img_attr.lower() for term in ["logo", "brand"]):
            # Normalize whitespace/quotes slightly to group them
            norm = re.sub(r'\s+', ' ', img_attr).strip()
            if norm not in summary:
                summary[norm] = []
            summary[norm].append(rel_path)

for attr, files in summary.items():
    print(f"Image attributes: <img {attr}>")
    print(f"Used in ({len(files)} files):")
    if len(files) <= 5:
        print("  " + ", ".join(files))
    else:
        print("  " + ", ".join(files[:5]) + f", ... and {len(files)-5} more files")
    print("-" * 40)
