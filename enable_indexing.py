import os

directory = '/Users/piotrjuskowiak/Desktop/pycha-catering'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace noindex with index, follow
                modified = False
                
                if '<meta name="robots" content="noindex">' in content:
                    content = content.replace('<meta name="robots" content="noindex">', '<meta name="robots" content="index, follow">')
                    modified = True
                
                if '<meta name="robots" content="noindex, nofollow">' in content:
                    content = content.replace('<meta name="robots" content="noindex, nofollow">', '<meta name="robots" content="index, follow">')
                    modified = True
                
                if modified:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Failed {filepath}: {e}")
