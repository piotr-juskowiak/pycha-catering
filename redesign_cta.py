import re

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_cta = """<section class="cta-section-new" style="padding: 100px 0; background-color: #f2fce8; background-image: url('assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68adabf24f52fc626fb515f5_c15df19e1a408c883f5a1ec5fa2eb301_border-shap.png'); background-position: top center; background-repeat: no-repeat;">
<div class="container w-container">
    <h2 class="main_title" style="text-align: center; margin-bottom: 70px;">ZAMÓW CATERING</h2>
    
    <!-- PROCESS ON TOP -->
    <div style="background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); padding: 40px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.06); border: 1px solid rgba(120, 164, 79, 0.2); margin-bottom: 50px;">
        <h3 style="font-size: 26px; color: #0b250c; margin-bottom: 40px; font-weight: 800; text-align: center;">Proces zamówienia w 3 krokach</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">
            <div style="text-align: center;">
                <div style="width: 55px; height: 55px; background: #c2a43f; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 22px; margin: 0 auto 25px; box-shadow: 0 5px 15px rgba(194, 164, 63, 0.4);">1</div>
                <h4 style="font-size: 19px; font-weight: bold; color: #0b250c; margin-bottom: 12px;">Opowiedz nam o evencie</h4>
                <p style="color: #666; line-height: 1.6; font-size: 15px; margin: 0;">Wypełnij formularz obok podając podstawowe informacje, ilość osób i datę planowanego spotkania.</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 55px; height: 55px; background: #c2a43f; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 22px; margin: 0 auto 25px; box-shadow: 0 5px 15px rgba(194, 164, 63, 0.4);">2</div>
                <h4 style="font-size: 19px; font-weight: bold; color: #0b250c; margin-bottom: 12px;">Dostosujemy Twoje Menu</h4>
                <p style="color: #666; line-height: 1.6; font-size: 15px; margin: 0;">Nasz Szef Kuchni przygotuje dla Ciebie spersonalizowaną, darmową wycenę i zestawienie potraw, idealnie pod Twój budżet.</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 55px; height: 55px; background: #78a44f; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 22px; margin: 0 auto 25px; box-shadow: 0 5px 15px rgba(120, 164, 79, 0.4);">3</div>
                <h4 style="font-size: 19px; font-weight: bold; color: #0b250c; margin-bottom: 12px;">Ciesz się wspaniałym smakiem!</h4>
                <p style="color: #666; line-height: 1.6; font-size: 15px; margin: 0;">Dostarczymy świeże dania prosto na miejsce, rozstawimy profesjonalny bufet i zadbamy o absolutny zachwyt Twoich gości.</p>
            </div>
        </div>
    </div>

    <!-- E-COMMERCE & FORM GRID -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start;">
        <!-- Left: E-commerce -->
        <div>
            <h3 style="font-size: 24px; margin-bottom: 15px; font-weight: 800; color: #0b250c;">LUB KUP GOTOWY ZESTAW</h3>
            <p style="margin-bottom: 30px; color: #666; font-size: 15px;">Błyskawiczne zamówienie prosto z naszej kuchni do Twojego biura.</p>
            <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                <div style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); padding: 20px; border-radius: 18px; width: 100%; box-shadow: 0 10px 20px rgba(120, 164, 79, 0.08); text-align: left; border: 1px solid rgba(120, 164, 79, 0.2); transition: transform 0.3s; cursor: pointer; display: flex; gap: 20px; align-items: center;" class="ecommerce-mini-card">
                    <img src="https://i.imgur.com/7synHWz.png" style="width:110px; height:110px; object-fit:cover; border-radius: 12px;"/>
                    <div style="flex-grow: 1;">
                        <h4 style="font-size: 16px; color:#0b250c; margin-bottom: 5px; font-weight: bold;">Box Kanapkowy Premium</h4>
                        <div style="font-weight: bold; color: #c2a43f; margin-bottom: 15px; font-size: 18px;">65,00 zł</div>
                        <form class="w-commerce-commerceaddtocartform" data-commerce-product-id="68a477de2b73ecab227d62be" data-commerce-sku-id="68a477deab531ccff726090a" data-node-type="commerce-add-to-cart-form" style="display:flex; gap: 10px;">
                            <input class="w-commerce-commerceaddtocartquantityinput" min="1" name="commerce-add-to-cart-quantity-input" style="width: 50px; padding: 10px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 14px; text-align: center; background: #fff;" type="number" value="1"/>
                            <input class="w-commerce-commerceaddtocartbutton" style="background: #0b250c; color: #fff; border: none; border-radius: 8px; flex-grow: 1; cursor: pointer; font-weight: bold; font-size: 14px; transition: background 0.3s;" type="submit" value="Do koszyka"/>
                        </form>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); padding: 20px; border-radius: 18px; width: 100%; box-shadow: 0 10px 20px rgba(120, 164, 79, 0.08); text-align: left; border: 1px solid rgba(120, 164, 79, 0.2); transition: transform 0.3s; cursor: pointer; display: flex; gap: 20px; align-items: center;" class="ecommerce-mini-card">
                    <img src="https://i.imgur.com/ZdmFXda.png" style="width:110px; height:110px; object-fit:cover; border-radius: 12px;"/>
                    <div style="flex-grow: 1;">
                        <h4 style="font-size: 16px; color:#0b250c; margin-bottom: 5px; font-weight: bold;">Zestaw Finger Food</h4>
                        <div style="font-weight: bold; color: #c2a43f; margin-bottom: 15px; font-size: 18px;">89,00 zł</div>
                        <form class="w-commerce-commerceaddtocartform" data-commerce-product-id="68a469753d363e4b0be77ad2" data-commerce-sku-id="68a469761fa94cc0c6677f51" data-node-type="commerce-add-to-cart-form" style="display:flex; gap: 10px;">
                            <input class="w-commerce-commerceaddtocartquantityinput" min="1" name="commerce-add-to-cart-quantity-input" style="width: 50px; padding: 10px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 14px; text-align: center; background: #fff;" type="number" value="1"/>
                            <input class="w-commerce-commerceaddtocartbutton" style="background: #0b250c; color: #fff; border: none; border-radius: 8px; flex-grow: 1; cursor: pointer; font-weight: bold; font-size: 14px; transition: background 0.3s;" type="submit" value="Do koszyka"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Right: Form -->
        <div style="background: linear-gradient(145deg, #0b250c 0%, #153816 100%); padding: 50px; border-radius: 24px; box-shadow: 0 30px 60px rgba(11, 37, 12, 0.4); border: 1px solid rgba(194, 164, 63, 0.2); align-self: start;">
            <h3 style="font-size: 26px; color: #fff; margin-bottom: 35px; font-weight: 800;">Poproś o darmową wycenę</h3>
            <form action="#" style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                <div>
                    <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Imię i nazwisko</label>
                    <input class="cta-form-input" placeholder="np. Jan Kowalski" type="text" style="width:100%; box-sizing:border-box;"/>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Telefon</label>
                        <input class="cta-form-input" placeholder="+48 000 000 000" type="tel" style="width:100%; box-sizing:border-box;"/>
                    </div>
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">E-mail roboczy</label>
                        <input class="cta-form-input" placeholder="jan@firma.pl" type="email" style="width:100%; box-sizing:border-box;"/>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Data Wydarzenia</label>
                        <input class="cta-form-input" style="color: rgba(255,255,255,0.7); width:100%; box-sizing:border-box;" type="date"/>
                    </div>
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Szacowana liczba gości</label>
                        <select class="cta-form-input" style="appearance: none; color: rgba(255,255,255,0.9); width:100%; box-sizing:border-box;">
                            <option value="10-20">10 - 20 osób</option>
                            <option value="20-50">20 - 50 osób</option>
                            <option value="50-100">50 - 100 osób</option>
                            <option value="100+">Powyżej 100 osób</option>
                        </select>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <style>.btn-gold-glow:hover { background: #dcb846 !important; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(194, 164, 63, 0.5) !important; }</style>
                    <button class="btn-gold-glow" style="width: 100%; background: #c2a43f; color: #fff; border: none; padding: 20px; border-radius: 12px; font-size: 16px; font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; box-shadow: 0 10px 20px rgba(194, 164, 63, 0.3);" type="submit">Złóż zapytanie o wycenę</button>
                </div>
            </form>
        </div>
    </div>
</div>
<style>
@media (max-width: 991px) {
    .cta-section-new .container > div:first-of-type > div { grid-template-columns: 1fr !important; }
    .cta-section-new .container > div:last-of-type { grid-template-columns: 1fr !important; }
    .cta-section-new .ecommerce-mini-card { flex-direction: column; text-align: center; }
    .cta-section-new .ecommerce-mini-card img { width: 100% !important; height: auto !important; margin-bottom: 15px; }
}
</style>
</section>"""

cta_match = re.search(r"<section class=\"cta-section-new\".*?</section>", content, flags=re.DOTALL)
if cta_match:
    content = content.replace(cta_match.group(0), new_cta)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("CTA section successfully redesigned.")
else:
    print("Could not find cta-section-new")
