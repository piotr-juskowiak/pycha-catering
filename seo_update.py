import re
import os

files_to_update = {
    'index.html': {
        'title': 'Pycha Catering - Najlepszy catering dla firm i dostawy do biur w Sochaczewie',
        'desc': 'Oferujemy codzienne, świeże posiłki dla firm w Sochaczewie. Catering na szkolenia, spotkania i eventy. Zamów lunch z dostawą do biura!',
    },
    'kim-jestesmy.html': {
        'title': 'Kim jesteśmy - Pycha Catering Sochaczew',
        'desc': 'Pycha Catering to firma założona z pasji do jedzenia. Poznaj naszą historię i dowiedz się, dlaczego dostarczamy najlepszy catering firmowy w Sochaczewie.',
    },
    'menu.html': {
        'title': 'Menu - Catering dla firm i na eventy | Pycha Catering',
        'desc': 'Sprawdź nasze menu dla firm. Sałatki, zupy, dania główne i przekąski. Pyszne jedzenie na co dzień i na specjalne okazje, dostarczane prosto do Ciebie.',
    },
    'kontakt.html': {
        'title': 'Kontakt - Zamów catering do firmy | Pycha Catering Sochaczew',
        'desc': 'Skontaktuj się z Pycha Catering i zamów pyszne posiłki dla swojej firmy w Sochaczewie. Zadzwoń lub napisz do nas – jesteśmy do Twojej dyspozycji!',
    }
}

for filename, seo_data in files_to_update.items():
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <title>
    content = re.sub(r'<title>.*?</title>', f'<title>{seo_data["title"]}</title>', content, flags=re.DOTALL)
    
    # Replace name="description"
    content = re.sub(r'<meta[^>]*name="description"[^>]*>', f'<meta name="description" content="{seo_data["desc"]}" />', content)
    # Handle if description was content="..." name="..."
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*name="description"[^>]*>', f'<meta name="description" content="{seo_data["desc"]}" />', content)
    
    # Replace og:title
    content = re.sub(r'<meta[^>]*property="og:title"[^>]*>', f'<meta property="og:title" content="{seo_data["title"]}" />', content)
    # Handle if og:title was content="..." property="..."
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*property="og:title"[^>]*>', f'<meta property="og:title" content="{seo_data["title"]}" />', content)

    # Replace og:description
    content = re.sub(r'<meta[^>]*property="og:description"[^>]*>', f'<meta property="og:description" content="{seo_data["desc"]}" />', content)
    # Handle if og:description was content="..." property="..."
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*property="og:description"[^>]*>', f'<meta property="og:description" content="{seo_data["desc"]}" />', content)

    # Replace twitter:title
    content = re.sub(r'<meta[^>]*name="twitter:title"[^>]*>', f'<meta name="twitter:title" content="{seo_data["title"]}" />', content)
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*name="twitter:title"[^>]*>', f'<meta name="twitter:title" content="{seo_data["title"]}" />', content)

    # Replace twitter:description
    content = re.sub(r'<meta[^>]*name="twitter:description"[^>]*>', f'<meta name="twitter:description" content="{seo_data["desc"]}" />', content)
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*name="twitter:description"[^>]*>', f'<meta name="twitter:description" content="{seo_data["desc"]}" />', content)

    # Remove any existing robots meta
    content = re.sub(r'<meta[^>]*name="robots"[^>]*>', '', content)
    content = re.sub(r'<meta[^>]*content="[^"]*"[^>]*name="robots"[^>]*>', '', content)

    # Inject robots meta right after <head>
    content = content.replace('<head>', '<head>\n  <meta name="robots" content="index, follow" />')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filename}")
