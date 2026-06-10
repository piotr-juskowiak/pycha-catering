import re

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Bento Box Implementation
bento_css = """
<style>
/* Bento Box UI */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    margin-top: 40px;
}
.bento-card {
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    min-height: 350px;
    display: flex;
    align-items: flex-end;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s;
}
.bento-card:hover { 
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}
.bento-img {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover; z-index: 1;
    transition: transform 0.8s ease;
}
.bento-card:hover .bento-img { transform: scale(1.05); }
.bento-content {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 30px;
    background: rgba(11, 37, 12, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: #fff;
    border-top: 1px solid rgba(255,255,255,0.15);
}
.bento-title { font-size: 24px; font-weight: 800; margin-bottom: 10px; color: #fff; font-family: var(--font-family--rubik); text-transform: uppercase; }
.bento-desc { font-size: 14px; line-height: 1.5; color: #d4ecd0; margin-bottom: 15px; }
.bento-link { color: #c2a43f; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center; }
.bento-link svg { margin-left: 5px; transition: transform 0.3s; }
.bento-link:hover svg { transform: translateX(5px); }

/* Sizes */
.bento-span-2 { grid-column: span 2; }
.bento-span-3 { grid-column: span 3; }
.bento-tall { min-height: 450px; }

@media (max-width: 991px) {
    .bento-grid { grid-template-columns: 1fr; }
    .bento-span-2, .bento-span-3 { grid-column: span 1; }
}
</style>
"""

bento_html = """
<div class="bento-grid">
    <!-- Item 1: Imprezy Firmowe (span 2) -->
    <a href="contact.html" class="bento-card bento-span-2 bento-tall">
        <img src="https://i.imgur.com/T5njIhv.jpeg" class="bento-img" alt="Imprezy Firmowe">
        <div class="bento-content">
            <h3 class="bento-title">Imprezy Firmowe</h3>
            <p class="bento-desc">Zaskocz zespół smakiem. Kompleksowa oprawa kulinarna dla firm.</p>
            <span class="bento-link">Sprawdź szczegóły <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
    </a>
    
    <!-- Item 2: Eventy (span 1) -->
    <a href="contact.html" class="bento-card">
        <img src="assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68a6e2da72edb8856ca597ab_c77d1da6efc7512e392bcf08a89032d6_party-3.avif" class="bento-img" alt="Eventy">
        <div class="bento-content">
            <h3 class="bento-title" style="font-size: 20px;">Eventy</h3>
            <p class="bento-desc">Podnieś rangę wydarzenia.</p>
            <span class="bento-link">Więcej <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
    </a>

    <!-- Item 3: Szkolenia (span 1) -->
    <a href="contact.html" class="bento-card">
        <img src="assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68a6c5e79103d7287f2fd246_about-one.png" class="bento-img" alt="Szkolenia">
        <div class="bento-content">
            <h3 class="bento-title" style="font-size: 20px;">Szkolenia</h3>
            <p class="bento-desc">Lekkie i odżywcze przerwy.</p>
            <span class="bento-link">Więcej <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
    </a>

    <!-- Item 4: Spotkania Biznesowe (span 1) -->
    <a href="contact.html" class="bento-card">
        <img src="https://i.imgur.com/YDePnDk.jpeg" class="bento-img" alt="Spotkania Biznesowe">
        <div class="bento-content">
            <h3 class="bento-title" style="font-size: 20px;">Spotkania</h3>
            <p class="bento-desc">Eleganckie, dyskretne menu.</p>
            <span class="bento-link">Więcej <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
    </a>

    <!-- Item 5: Uroczystości (span 3) -->
    <a href="contact.html" class="bento-card bento-span-3">
        <img src="https://i.imgur.com/gEUz0Uh.png" class="bento-img" alt="Uroczystości Rodzinne">
        <div class="bento-content" style="background: rgba(194, 164, 63, 0.85);">
            <h3 class="bento-title">Uroczystości Rodzinne</h3>
            <p class="bento-desc" style="color: #fff;">Wyjątkowe menu na chrzciny, komunie i jubileusze. Skup się na gościach.</p>
            <span class="bento-link" style="color:#0b250c;">Sprawdź ofertę <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
    </a>
</div>
"""

# Replace existing party-cards-two-box with Bento Box
start_idx = content.find('<div class="party-cards-two-box">')
if start_idx != -1:
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(content, 'html.parser')
    old_box = soup.find('div', class_='party-cards-two-box')
    if old_box:
        content = content.replace(str(old_box), bento_html)
        if "Bento Box UI" not in content:
            content = content.replace("</head>", bento_css + "</head>")


