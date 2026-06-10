import os
import re

dir_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

count = 0
for root, _, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Pattern: match <a ... href="#faq"...>FAQ</a>
            new_content, num_subs = re.subn(r'<a\s+[^>]*href="#faq"[^>]*>FAQ</a>', '', content, flags=re.IGNORECASE | re.DOTALL)
            
            if num_subs > 0:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f"Updated {filepath} ({num_subs} replacements)")
                
print(f"Total files updated: {count}")
