import re

def process_menu_html():
    with open('menu.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace href="product/..." with style="pointer-events: none; cursor: default;"
    # Actually, we can just replace the whole a tag with a div. But replacing href is safer.
    # We will replace href="product/some-page.html" with style="pointer-events: none; cursor: default;"
    content = re.sub(r'href=\"product/[^\"]+\"', 'style="pointer-events: none; cursor: default;"', content)
    
    with open('menu.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated menu.html")

def process_culini_recipes():
    with open('culini-recipes-import.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # In culini-recipes-import.html, links are href="#" inside the collection list.
    # Let's replace href="#" with style="pointer-events: none; cursor: default;"
    # But only for those specific links in the collection items.
    # The links are: <a href="#" class="item-image small w-inline-block"> and <a href="#" class="item-name-smaller">
    # We can just replace href="#" with style="pointer-events: none; cursor: default;" globally in that file, 
    # since it's just an import file for that specific slider.
    content = re.sub(r'href=\"#\"', 'style="pointer-events: none; cursor: default;"', content)
    
    with open('culini-recipes-import.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated culini-recipes-import.html")

process_menu_html()
process_culini_recipes()
