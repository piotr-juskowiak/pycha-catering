import re

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Enhance the form
content = content.replace(
    "background: #0b250c; padding: 50px; border-radius: 20px; box-shadow: 0 20px 50px rgba(11, 37, 12, 0.2);", 
    "background: linear-gradient(145deg, #0b250c 0%, #153816 100%); padding: 50px; border-radius: 24px; box-shadow: 0 30px 60px rgba(11, 37, 12, 0.4); border: 1px solid rgba(194, 164, 63, 0.2);"
)

# Enhance the form button hover effect
btn_search = '<button style="width: 100%; background: #c2a43f; color: #fff; border: none; padding: 20px; border-radius: 12px; font-size: 16px; font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: background 0.3s; text-transform: uppercase; box-shadow: 0 10px 20px rgba(194, 164, 63, 0.3);" type="submit">Złóż zapytanie o wycenę</button>'
btn_replace = '<style>.btn-gold-glow:hover { background: #dcb846 !important; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(194, 164, 63, 0.5) !important; }</style><button class="btn-gold-glow" style="width: 100%; background: #c2a43f; color: #fff; border: none; padding: 20px; border-radius: 12px; font-size: 16px; font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; box-shadow: 0 10px 20px rgba(194, 164, 63, 0.3);" type="submit">Złóż zapytanie o wycenę</button>'
content = content.replace(btn_search, btn_replace)

# Enhance the left side (Process section)
content = content.replace(
    "background: #fff; padding: 50px 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); border: 1px solid #d4ecd0;",
    "background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); padding: 50px 40px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.06); border: 1px solid rgba(120, 164, 79, 0.2);"
)

# Enhance E-commerce cards inside the left side
old_ecommerce = 'background: #fff; padding: 25px; border-radius: 20px; width: 100%; box-shadow: 0 15px 35px rgba(0,0,0,0.06); text-align: left; border: 1px solid #eee;'
new_ecommerce = 'background: #fff; padding: 25px; border-radius: 18px; width: 100%; box-shadow: 0 10px 20px rgba(120, 164, 79, 0.08); text-align: left; border: 1px solid rgba(120, 164, 79, 0.15); transition: transform 0.3s; cursor: pointer; class="ecommerce-mini-card"'
content = content.replace(old_ecommerce, new_ecommerce)

if "<style>.ecommerce-mini-card:hover" not in content:
    content = content.replace("</head>", "<style>.ecommerce-mini-card:hover { transform: translateY(-5px); border-color: #c2a43f !important; box-shadow: 0 15px 30px rgba(194, 164, 63, 0.15) !important; }</style></head>")

# Make the E-commerce header smaller and cleaner
content = content.replace("SZYBKIE ZAKUPY E-COMMERCE", "LUB KUP GOTOWY ZESTAW ONLINE")
content = content.replace('Kliknij "Dodaj do koszyka", a produkt pojawi się w koszyku w menu górnym!', "Błyskawiczne zamówienie prosto z naszej kuchni do Twojego biura.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("CTA aesthetics polished.")
