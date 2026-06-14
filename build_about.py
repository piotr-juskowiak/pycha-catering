import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

with open('culini/about-us.html', 'r', encoding='utf-8') as f:
    about_content = f.read()

# 1. Extract new header from index.html
header_match = re.search(r'<header class="header-section">.*?</header>', index_content, re.DOTALL)
if header_match:
    new_header = header_match.group(0)
    # Set w--current on "Kim jesteśmy?"
    new_header = new_header.replace('<a class="nav-link w-nav-link" href="about.html">Kim jesteśmy?</a>', '<a class="nav-link w-nav-link w--current" aria-current="page" href="about.html">Kim jesteśmy?</a>')
else:
    print("Failed to find header in index.html")
    exit(1)

# 2. Extract new CTA + Footer + end from index.html
# Let's find where CTA starts
cta_start_idx = index_content.find('<section class="cta-section-new"')
if cta_start_idx != -1:
    new_footer_part = index_content[cta_start_idx:]
else:
    print("Failed to find CTA in index.html")
    exit(1)

# 3. Find old nav in about-us.html
# It starts right after <body>
body_idx = about_content.find('<body>')
if body_idx == -1:
    print("Failed to find <body> in about-us.html")
    exit(1)

# The content section starts with <div><section class="pages-banner-color">
content_start_idx = about_content.find('<div><section class="pages-banner-color">')
if content_start_idx == -1:
    print("Failed to find pages-banner-color in about-us.html")
    exit(1)

# 4. Find old footer in about-us.html
# The old footer starts with <div class="footer-relative-wrapper">
footer_idx = about_content.find('<div class="footer-relative-wrapper">')
if footer_idx == -1:
    print("Failed to find old footer in about-us.html")
    exit(1)

# 5. Extract <head> from about-us.html and inject our css
head_end_idx = about_content.find('</head>')
if head_end_idx != -1:
    injected_css = """
  <link href="main-styles.css" rel="stylesheet" type="text/css" />
  <link href="custom-styles.css" rel="stylesheet" type="text/css" />
  <link href="assets/cta-styles.css" rel="stylesheet" type="text/css" />
"""
    head_part = about_content[:head_end_idx] + injected_css + "\n</head>"
else:
    head_part = about_content[:body_idx]

# Assemble about.html
middle_content = about_content[content_start_idx:footer_idx]

final_html = head_part + "\n<body>\n" + new_header + "\n" + middle_content + "\n" + new_footer_part

# Write to about.html
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Created about.html successfully!")
