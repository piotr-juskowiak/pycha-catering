import os
import re

root_dir = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

html_files = []
for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith(".html"):
            if filename not in ["hits_temp.html", "cta_temp.html"]:
                html_files.append(os.path.join(dirpath, filename))

print("Verifying footer links in a few representative files:")

test_files = [
    "index.html",
    "menu.html",
    "product/pizza.html",
    "utility/style-guide.html"
]

for name in test_files:
    path = os.path.join(root_dir, name)
    if os.path.exists(path):
        print(f"\n--- {name} ---")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Find the footer link block
        match = re.search(r'<nav class="pycha-footer__nav"[\s\S]*?</nav>', content)
        if match:
            # print all <a> tags within the nav
            links = re.findall(r'<a href="([^"]*)"[^>]*>([^<]*)</a>', match.group(0))
            for href, label in links:
                print(f"  {label.strip()} -> {href}")
            
            # Find bottom links
            bottom_match = re.search(r'<div class="pycha-footer__bottom"[\s\S]*?</div>', content)
            if bottom_match:
                b_links = re.findall(r'<a href="([^"]*)"[^>]*>([^<]*)</a>', bottom_match.group(0))
                print("  Bottom links:")
                for href, label in b_links:
                    print(f"    {label.strip()} -> {href}")
        else:
            print("  ERROR: Footer nav not found!")
    else:
        print(f"  ERROR: File does not exist at {path}")
