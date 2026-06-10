import re

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

categories_html = """
<!-- CATEGORIES SECTION -->
<style>
.category-card:hover { transform: translateY(-10px); border-color: #c2a43f !important; box-shadow: 0 15px 30px rgba(194, 164, 63, 0.2) !important; }
</style>
<section class="catering-categories-section" style="padding: 80px 0; background-color: #f2fce8; position: relative;">
    <div class="container w-container">
        <h2 class="main_title" style="text-align: center; margin-bottom: 50px;">KATEGORIE CATERINGOWE</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 30px;">
            <div class="category-card" style="background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #d4ecd0; transition: transform 0.3s;">
                <div style="font-size: 40px; margin-bottom: 15px;">🥪</div>
                <h4 style="font-size: 18px; color: #0b250c; margin: 0; font-family: var(--font-family--rubik);">Pyszne Kanapki i Wrapy</h4>
            </div>
            <div class="category-card" style="background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #d4ecd0; transition: transform 0.3s;">
                <div style="font-size: 40px; margin-bottom: 15px;">☕</div>
                <h4 style="font-size: 18px; color: #0b250c; margin: 0; font-family: var(--font-family--rubik);">Przerwy Kawowe</h4>
            </div>
            <div class="category-card" style="background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #d4ecd0; transition: transform 0.3s;">
                <div style="font-size: 40px; margin-bottom: 15px;">🍱</div>
                <h4 style="font-size: 18px; color: #0b250c; margin: 0; font-family: var(--font-family--rubik);">Zestawy Obiadowe</h4>
            </div>
            <div class="category-card" style="background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #d4ecd0; transition: transform 0.3s;">
                <div style="font-size: 40px; margin-bottom: 15px;">🍢</div>
                <h4 style="font-size: 18px; color: #0b250c; margin: 0; font-family: var(--font-family--rubik);">Finger Food</h4>
            </div>
            <div class="category-card" style="background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #d4ecd0; transition: transform 0.3s;">
                <div style="font-size: 40px; margin-bottom: 15px;">🍲</div>
                <h4 style="font-size: 18px; color: #0b250c; margin: 0; font-family: var(--font-family--rubik);">Dania Ciepłe</h4>
            </div>
            <div class="category-card" style="background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #d4ecd0; transition: transform 0.3s;">
                <div style="font-size: 40px; margin-bottom: 15px;">🍰</div>
                <h4 style="font-size: 18px; color: #0b250c; margin: 0; font-family: var(--font-family--rubik);">Słodkie Bufety</h4>
            </div>
        </div>
    </div>
</section>
"""

bestsellers_html = """
<!-- BESTSELLERS SECTION -->
<style>
.bestseller-card:hover { transform: translateY(-8px); box-shadow: 0 30px 50px rgba(0,0,0,0.1) !important; }
</style>
<section class="bestsellers-section" style="padding: 100px 0; background: #fff;">
    <div class="container w-container">
        <h2 class="main_title" style="text-align: center; margin-bottom: 60px;">ABSOLUTNE HITY Z OFERTY</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px;">
            <!-- Hit 1 -->
            <div class="bestseller-card" style="background: #fdfdfd; border: 1px solid #eee; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.05); display: flex; flex-direction: column; transition: transform 0.4s, box-shadow 0.4s;">
                <img src="https://i.imgur.com/7synHWz.png" style="width: 100%; height: 280px; object-fit: cover;" alt="Kanapki Bankietowe">
                <div style="padding: 35px; display: flex; flex-direction: column; flex-grow: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <h3 style="font-size: 24px; font-weight: 800; color: #0b250c; margin: 0; line-height: 1.3;">Kanapki Bankietowe Premium</h3>
                        <span style="background: #c2a43f; color: #fff; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; white-space: nowrap; margin-left: 15px;">od 45 zł</span>
                    </div>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px; flex-grow: 1; font-family: var(--font-family--rubik);">Wyselekcjonowane wędliny, sery dojrzewające i chrupiące warzywa na wypiekanym pieczywie z lokalnej piekarni. Idealne na szybkie spotkania i lunche.</p>
                    <div style="background: #f2fce8; padding: 25px; border-radius: 12px; border-left: 4px solid #78a44f;">
                        <div style="color: #c2a43f; font-size: 16px; margin-bottom: 8px;">⭐⭐⭐⭐⭐ 5.0</div>
                        <p style="font-style: italic; color: #0b250c; font-size: 15px; line-height: 1.5; margin: 0;">"Znikały w mgnieniu oka! Wszyscy uczestnicy szkolenia pytali o przepis. Rewelacja!"</p>
                        <p style="font-size: 13px; color: #666; margin: 12px 0 0 0; font-weight: bold; text-transform: uppercase;">— Anna, HR Manager</p>
                    </div>
                </div>
            </div>
            <!-- Hit 2 -->
            <div class="bestseller-card" style="background: #fdfdfd; border: 1px solid #eee; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.05); display: flex; flex-direction: column; transition: transform 0.4s, box-shadow 0.4s;">
                <img src="https://i.imgur.com/YDePnDk.jpeg" style="width: 100%; height: 280px; object-fit: cover;" alt="Sycący Box Obiadowy">
                <div style="padding: 35px; display: flex; flex-direction: column; flex-grow: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <h3 style="font-size: 24px; font-weight: 800; color: #0b250c; margin: 0; line-height: 1.3;">Sycący Box Obiadowy (Zestaw)</h3>
                        <span style="background: #c2a43f; color: #fff; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; white-space: nowrap; margin-left: 15px;">od 38 zł</span>
                    </div>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px; flex-grow: 1; font-family: var(--font-family--rubik);">Domowy smak, który od razu dodaje energii do działania. Polędwiczki, pieczone ziemniaczki i bukiet świeżych surówek w wygodnym do podania formacie.</p>
                    <div style="background: #f2fce8; padding: 25px; border-radius: 12px; border-left: 4px solid #78a44f;">
                        <div style="color: #c2a43f; font-size: 16px; margin-bottom: 8px;">⭐⭐⭐⭐⭐ 5.0</div>
                        <p style="font-style: italic; color: #0b250c; font-size: 15px; line-height: 1.5; margin: 0;">"Najlepszy lunch firmowy jaki jedliśmy na evencie. Ciepłe, pyszne i dostarczone co do minuty!"</p>
                        <p style="font-size: 13px; color: #666; margin: 12px 0 0 0; font-weight: bold; text-transform: uppercase;">— Tomasz, Dyrektor IT</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
"""

