import re
import os

files = ['index.html', 'kim-jestesmy.html', 'menu.html', 'kontakt.html']

for filename in files:
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace title
    content = re.sub(r'<title>Pycha Catering - .*?</title>', '<title>Pycha Catering - Najlepszy catering dla firm</title>', content)
    content = re.sub(r'<meta property="og:title" content="Pycha Catering - .*?" />', '<meta property="og:title" content="Pycha Catering - Najlepszy catering dla firm" />', content)
    content = re.sub(r'<meta name="twitter:title" content="Pycha Catering - .*?" />', '<meta name="twitter:title" content="Pycha Catering - Najlepszy catering dla firm" />', content)

    # Replace description
    desc = "Oferujemy codzienne, świeże posiłki dla firm. Catering na szkolenia, spotkania i eventy. Zamów lunch z dostawą!"
    content = re.sub(r'<meta name="description" content=".*?" />', f'<meta name="description" content="{desc}" />', content)
    content = re.sub(r'<meta property="og:description" content=".*?" />', f'<meta property="og:description" content="{desc}" />', content)
    content = re.sub(r'<meta name="twitter:description" content=".*?" />', f'<meta name="twitter:description" content="{desc}" />', content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated SEO tags in {filename}")
