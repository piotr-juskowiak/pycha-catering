import os
import re

root_dir = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site"

html_files = []
for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith(".html"):
            if filename not in ["hits_temp.html", "cta_temp.html"]:
                html_files.append(os.path.join(dirpath, filename))

def get_footer_content(rel_path):
    parts = rel_path.split(os.sep)
    level = len(parts) - 1
    
    # Prefix calculation
    prefix = "" if level == 0 else "../"
    
    logo_href = f"{prefix}index.html"
    home_href = f"{prefix}index.html"
    about_href = f"{prefix}about.html"
    menu_href = f"{prefix}menu.html"
    blog_href = f"{prefix}blog.html"
    contact_href = f"{prefix}contact.html"
    privacy_href = f"{prefix}utility/privacy-policy.html"
    terms_href = f"{prefix}utility/terms-and-condition.html"
    
    logo_path = f"{prefix}assets/pycha-logo-transparent.png"

    if level == 1 and parts[0] == "utility":
        privacy_href = "privacy-policy.html"
        terms_href = "terms-and-condition.html"

    return f"""<!-- PYCHA CATERING FOOTER -->
<style>
  .pycha-footer,
  .pycha-footer * {{
    box-sizing: border-box;
  }}

  .pycha-footer {{
    position: relative;
    background:
      radial-gradient(circle at 8% 18%, rgba(120, 164, 79, 0.08), transparent 28%),
      radial-gradient(circle at 88% 12%, rgba(19, 47, 20, 0.02), transparent 30%),
      #fffbef; /* Warm light cream background like header */
    color: #132f14; /* Dark forest green text */
    padding: 80px 0 0;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }}

  .pycha-footer::before {{
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(19, 47, 20, 0.04) 1px, transparent 1px);
    background-size: 22px 22px;
    opacity: 0.8;
    pointer-events: none;
  }}

  .pycha-footer__container {{
    position: relative;
    z-index: 2;
  }}

  .pycha-footer__top {{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 60px;
    margin-bottom: 60px;
  }}

  .pycha-footer__brand {{
    display: flex;
    align-items: flex-start;
    gap: 40px;
  }}

  .pycha-footer__logo-img {{
    max-height: 70px;
    width: auto;
    display: block;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.05));
  }}

  .pycha-footer__desc {{
    max-width: 420px;
    margin: 0;
    padding-top: 5px;
    color: rgba(19, 47, 20, 0.8);
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
  }}

  .pycha-footer__contact {{
    display: flex;
    align-items: center;
    gap: 28px;
    padding-top: 14px;
  }}

  .pycha-footer__phone {{
    color: #132f14;
    text-decoration: none;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    transition: color 0.25s ease;
  }}

  .pycha-footer__phone:hover {{
    color: #78a44f;
  }}

  .pycha-footer__divider {{
    width: 1px;
    height: 30px;
    background: rgba(19, 47, 20, 0.15);
  }}

  .pycha-footer__socials {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}

  .pycha-footer__socials a {{
    width: 38px;
    height: 38px;
    border-radius: 999px;
    background: rgba(19, 47, 20, 0.05);
    border: 1px solid rgba(19, 47, 20, 0.15);
    color: #132f14;
    text-decoration: none;
    font-size: 15px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }}

  .pycha-footer__socials a:hover {{
    background: #78a44f;
    border-color: #78a44f;
    color: #ffffff;
    transform: translateY(-3px);
  }}

  .pycha-footer__main {{
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 80px;
    align-items: flex-start;
    margin-bottom: 60px;
  }}

  .pycha-footer__gallery {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }}

  .pycha-footer__gallery img {{
    width: 100%;
    height: 132px;
    object-fit: cover;
    display: block;
    border-radius: 6px;
    border: 1px solid rgba(19, 47, 20, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    filter: saturate(1.02) contrast(0.98);
    transition: transform 0.25s ease, border-color 0.25s ease;
  }}

  .pycha-footer__gallery img:hover {{
    transform: translateY(-2px);
    border-color: rgba(120, 164, 79, 0.5);
  }}

  .pycha-footer__nav {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
  }}

  .pycha-footer__col {{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }}

  .pycha-footer__title {{
    margin-bottom: 24px;
    color: #78a44f;
    font-size: 13px;
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }}

  .pycha-footer__col a {{
    color: #1d3f20;
    text-decoration: none;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 600;
    margin-bottom: 16px;
    transition: color 0.25s ease, transform 0.25s ease;
  }}

  .pycha-footer__col a:hover {{
    color: #78a44f;
    transform: translateX(4px);
  }}

  .pycha-footer__bottom {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    padding-top: 30px;
    padding-bottom: 40px;
    border-top: 1px solid rgba(19, 47, 20, 0.08);
    color: rgba(19, 47, 20, 0.6);
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
  }}

  .pycha-footer__bottom p {{
    margin: 0;
  }}

  .pycha-footer__bottom a {{
    color: rgba(19, 47, 20, 0.6);
    text-decoration: none;
    transition: color 0.25s ease;
  }}

  .pycha-footer__bottom a:hover {{
    color: #78a44f;
    text-decoration: underline;
  }}

  /* DOLNY OBRAZ Z PARALLAXEM */

  .pycha-footer__hero {{
    --pycha-parallax-y: -70px;
    --pycha-reveal: 30%;

    position: relative;
    z-index: 2;
    margin-left: 0;
    margin-right: 0;
    height: clamp(200px, 24vw, 340px);
    overflow: hidden;
    border-top: 1px solid rgba(19, 47, 20, 0.08);
    clip-path: inset(var(--pycha-reveal) 0 0 0);
    background: #fffbef;
    border-radius: 8px 8px 0 0;
  }}

  .pycha-footer__hero::before {{
    content: "";
    position: absolute;
    inset: -120px 0;
    background-image:
      linear-gradient(rgba(253, 250, 240, 0.1), rgba(253, 250, 240, 0.25)),
      url("https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=2200&q=80");
    background-size: cover;
    background-position: center center;
    transform: translate3d(0, var(--pycha-parallax-y), 0) scale(1.1);
    will-change: transform;
  }}

  .pycha-footer__hero::after {{
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to bottom,
        rgba(253, 250, 240, 0.3),
        transparent 50%,
        rgba(253, 250, 240, 0.3)
      );
    pointer-events: none;
  }}

  @media (max-width: 1100px) {{
    .pycha-footer__top {{
      flex-direction: column;
      gap: 32px;
      margin-bottom: 48px;
    }}

    .pycha-footer__main {{
      grid-template-columns: 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }}

    .pycha-footer__nav {{
      max-width: 760px;
    }}
  }}

  @media (max-width: 760px) {{
    .pycha-footer {{
      padding-top: 50px;
    }}

    .pycha-footer__brand {{
      flex-direction: column;
      gap: 18px;
    }}

    .pycha-footer__logo-img {{
      max-height: 60px;
    }}

    .pycha-footer__desc {{
      font-size: 15px;
    }}

    .pycha-footer__contact {{
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }}

    .pycha-footer__divider {{
      display: none;
    }}

    .pycha-footer__gallery {{
      grid-template-columns: 1fr;
    }}

    .pycha-footer__gallery img {{
      height: 200px;
    }}

    .pycha-footer__nav {{
      grid-template-columns: 1fr;
      gap: 32px;
    }}

    .pycha-footer__title {{
      margin-bottom: 16px;
    }}

    .pycha-footer__col a {{
      font-size: 16px;
      margin-bottom: 12px;
    }}

    .pycha-footer__hero {{
      height: 200px;
      --pycha-reveal: 18%;
    }}
  }}

  @media (prefers-reduced-motion: reduce) {{
    .pycha-footer__hero {{
      clip-path: inset(0 0 0 0);
    }}

    .pycha-footer__hero::before {{
      transform: none;
    }}
  }}
</style>

<footer class="pycha-footer">
  <div class="w-layout-blockcontainer container w-container pycha-footer__container">

    <div class="pycha-footer__top">
      <div class="pycha-footer__brand">
        <a href="{logo_href}" class="pycha-footer__logo-link">
          <img src="{logo_path}" alt="Pycha Catering" class="pycha-footer__logo-img" />
        </a>

        <p class="pycha-footer__desc">
          Świeże i pyszne posiłki na każdą okazję. Catering firmowy, eventowy
          i okolicznościowy przygotowany z dbałością o smak.
        </p>
      </div>

      <div class="pycha-footer__contact">
        <a href="tel:+48500000000" class="pycha-footer__phone">
          +48 500 000 000
        </a>

        <div class="pycha-footer__divider"></div>

        <div class="pycha-footer__socials">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">ig</a>
          <a href="#" aria-label="TikTok">tt</a>
          <a href="#" aria-label="Pinterest">p</a>
        </div>
      </div>
    </div>

    <div class="pycha-footer__main">
      <div class="pycha-footer__gallery">
        <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=80" alt="Danie cateringowe">
        <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80" alt="Deser cateringowy">
        <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80" alt="Makaron cateringowy">
      </div>

      <nav class="pycha-footer__nav" aria-label="Nawigacja w stopce">
        <div class="pycha-footer__col">
          <span class="pycha-footer__title">Menu</span>
          <a href="{home_href}">Strona główna</a>
          <a href="{about_href}">Kim jesteśmy?</a>
          <a href="{menu_href}">Nasza oferta</a>
        </div>

        <div class="pycha-footer__col">
          <span class="pycha-footer__title">Oferta</span>
          <a href="{menu_href}">Catering firmowy</a>
          <a href="{menu_href}">Catering eventowy</a>
          <a href="#" id="openMenuModal3">Menu tygodniowe</a>
          <a href="{contact_href}">Wycena cateringu</a>
        </div>

        <div class="pycha-footer__col">
          <span class="pycha-footer__title">Kontakt</span>
          <a href="{blog_href}">Aktualności</a>
          <a href="{about_href}">Realizacje</a>
          <a href="{contact_href}">Kontakt</a>
          <a href="#" onclick="window.print(); return false;">Pobierz menu PDF</a>
        </div>
      </nav>
    </div>

    <div class="pycha-footer__bottom">
      <p>
        © Pycha Catering. Wszelkie prawa zastrzeżone.
        <a href="{privacy_href}">Polityka prywatności</a>
      </p>

      <p>
        <a href="{terms_href}">Regulamin</a>
        ·
        <a href="{home_href}">Mapa strony</a>
      </p>
    </div>

  </div>

  <div class="pycha-footer__hero" aria-hidden="true"></div>
</footer>

<script>
  (() => {{
    const hero = document.querySelector(".pycha-footer__hero");

    if (!hero) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {{
      hero.style.setProperty("--pycha-reveal", "0%");
      hero.style.setProperty("--pycha-parallax-y", "0px");
      return;
    }}

    let ticking = false;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateParallax = () => {{
      const rect = hero.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const absoluteTop = rect.top + window.pageYOffset;
      const scrollStart = absoluteTop - windowHeight;
      const scrollEnd = document.documentElement.scrollHeight - windowHeight;
      const scrollRange = scrollEnd - scrollStart;

      let progress = 0;
      if (scrollRange > 0) {{
        progress = clamp((window.pageYOffset - scrollStart) / scrollRange, 0, 1);
      }} else {{
        progress = 1;
      }}

      const reveal = 30 - progress * 30;
      const parallaxY = -120 + progress * 190;

      hero.style.setProperty("--pycha-reveal", `${{reveal.toFixed(2)}}%`);
      hero.style.setProperty("--pycha-parallax-y", `${{parallaxY.toFixed(2)}}px`);

      ticking = false;
    }};

    const onScroll = () => {{
      if (!ticking) {{
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }}
    }};

    window.addEventListener("scroll", onScroll, {{ passive: true }});
    window.addEventListener("resize", onScroll);

    updateParallax();
  }})();
</script>"""

print(f"Total HTML files to process: {len(html_files)}")
modified_count = 0

for filepath in html_files:
    rel_path = os.path.relpath(filepath, root_dir)
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    pattern = r'(?:<!-- PYCHA CATERING FOOTER -->\s*)?<style>[\s\S]*?\.pycha-footer[\s\S]*?</style>\s*<footer class="pycha-footer">[\s\S]*?</footer>\s*<script>[\s\S]*?--pycha-parallax-y[\s\S]*?</script>'
    
    new_footer = get_footer_content(rel_path)
    new_content, count = re.subn(pattern, new_footer, content)
    
    if count == 0:
        fallback_pattern = r'<style>[\s\S]*?\.pycha-footer[\s\S]*?</style>\s*<footer class="pycha-footer">[\s\S]*?</footer>\s*<script>[\s\S]*?</script>'
        new_content, count = re.subn(fallback_pattern, new_footer, content)

    if count > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Replaced footer in: {rel_path}")
        modified_count += 1
    else:
        print(f"WARNING: Custom Footer NOT found in: {rel_path}")

print(f"\nDone. Replaced custom footer in {modified_count} out of {len(html_files)} files.")
