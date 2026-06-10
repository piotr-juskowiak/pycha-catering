import re

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_html = """
<style>
.about-redesign {
    position: relative;
    padding: 100px 0 140px 0;
    overflow: hidden;
    background-color: #faf8f2;
}
.about-redesign .container {
    position: relative;
    z-index: 10;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}
.about-text-content {
    background: rgba(250, 248, 242, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 20px;
}
.about-subtitle {
    color: #78a44f;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.about-subtitle::before, .about-subtitle::after {
    content: "";
    display: inline-block;
    width: 40px;
    height: 1px;
    background-color: #d4ecd0;
    margin: 0 15px;
}
.about-title {
    font-size: 42px;
    font-weight: 800;
    color: #0b250c;
    line-height: 1.2;
    margin-bottom: 30px;
    text-transform: uppercase;
}
.about-title span {
    color: #78a44f;
}
.about-desc {
    font-size: 16px;
    color: #444;
    line-height: 1.6;
    margin-bottom: 40px;
    font-family: var(--font-family--rubik);
}
.about-desc strong {
    color: #78a44f;
    font-weight: 700;
}
.about-features {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 40px;
}
.about-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.about-feature-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #78a44f;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    color: #78a44f;
    background-color: transparent;
}
.about-feature-icon svg {
    width: 24px;
    height: 24px;
}
.about-feature-text {
    font-size: 11px;
    font-weight: 800;
    color: #0b250c;
    text-align: center;
    text-transform: uppercase;
    line-height: 1.4;
    max-width: 90px;
}
.about-btn {
    background-color: #78a44f;
    color: #fff;
    padding: 15px 35px;
    border-radius: 12px;
    font-weight: 800;
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: background 0.3s;
}
.about-btn:hover { background-color: #5c8438; }
.about-btn svg { margin-left: 8px; }

/* Images */
.img-burger {
    position: absolute;
    left: -2vw;
    bottom: -5vw;
    width: 400px;
    max-width: 35vw;
    border-radius: 20px;
    border: 6px solid #d4ecd0;
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    z-index: 5;
    transform: rotate(-2deg);
}
.img-sandwich {
    position: absolute;
    right: 2vw;
    top: 50px;
    width: 350px;
    max-width: 30vw;
    border-radius: 20px;
    border: 6px solid #d4ecd0;
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    z-index: 5;
    transform: rotate(2deg);
}

@media (max-width: 991px) {
    .img-burger, .img-sandwich { opacity: 0.3; }
    .about-features { flex-wrap: wrap; gap: 20px; }
}
</style>

<section class="about-redesign">
    <!-- Images -->
    <img src="assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68a6c5e79103d7287f2fd246_about-one.png" class="img-burger" alt="Pyszny Burger">
    <img src="assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/68a6c60a82ad784545808799_about-two.png" class="img-sandwich" alt="Pyszne Kanapki">

    <div class="container w-container">
        <div class="about-text-content">
            <div class="about-subtitle">
                <svg width="24" height="24" style="margin-right:8px; color:#78a44f;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
                KIM JESTEŚMY?
            </div>
            <h2 class="about-title">Poznaj Pycha Catering – zespół z Sochaczewa, dla którego gotowanie to <span>PASJA.</span></h2>
            
            <p class="about-desc">Powstaliśmy z przyjaźni i wspólnej miłości do jedzenia. Wierzymy, że catering firmowy powinien oferować nie tylko wygodę, ale przede wszystkim <strong>bezkompromisową jakość, świeżość i doskonały smak.</strong> Stawiamy na sprawdzone receptury, by każdego dnia dostarczać Twojemu zespołowi dokładnie to, co najlepsze!</p>
            
            <div class="about-features">
                <div class="about-feature">
                    <div class="about-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20z"></path><path d="M2 12h20"></path></svg>
                    </div>
                    <div class="about-feature-text">ŚWIEŻE<br>SKŁADNIKI</div>
                </div>
                <div class="about-feature">
                    <div class="about-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>
                    </div>
                    <div class="about-feature-text">SPRAWDZONE<br>RECEPTURY</div>
                </div>
                <div class="about-feature">
                    <div class="about-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                    <div class="about-feature-text">GOTOWANIE<br>Z PASJĄ</div>
                </div>
                <div class="about-feature">
                    <div class="about-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V14a7 7 0 0 1 14 0v7"></path><path d="M12 4v3"></path><path d="M10 4h4"></path></svg>
                    </div>
                    <div class="about-feature-text">PUNKTUALNA<br>DOSTAWA</div>
                </div>
            </div>
            
            <a href="menu.html" class="about-btn">NASZE MENU <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
        </div>
    </div>
</section>
"""

match = re.search(r"<section class=\"home-about-section\".*?</section>", content, flags=re.DOTALL)
if match:
    content = content.replace(match.group(0), new_html)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Redesigned about section applied.")
else:
    print("Could not find home-about-section")
