import re
from bs4 import BeautifulSoup

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract the 6 image URLs from Tab 1 to reuse them
soup = BeautifulSoup(content, 'html.parser')
tab1 = soup.find("div", {"data-w-tab": "Tab 1"})
images = []
if tab1:
    imgs = tab1.find_all("img", class_="product-img")
    for img in imgs:
        if 'src' in img.attrs:
            images.append(img['src'])

# fallback images if not found
while len(images) < 6:
    images.append("https://via.placeholder.com/400")

new_html = f"""
<style>
.products-redesign {{
    position: relative;
    background-color: #6fa64f;
    padding: 120px 0;
    overflow: hidden;
    font-family: var(--font-family--rubik), sans-serif;
}}
.products-container {{
    position: relative;
    z-index: 10;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
}}

/* Header */
.products-header {{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30px;
}}
.products-header-left {{
    max-width: 800px;
}}
.products-title {{
    color: #ffffff;
    font-size: 56px;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1.1;
    margin-bottom: 20px;
    letter-spacing: 0;
}}
.products-subtitle {{
    color: #c9d8c6;
    font-size: 18px;
    max-width: 500px;
    line-height: 1.5;
}}
.products-btn {{
    background-color: #f7f3e8;
    color: #2b4927;
    padding: 16px 30px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: transform 0.3s;
}}
.products-btn:hover {{
    transform: translateY(-3px);
}}
.products-btn svg {{ margin-right: 10px; }}
.products-btn svg.arrow {{ margin-right: 0; margin-left: 15px; }}

/* Filters */
.products-filters {{
    display: flex;
    justify-content: center;
    gap: 18px;
    margin-bottom: 54px;
    flex-wrap: wrap;
}}
.products-filter {{
    display: flex;
    align-items: center;
    min-height: 56px;
    padding: 14px 34px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    background-color: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}}
.products-filter svg {{
    margin-right: 10px;
    width: 21px;
    height: 21px;
}}
.products-filter.active {{
    background-color: #f7f3e8;
    color: #2b4927;
    border-color: #f7f3e8;
}}

/* Grid */
.products-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin-bottom: 60px;
}}
.menu-card {{
    background-color: #f5eedc;
    border-radius: 16px;
    display: flex;
    overflow: hidden;
    height: 180px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    transition: transform 0.3s;
}}
.menu-card:hover {{
    transform: translateY(-5px);
}}
.menu-card-img {{
    width: 45%;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
}}
.menu-card-content {{
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
}}
.menu-card-title {{
    color: #2b4927;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 5px;
    line-height: 1.2;
}}
.menu-card-separator {{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}}
.menu-card-separator svg {{
    color: #78a44f;
    width: 14px;
    height: 14px;
    margin-right: 10px;
}}
.menu-card-separator .dots {{
    flex-grow: 1;
    border-bottom: 1px dashed rgba(43, 73, 39, 0.2);
    height: 1px;
}}
.menu-card-desc {{
    font-size: 11px;
    color: #555;
    line-height: 1.4;
    margin-bottom: auto;
}}
.menu-card-price {{
    font-size: 20px;
    font-weight: 800;
    color: #2b4927;
    margin-top: 10px;
}}

/* Footer */
.products-footer {{
    text-align: center;
    color: #c9d8c6;
    font-style: italic;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Georgia', serif;
}}
.products-footer svg {{
    margin-top: 10px;
    color: #78a44f;
}}

.products-section-cta {{
    display: flex;
    justify-content: center;
    margin-top: 34px;
}}

@media (max-width: 1200px) {{
    .products-grid {{ grid-template-columns: repeat(2, 1fr); }}
}}
@media (max-width: 768px) {{
    .products-grid {{ grid-template-columns: 1fr; }}
    .products-header {{ flex-direction: column; align-items: flex-start; gap: 20px; }}
    .products-title {{ font-size: 40px; }}
}}
</style>

<section class="products-redesign">
    <div class="products-container">
        <div class="products-header">
            <div class="products-header-left">
                <h2 class="products-title">SMAKI DLA<br>TWOJEGO ZESPOŁU!</h2>
                <p class="products-subtitle">Świeże, pyszne i zbilansowane posiłki, które dodają energii i wspierają Twój zespół każdego dnia.</p>
            </div>
        </div>
        
        <div class="products-filters">
            <div class="products-filter active">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v4H4zM16 4h4v4h-4zM10 4h4v4h-4zM4 10h4v4H4zM16 10h4v4h-4zM10 10h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4zM10 16h4v4h-4z"></path></svg>
                Wszystkie
            </div>
            <div class="products-filter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M12 8v4l3 3"></path></svg>
                Śniadania
            </div>
            <div class="products-filter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"></path><path d="M5 21V14a7 7 0 0 1 14 0v7"></path><path d="M12 4v3"></path><path d="M10 4h4"></path></svg>
                Obiady
            </div>
            <div class="products-filter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                Zestawy
            </div>
        </div>
        
        <div class="products-grid">
            <!-- Card 1 -->
            <div class="menu-card">
                <div class="menu-card-img" style="background-image: url('{images[0]}');"></div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">ŚNIADANIE<br>MISTRZÓW</h3>
                    <div class="menu-card-separator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path></svg>
                        <div class="dots"></div>
                    </div>
                    <p class="menu-card-desc">Pełne energii śniadanie z najlepszych składników.</p>
                    <div class="menu-card-price">40,00 zł</div>
                </div>
            </div>
            
            <!-- Card 2 -->
            <div class="menu-card">
                <div class="menu-card-img" style="background-image: url('{images[1]}');"></div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">LEKKI<br>ŚWIT</h3>
                    <div class="menu-card-separator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path></svg>
                        <div class="dots"></div>
                    </div>
                    <p class="menu-card-desc">Lekka słodycz na dobry początek dnia.</p>
                    <div class="menu-card-price">27,00 zł</div>
                </div>
            </div>
            
            <!-- Card 3 -->
            <div class="menu-card">
                <div class="menu-card-img" style="background-image: url('{images[2]}');"></div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">KLASYKA<br>O PORANKU</h3>
                    <div class="menu-card-separator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path></svg>
                        <div class="dots"></div>
                    </div>
                    <p class="menu-card-desc">Klasyczne smaki, które zawsze się sprawdzają.</p>
                    <div class="menu-card-price">17,49 zł</div>
                </div>
            </div>
            
            <!-- Card 4 -->
            <div class="menu-card">
                <div class="menu-card-img" style="background-image: url('{images[3]}');"></div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">DOMOWY<br>KLASYK</h3>
                    <div class="menu-card-separator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path></svg>
                        <div class="dots"></div>
                    </div>
                    <p class="menu-card-desc">Domowe smaki, które dają energię.</p>
                    <div class="menu-card-price">15,00 zł</div>
                </div>
            </div>
            
            <!-- Card 5 -->
            <div class="menu-card">
                <div class="menu-card-img" style="background-image: url('{images[4]}');"></div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">LEKKIE<br>POPOŁUDNIE</h3>
                    <div class="menu-card-separator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path></svg>
                        <div class="dots"></div>
                    </div>
                    <p class="menu-card-desc">Lekko, zdrowo i pysznie – idealne na popołudnie.</p>
                    <div class="menu-card-price">24,00 zł</div>
                </div>
            </div>
            
            <!-- Card 6 -->
            <div class="menu-card">
                <div class="menu-card-img" style="background-image: url('{images[5]}');"></div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">SPECJAŁ<br>SZEFA</h3>
                    <div class="menu-card-separator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path></svg>
                        <div class="dots"></div>
                    </div>
                    <p class="menu-card-desc">Wyjątkowe danie stworzone przez szefa.</p>
                    <div class="menu-card-price">70,00 zł</div>
                </div>
            </div>
            
        </div>
        
        <div class="products-footer">
            Gotujemy z pasją dla Twojego zespołu
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </div>
        <div class="products-section-cta">
            <a href="menu.html" class="products-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M12 8v4l3 3"></path></svg>
                ZOBACZ AKTUALNE MENU
                <svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </a>
        </div>
    </div>
</section>
"""

match = re.search(r"<section class=\"product-section\">.*?</section>", content, flags=re.DOTALL)
if match:
    content = content.replace(match.group(0), new_html)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Products section perfectly redesigned.")
else:
    print("Could not find product-section")
