import re
import os

image_url = 'https://i.imgur.com/oujttfD.jpeg'
files = ['index.html', 'kim-jestesmy.html', 'menu.html', 'kontakt.html']

for filename in files:
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace og:image
    content = re.sub(r'<meta[^>]*property="og:image"[^>]*>', f'<meta property="og:image" content="{image_url}" />', content)
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*property="og:image"[^>]*>', f'<meta property="og:image" content="{image_url}" />', content)
    
    # Also twitter:image just in case
    # Replace twitter:image if it exists
    if 'twitter:image' in content:
        content = re.sub(r'<meta[^>]*name="twitter:image"[^>]*>', f'<meta name="twitter:image" content="{image_url}" />', content)
        content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*name="twitter:image"[^>]*>', f'<meta name="twitter:image" content="{image_url}" />', content)
    else:
        # If it doesn't exist, we can add it after og:image
        content = content.replace(f'<meta property="og:image" content="{image_url}" />', 
                                  f'<meta property="og:image" content="{image_url}" />\n  <meta name="twitter:image" content="{image_url}" />')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated og:image in {filename}")
