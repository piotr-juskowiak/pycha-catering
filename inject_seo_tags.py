import os
import re

directory = '/Users/piotrjuskowiak/Desktop/pycha-catering'

files_to_update = {
    'index.html': 'https://pychacatering.pl/',
    'menu.html': 'https://pychacatering.pl/menu',
    'kontakt.html': 'https://pychacatering.pl/kontakt',
    'kim-jestesmy.html': 'https://pychacatering.pl/kim-jestesmy',
    'blog.html': 'https://pychacatering.pl/blog'
}

schema_markup = """
  <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CateringService",
    "name": "Pycha Catering",
    "image": "https://i.imgur.com/oujttfD.jpeg",
    "@id": "https://pychacatering.pl/",
    "url": "https://pychacatering.pl/",
    "telephone": "+48577322302",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Kolejowa 7/1",
      "addressLocality": "Brodnica",
      "postalCode": "87-300",
      "addressCountry": "PL"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "16:00"
    }
  }
  </script>
"""

img_regex = re.compile(r'<img\s+([^>]*?)>', re.IGNORECASE)

def process_file(filename, canonical_url):
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    canonical_tag = f'<link rel="canonical" href="{canonical_url}" />'
    if canonical_tag not in content:
        injection = canonical_tag + "\n"
        if filename == 'index.html' and "application/ld+json" not in content:
            injection += schema_markup
        
        content = content.replace('</head>', injection + '</head>')

    def alt_replacer(match):
        attrs = match.group(1)
        if 'alt=' not in attrs.lower():
            return f'<img {attrs} alt="Pycha Catering - posiłki dla firm">'
        elif 'alt=""' in attrs:
            return match.group(0).replace('alt=""', 'alt="Pycha Catering - posiłki dla firm"')
        return match.group(0)

    content = img_regex.sub(alt_replacer, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"No changes needed for {filename}")

for fname, curl in files_to_update.items():
    process_file(fname, curl)

print("SEO update completed.")
