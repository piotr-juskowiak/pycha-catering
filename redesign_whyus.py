import re

file_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_why_us = """<style>
.why-card:hover { transform: translateY(-10px); background: rgba(30, 65, 32, 0.6) !important; border-color: #dcb846 !important; box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important; }
</style>
<section class="why-us-section" style="padding: 140px 0; background-color: #0b250c; background-image: linear-gradient(to bottom, rgba(11,37,12,0.85), rgba(11,37,12,0.95)), url('assets/cdn.prod.website-files.com/68a16aa64bc7bbb4ba7899bf/68b6875644d9dd37e2223985_pd-6.avif'); background-size: cover; background-position: center; background-attachment: fixed; color: #fff; position: relative;">
<div class="container w-container" style="position: relative; z-index: 2;">
<div style="text-align: center; margin-bottom: 80px;">
    <h4 style="color: #c2a43f; font-size: 14px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px;">Nasze Wartości</h4>
    <h2 class="main_title title-white" style="margin: 0; font-size: 48px;">DLACZEGO ZAUFAŁY NAM<br>DZIESIĄTKI FIRM?</h2>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; text-align: center;">
<!-- Card 1 -->
<div class="why-card" style="padding: 50px 40px; background: rgba(20, 45, 22, 0.4); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border-radius: 24px; border: 1px solid rgba(194, 164, 63, 0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.3); transition: all 0.4s;">
<div style="width: 80px; height: 80px; margin: 0 auto 30px; display: flex; justify-content: center; align-items: center; background: rgba(194, 164, 63, 0.1); border-radius: 50%; color: #c2a43f; border: 1px solid rgba(194, 164, 63, 0.2);">
<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 20A7 7 0 0 1 4 13c0-3.5 3-7 8-11 5 4 8 7.5 8 11a7 7 0 0 1-7 7v4"></path></svg>
</div>
<h3 style="font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 15px;">Tylko Świeże Składniki</h3>
<p style="color: rgba(255,255,255,0.75); line-height: 1.7; font-size: 16px;">Współpracujemy wyłącznie z zaufanymi dostawcami z regionu Sochaczewa. Nie używamy mrożonek ani tanich półproduktów – jakość jest u nas na absolutnie pierwszym miejscu.</p>
</div>
<!-- Card 2 -->
<div class="why-card" style="padding: 50px 40px; background: rgba(20, 45, 22, 0.4); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border-radius: 24px; border: 1px solid rgba(194, 164, 63, 0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.3); transition: all 0.4s;">
<div style="width: 80px; height: 80px; margin: 0 auto 30px; display: flex; justify-content: center; align-items: center; background: rgba(194, 164, 63, 0.1); border-radius: 50%; color: #c2a43f; border: 1px solid rgba(194, 164, 63, 0.2);">
<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
</div>
<h3 style="font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 15px;">Szwajcarska Punktualność</h3>
<p style="color: rgba(255,255,255,0.75); line-height: 1.7; font-size: 16px;">Znamy doskonale rygor czasowy eventów firmowych. Catering zawsze czeka na miejscu przygotowany i perfekcyjnie podany na długo przed przybyciem Twoich gości.</p>
</div>
<!-- Card 3 -->
<div class="why-card" style="padding: 50px 40px; background: rgba(20, 45, 22, 0.4); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border-radius: 24px; border: 1px solid rgba(194, 164, 63, 0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.3); transition: all 0.4s;">
<div style="width: 80px; height: 80px; margin: 0 auto 30px; display: flex; justify-content: center; align-items: center; background: rgba(194, 164, 63, 0.1); border-radius: 50%; color: #c2a43f; border: 1px solid rgba(194, 164, 63, 0.2);">
<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
</div>
<h3 style="font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 15px;">Elastyczność i Smak</h3>
<p style="color: rgba(255,255,255,0.75); line-height: 1.7; font-size: 16px;">Menu bez problemu dostosowujemy do wszelkich wymogów dietetycznych (opcje wegańskie, bezglutenowe). Dbamy o to, by nikt nie wyszedł ze spotkania głodny!</p>
</div>
</div>
</div>
</section>"""

# Using regex to find the old why-us-section
match = re.search(r"<style>\n\.why-card:hover.*?</section>", content, flags=re.DOTALL)
if not match:
    # try another regex
    match = re.search(r"<section class=\"why-us-section\".*?</section>", content, flags=re.DOTALL)

if match:
    content = content.replace(match.group(0), new_why_us)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Why Us section successfully redesigned.")
else:
    print("Could not find why-us-section")
