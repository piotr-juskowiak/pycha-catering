import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

with open('culini/about-us.html', 'r', encoding='utf-8') as f:
    about_content = f.read()

# 1. Extract new header from index.html
header_match = re.search(r'<header class="header-section">.*?</header>', index_content, re.DOTALL)
if header_match:
    new_header = header_match.group(0)
    # Set w--current on "Kim jesteśmy?"
    new_header = new_header.replace('<a class="nav-link w-nav-link" href="about.html">Kim jesteśmy?</a>', '<a class="nav-link w-nav-link w--current" aria-current="page" href="kim-jestesmy.html">Kim jesteśmy?</a>')
else:
    print("Failed to find header in index.html")
    exit(1)

# 2. Extract new CTA + Footer + end from index.html
cta_start_idx = index_content.find('<section class="cta-section-new"')
if cta_start_idx != -1:
    new_footer_part = index_content[cta_start_idx:]
else:
    print("Failed to find CTA in index.html")
    exit(1)

# 3. Find old nav in about-us.html
body_idx = about_content.find('<body>')
if body_idx == -1:
    print("Failed to find <body> in about-us.html")
    exit(1)

content_start_idx = about_content.find('<div><section class="pages-banner-color">')
if content_start_idx == -1:
    print("Failed to find pages-banner-color in about-us.html")
    exit(1)

# 4. Find old footer in about-us.html
footer_idx = about_content.find('<div class="footer-relative-wrapper">')
if footer_idx == -1:
    print("Failed to find old footer in about-us.html")
    exit(1)

# 5. Extract <head> from about-us.html and inject our css AND title
head_end_idx = about_content.find('</head>')
if head_end_idx != -1:
    injected_css = """
  <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W==" referrerpolicy="no-referrer" rel="stylesheet" />
  <link href="assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/css/forkly.webflow.shared.8b3cd058b.css" rel="stylesheet" type="text/css" />
  <link href="main-styles.css" rel="stylesheet" type="text/css" />
  <link href="custom-styles.css" rel="stylesheet" type="text/css" />
  <link href="assets/cta-styles.css" rel="stylesheet" type="text/css" />
  <link href="assets/page-transitions.css" rel="stylesheet" type="text/css" />
  <link href="assets/culini-home-frame.css" rel="stylesheet" type="text/css" />
"""
    head_part = about_content[:head_end_idx] + injected_css + "\n</head>"
    # replace title
    head_part = re.sub(r'<title>.*?</title>', '<title>Kim jesteśmy - Pycha Catering</title>', head_part)
else:
    head_part = about_content[:body_idx]

# Assemble kim-jestesmy.html
middle_content = about_content[content_start_idx:footer_idx]

final_html = head_part + "\n<body>\n" + new_header + "\n" + middle_content + "\n" + new_footer_part

# Write to kim-jestesmy.html
with open('kim-jestesmy.html', 'w', encoding='utf-8') as f:
    f.write(final_html)
print("Created kim-jestesmy.html successfully!")

# Now global replace of about.html to kim-jestesmy.html in all other html files
changed_files = 0
for root, dirs, files in os.walk('.'):
    if '.git' in root or 'tmp' in root or 'scratch' in root or 'culini' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = content.replace('about.html', 'kim-jestesmy.html')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                changed_files += 1

print(f"Total files updated with kim-jestesmy.html: {changed_files}")

