import re

# Load index.html and extract the cta-section-new
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Match the entire <section class="cta-section-new">...</section>
cta_pattern = re.compile(r'(<section class="cta-section-new">.*?</section>)', re.DOTALL)
match = cta_pattern.search(index_content)
if not match:
    print('Error: Could not find <section class="cta-section-new"> in index.html')
    exit(1)

cta_section = match.group(1)
print("Successfully extracted cta-section-new from index.html (len={})".format(len(cta_section)))

# Define pattern for replacing <section class="cta-section"> in menu.html, blog.html, and contact.html
newsletter_pattern = re.compile(r'<section class="cta-section">.*?Zapisz się do newslettera.*?</section>', re.DOTALL)

files_to_update = ['menu.html', 'blog.html', 'contact.html']

for filename in files_to_update:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if newsletter_pattern.search(content):
        new_content = newsletter_pattern.sub(cta_section, content)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully replaced newsletter section in {}".format(filename))
    else:
        print("Error: Newsletter section not found in {}".format(filename))
