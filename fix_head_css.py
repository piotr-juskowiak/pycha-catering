with open('kim-jestesmy.html', 'r', encoding='utf-8') as f:
    content = f.read()

target_link = '<link href="culini/assets/cdn.prod.website-files.com/685c20abff4d94bf765389a1/css/culini-128.webflow.shared.d1eb1ce96.css" rel="stylesheet" type="text/css"/>'

if target_link in content:
    # Remove it from its current location
    content = content.replace(target_link, '')
    
    # Inject it right before </head>
    content = content.replace('</head>', f'  {target_link}\n</head>')
    
    with open('kim-jestesmy.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Moved culini-128 CSS to bottom of head.")
else:
    print("Link not found!")

