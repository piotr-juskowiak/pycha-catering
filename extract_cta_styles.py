import re

with open('main-styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# We can find the start of the CTA styles by searching for ".cta-section-new {"
start_idx = content.find('.cta-section-new {')
if start_idx != -1:
    # Let's extract from .cta-section-new down to the end of the file, or until a section that is clearly not CTA.
    # Looking at main-styles.css, the CTA styles are at the bottom of the file!
    # Let's verify what comes after .cta-section-new
    cta_css = content[start_idx:]
    
    with open('assets/cta-styles.css', 'w', encoding='utf-8') as out:
        out.write(cta_css)
    print("Extracted CTA styles to assets/cta-styles.css")
else:
    print("Could not find .cta-section-new in main-styles.css")
