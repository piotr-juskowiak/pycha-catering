#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "imprezy-firmowe",
    "szkolenia-i-konferencje",
    "uroczystosci-rodzinne",
    "eventy-i-premiery",
    "spotkania-biznesowe",
    "lunch-dla-firm",
    "coffee-break",
]

HEAD_LINKS = """  <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W==" referrerpolicy="no-referrer" rel="stylesheet" />
  <link href="/assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/css/forkly.webflow.shared.8b3cd058b.css" rel="stylesheet" type="text/css" />
  <link href="/assets/home-fonts.css" rel="stylesheet" type="text/css" />
  <link href="/assets/home-base.css" rel="stylesheet" type="text/css" />
  <link href="/main-styles.css" rel="stylesheet" type="text/css" />
  <link href="/custom-styles.css?v=7" rel="stylesheet" type="text/css" />
  <link href="/assets/inline-sections.css?v=22" rel="stylesheet" type="text/css" />
  <link href="/assets/offer-landing.css?v=16" rel="stylesheet" type="text/css" />
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>"""


def extract_chrome(index_html: str) -> tuple[str, str]:
    header_start = index_html.find('<header class="header-section">')
    header_end = index_html.find("</header>", header_start) + len("</header>")
    if header_start < 0 or header_end < len("</header>"):
        raise RuntimeError("Could not extract homepage header")

    chrome_start = index_html.find("<!-- CULINI FOOTER IMPORT -->")
    chrome_end = index_html.find("</body>")
    if chrome_start < 0 or chrome_end < 0:
        raise RuntimeError("Could not extract homepage footer")

    header = index_html[header_start:header_end]
    chrome = index_html[chrome_start:chrome_end]
    return header, chrome


def patch_page(path: Path, header: str, chrome: str) -> None:
    text = path.read_text(encoding="utf-8")
    if '<header class="header-section">' in text and "<!-- CULINI FOOTER IMPORT -->" in text:
        print(f"skipped {path.name} (homepage chrome already present)")
        return
    text = re.sub(
        r"  <link href=\"/assets/home-fonts.css\" rel=\"stylesheet\" />\n"
        r"  <link href=\"/assets/inline-sections.css\?v=20\" rel=\"stylesheet\" />\n"
        r"  <link href=\"/assets/offer-landing.css\" rel=\"stylesheet\" />",
        HEAD_LINKS,
        text,
        count=1,
    )
    text = re.sub(r'<header class="offer-header".*?</header>', header, text, count=1, flags=re.S)
    text = re.sub(
        r'<footer class="pycha-site-footer">.*?</html>\s*$',
        chrome + "\n</body>\n</html>\n",
        text,
        count=1,
        flags=re.S,
    )
    if '<header class="header-section">' not in text:
        raise RuntimeError(f"Header was not applied in {path.name}")
    if "<!-- CULINI FOOTER IMPORT -->" not in text:
        raise RuntimeError(f"Footer was not applied in {path.name}")
    path.write_text(text, encoding="utf-8")


def main() -> None:
    index_html = (ROOT / "index.html").read_text(encoding="utf-8")
    header, chrome = extract_chrome(index_html)
    for slug in PAGES:
        path = ROOT / f"{slug}.html"
        patch_page(path, header, chrome)
        print(f"updated {path.name}")


if __name__ == "__main__":
    main()
