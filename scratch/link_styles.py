import os

root_dir = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

target_files = [
    os.path.join(root_dir, "menu.html"),
    os.path.join(root_dir, "blog.html"),
    os.path.join(root_dir, "contact.html"),
    os.path.join(root_dir, "checkout.html")
]

link_str = '<link rel="stylesheet" href="main-styles.css">\n  <link rel="stylesheet" href="custom-styles.css" id="custom-redesign-styles">\n'

for filepath in target_files:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check if already linked
        if "main-styles.css" not in content:
            # We want to insert it before </head> or before assets/page-transitions.css
            if 'href="assets/page-transitions.css"' in content:
                # Let's insert before the page-transitions link tag
                tag_to_replace = '<link href="assets/page-transitions.css"'
                new_content = content.replace(tag_to_replace, link_str + "  " + tag_to_replace)
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Successfully linked styles in {os.path.basename(filepath)}")
            else:
                # Fallback: insert before </head>
                new_content = content.replace('</head>', link_str + '</head>')
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Successfully linked styles (fallback) in {os.path.basename(filepath)}")
        else:
            print(f"Styles already linked in {os.path.basename(filepath)}")
    else:
        print(f"File not found: {filepath}")