# 2. E-Commerce Cart Integration
ecommerce_html = """
<!-- E-COMMERCE QUICK BUY SECTION -->
<div style="margin-top: 100px; text-align: center; border-top: 1px solid #d4ecd0; padding-top: 80px;">
   <h3 style="font-size: 32px; margin-bottom: 20px; font-weight: 800; color: #0b250c;">SZYBKIE ZAKUPY E-COMMERCE</h3>
   <p style="margin-bottom: 50px; color: #666;">Kliknij "Dodaj do koszyka", a produkt pojawi się w koszyku w menu górnym!</p>
   
   <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap;">
       
       <!-- Product 1: Tuna Salad -->
       <div style="background: #fff; padding: 25px; border-radius: 20px; width: 320px; box-shadow: 0 15px 35px rgba(0,0,0,0.06); text-align: left; border: 1px solid #eee;">
           <img src="https://i.imgur.com/7synHWz.png" style="width:100%; height:200px; object-fit:cover; border-radius: 12px; margin-bottom: 20px;">
           <h4 style="font-size: 22px; color:#0b250c; margin-bottom: 10px; font-weight: bold;">Box Kanapkowy Premium</h4>
           <div style="font-weight: bold; color: #c2a43f; margin-bottom: 25px; font-size: 20px;">65,00 zł</div>
           
           <form class="w-commerce-commerceaddtocartform" data-commerce-product-id="68a477de2b73ecab227d62be" data-commerce-sku-id="68a477deab531ccff726090a" data-node-type="commerce-add-to-cart-form" style="display:flex; gap: 10px;">
               <input type="number" class="w-commerce-commerceaddtocartquantityinput" name="commerce-add-to-cart-quantity-input" min="1" value="1" style="width: 70px; padding: 12px; border-radius: 10px; border: 1px solid #e0e0e0; font-size: 16px; text-align: center;">
               <input type="submit" value="Do koszyka" class="w-commerce-commerceaddtocartbutton" style="background: #0b250c; color: #fff; border: none; border-radius: 10px; flex-grow: 1; cursor: pointer; font-weight: bold; font-size: 16px; transition: background 0.3s;">
           </form>
       </div>
       
       <!-- Product 2: Onion Rings -->
       <div style="background: #fff; padding: 25px; border-radius: 20px; width: 320px; box-shadow: 0 15px 35px rgba(0,0,0,0.06); text-align: left; border: 1px solid #eee;">
           <img src="https://i.imgur.com/ZdmFXda.png" style="width:100%; height:200px; object-fit:cover; border-radius: 12px; margin-bottom: 20px;">
           <h4 style="font-size: 22px; color:#0b250c; margin-bottom: 10px; font-weight: bold;">Zestaw Finger Food</h4>
           <div style="font-weight: bold; color: #c2a43f; margin-bottom: 25px; font-size: 20px;">89,00 zł</div>
           
           <form class="w-commerce-commerceaddtocartform" data-commerce-product-id="68a469753d363e4b0be77ad2" data-commerce-sku-id="68a469761fa94cc0c6677f51" data-node-type="commerce-add-to-cart-form" style="display:flex; gap: 10px;">
               <input type="number" class="w-commerce-commerceaddtocartquantityinput" name="commerce-add-to-cart-quantity-input" min="1" value="1" style="width: 70px; padding: 12px; border-radius: 10px; border: 1px solid #e0e0e0; font-size: 16px; text-align: center;">
               <input type="submit" value="Do koszyka" class="w-commerce-commerceaddtocartbutton" style="background: #0b250c; color: #fff; border: none; border-radius: 10px; flex-grow: 1; cursor: pointer; font-weight: bold; font-size: 16px; transition: background 0.3s;">
           </form>
       </div>
       
   </div>
</div>
"""

# Insert E-commerce section right inside the container of cta-section-new, at the end of it
# Let's find </section> of cta-section-new and inject it just before the closing tag, actually inside the .container w-container
cta_match = re.search(r'(<section class="cta-section-new".*?<div class="container w-container">.*?)</div>\s*</section>', content, flags=re.DOTALL)
if cta_match:
    content = content.replace(cta_match.group(0), cta_match.group(1) + ecommerce_html + "</div></section>")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Bento Box & E-Commerce scripts injected successfully.")