why_us_html = """
<!-- WHY US SECTION -->
<style>
.why-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.08) !important; border-color: #c2a43f !important; }
</style>
<section class="why-us-section" style="padding: 100px 0; background-color: #0b250c; color: #fff;">
    <div class="container w-container">
        <h2 class="main_title title-white" style="text-align: center; margin-bottom: 70px;">DLACZEGO ZAUFAŁY NAM DZIESIĄTKI FIRM?</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; text-align: center;">
            <div class="why-card" style="padding: 40px 30px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(194, 164, 63, 0.2); transition: all 0.3s;">
                <div style="font-size: 55px; margin-bottom: 25px;">🥬</div>
                <h3 style="font-size: 22px; font-weight: bold; color: #c2a43f; margin-bottom: 15px;">Tylko Świeże Składniki</h3>
                <p style="color: #d4ecd0; line-height: 1.6; font-size: 15px;">Współpracujemy wyłącznie z zaufanymi dostawcami z regionu Sochaczewa. Nie używamy mrożonek ani tanich półproduktów – jakość jest na pierwszym miejscu.</p>
            </div>
            <div class="why-card" style="padding: 40px 30px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(194, 164, 63, 0.2); transition: all 0.3s;">
                <div style="font-size: 55px; margin-bottom: 25px;">⏱️</div>
                <h3 style="font-size: 22px; font-weight: bold; color: #c2a43f; margin-bottom: 15px;">Szwajcarska Punktualność</h3>
                <p style="color: #d4ecd0; line-height: 1.6; font-size: 15px;">Znamy doskonale rygor czasowy eventów firmowych. Catering zawsze czeka na miejscu przygotowany i perfekcyjnie podany przed przybyciem Twoich gości.</p>
            </div>
            <div class="why-card" style="padding: 40px 30px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(194, 164, 63, 0.2); transition: all 0.3s;">
                <div style="font-size: 55px; margin-bottom: 25px;">👨‍🍳</div>
                <h3 style="font-size: 22px; font-weight: bold; color: #c2a43f; margin-bottom: 15px;">Elastyczność i Pyszny Smak</h3>
                <p style="color: #d4ecd0; line-height: 1.6; font-size: 15px;">Menu bez problemu dostosowujemy do wszystkich wymogów dietetycznych (wegańskie, bezglutenowe, bez laktozy). Nikt z uczestników nie wyjdzie ze spotkania głodny!</p>
            </div>
        </div>
    </div>
</section>
"""

