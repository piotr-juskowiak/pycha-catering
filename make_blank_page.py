import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract <head>
head_match = re.search(r'<!DOCTYPE html>.*?<head>.*?</head>', content, re.DOTALL | re.IGNORECASE)
if not head_match:
    print("Could not find <head>")
    exit(1)
head_str = head_match.group(0)

# 2. Extract <header>
header_match = re.search(r'<header class="header-section">.*?</header>', content, re.DOTALL)
if not header_match:
    print("Could not find <header>")
    exit(1)
header_str = header_match.group(0)

# Set the active link
header_str = re.sub(
    r'class="nav-link w-nav-link"(\s+)href="kim-jestesmy.html"',
    r'class="nav-link w-nav-link w--current" aria-current="page"\1href="kim-jestesmy.html"',
    header_str
)

# 3. Extract Footer and end of page
# In index.html, the footer section usually starts with cta-section-new or footer-relative-wrapper
cta_idx = content.find('<section class="cta-section-new"')
if cta_idx == -1:
    print("Could not find cta-section-new")
    exit(1)

footer_str = content[cta_idx:]

# Assemble new kim-jestesmy.html
new_page = f"""{head_str}
<body>
{header_str}
<div class="main-content" style="min-height: 50vh;">
  <!-- Blank space for future content -->
</div>
{footer_str}
"""

with open('kim-jestesmy.html', 'w', encoding='utf-8') as f:
    f.write(new_page)

print("kim-jestesmy.html successfully cleared and rebuilt with header and footer.")