cta_html = """
<!-- NEW CTA SECTION -->
<style>
@media screen and (max-width: 991px) {
    .cta-grid { grid-template-columns: 1fr !important; }
}
.cta-form-input {
    width: 100%; padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #fff; font-family: inherit; font-size: 15px; outline: none; transition: border-color 0.3s, background 0.3s;
}
.cta-form-input:focus {
    border-color: #c2a43f; background: rgba(255,255,255,0.1);
}
.cta-form-input::placeholder { color: rgba(255,255,255,0.4); }
</style>
<section class="cta-section-new" style="padding: 100px 0; background-color: #f2fce8; background-image: url('assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68adabf24f52fc626fb515f5_c15df19e1a408c883f5a1ec5fa2eb301_border-shap.png'); background-position: top center; background-repeat: no-repeat;">
    <div class="container w-container">
        <h2 class="main_title" style="text-align: center; margin-bottom: 70px;">DOŁĄCZ DO NASZEGO CATERINGU – ZAMÓW NA EVENT</h2>
        <div class="cta-grid" style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 60px; align-items: start;">
            
            <!-- Left: Process -->
            <div style="background: #fff; padding: 50px 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); border: 1px solid #d4ecd0;">
                <h3 style="font-size: 26px; color: #0b250c; margin-bottom: 40px; font-weight: 800;">Proces zamówienia w 3 krokach</h3>
                
                <div style="display: flex; margin-bottom: 35px;">
                    <div style="width: 45px; height: 45px; background: #c2a43f; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 20px; flex-shrink: 0; margin-right: 20px; box-shadow: 0 5px 15px rgba(194, 164, 63, 0.4);">1</div>
                    <div>
                        <h4 style="font-size: 18px; font-weight: bold; color: #0b250c; margin-top: 10px; margin-bottom: 8px;">Opowiedz nam o evencie</h4>
                        <p style="color: #666; line-height: 1.6; margin: 0; font-size: 15px;">Wypełnij formularz obok podając podstawowe informacje, ilość osób i datę planowanego spotkania.</p>
                    </div>
                </div>
                
                <div style="display: flex; margin-bottom: 35px;">
                    <div style="width: 45px; height: 45px; background: #c2a43f; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 20px; flex-shrink: 0; margin-right: 20px; box-shadow: 0 5px 15px rgba(194, 164, 63, 0.4);">2</div>
                    <div>
                        <h4 style="font-size: 18px; font-weight: bold; color: #0b250c; margin-top: 10px; margin-bottom: 8px;">Dostosujemy Twoje Menu</h4>
                        <p style="color: #666; line-height: 1.6; margin: 0; font-size: 15px;">Nasz Szef Kuchni przygotuje dla Ciebie spersonalizowaną, darmową wycenę i zestawienie potraw, idealnie pod Twój budżet.</p>
                    </div>
                </div>
                
                <div style="display: flex;">
                    <div style="width: 45px; height: 45px; background: #78a44f; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 20px; flex-shrink: 0; margin-right: 20px; box-shadow: 0 5px 15px rgba(120, 164, 79, 0.4);">3</div>
                    <div>
                        <h4 style="font-size: 18px; font-weight: bold; color: #0b250c; margin-top: 10px; margin-bottom: 8px;">Ciesz się wspaniałym smakiem!</h4>
                        <p style="color: #666; line-height: 1.6; margin: 0; font-size: 15px;">Dostarczymy świeże dania prosto na miejsce, rozstawimy profesjonalny bufet i zadbamy o absolutny zachwyt Twoich gości.</p>
                    </div>
                </div>
            </div>
            
            <!-- Right: Form -->
            <div style="background: #0b250c; padding: 50px; border-radius: 20px; box-shadow: 0 20px 50px rgba(11, 37, 12, 0.2);">
                <h3 style="font-size: 26px; color: #fff; margin-bottom: 35px; font-weight: 800;">Poproś o darmową wycenę</h3>
                <form action="#" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="grid-column: span 2;">
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Imię i nazwisko</label>
                        <input type="text" class="cta-form-input" placeholder="np. Jan Kowalski">
                    </div>
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Nazwa Firmy</label>
                        <input type="text" class="cta-form-input" placeholder="opcjonalnie">
                    </div>
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Telefon</label>
                        <input type="tel" class="cta-form-input" placeholder="+48 000 000 000">
                    </div>
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">E-mail roboczy</label>
                        <input type="email" class="cta-form-input" placeholder="jan@firma.pl">
                    </div>
                    <div>
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Data Wydarzenia</label>
                        <input type="date" class="cta-form-input" style="color: rgba(255,255,255,0.7);">
                    </div>
                    <div style="grid-column: span 2;">
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Szacowana liczba gości</label>
                        <select class="cta-form-input" style="appearance: none; color: rgba(255,255,255,0.9);">
                            <option value="10-20">10 - 20 osób</option>
                            <option value="20-50">20 - 50 osób</option>
                            <option value="50-100">50 - 100 osób</option>
                            <option value="100+">Powyżej 100 osób</option>
                        </select>
                    </div>
                    <div style="grid-column: span 2;">
                        <label style="color: #d4ecd0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Więcej szczegółów (Co planujecie?)</label>
                        <textarea rows="4" class="cta-form-input" placeholder="Opisz krótko format wydarzenia, ew. wymogi dietetyczne..." style="resize: vertical;"></textarea>
                    </div>
                    <div style="grid-column: span 2; margin-top: 15px;">
                        <button type="submit" style="width: 100%; background: #c2a43f; color: #fff; border: none; padding: 20px; border-radius: 12px; font-size: 16px; font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: background 0.3s; text-transform: uppercase; box-shadow: 0 10px 20px rgba(194, 164, 63, 0.3);">Złóż zapytanie o wycenę</button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
</section>
"""

# Insert Categories after Hero section
content = re.sub(r'(<section class="home-hero-section".*?</section>)', r'\1\n' + categories_html, content, flags=re.DOTALL)

# Insert Bestsellers after product-section
content = re.sub(r'(<section class="product-section".*?</section>)', r'\1\n' + bestsellers_html, content, flags=re.DOTALL)

# Insert Why Us before CTA section, and replace CTA completely
content = re.sub(r'<section class="cta-section".*?</section>', why_us_html + '\n' + cta_html, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Massive UI update completed.")
