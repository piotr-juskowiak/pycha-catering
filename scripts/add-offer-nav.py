#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OFFERS = [
    ("imprezy-firmowe", "Imprezy firmowe"),
    ("szkolenia-i-konferencje", "Szkolenia i konferencje"),
    ("uroczystosci-rodzinne", "Uroczystości rodzinne"),
    ("eventy-i-premiery", "Eventy i premiery"),
    ("spotkania-biznesowe", "Spotkania biznesowe"),
    ("lunch-dla-firm", "Lunch dla firm"),
    ("coffee-break", "Coffee break"),
]
NAV_RE = re.compile(r'(<div class="nav-menu"[^>]*>)(.*?)(</div>)', re.S)
MARKER = "Kim jesteśmy?</a>"


def dropdown_html(current: str | None) -> str:
    current_class = " is-current" if current else ""
    links = []
    for slug, label in OFFERS:
        extra = ' is-current" aria-current="page"' if slug == current else '"'
        links.append(f'<a class="nav-offer__link{extra} href="/{slug}">{label}</a>')
    return (
        f'<div class="nav-offer{current_class}">'
        f'<button type="button" class="nav-link nav-offer__toggle" aria-expanded="false" aria-haspopup="true">Oferta</button>'
        f'<div class="nav-offer__panel">{"".join(links)}</div>'
        f"</div>"
    )


DETAILS_RE = re.compile(
    r'<details class="nav-offer( is-current)?">\s*'
    r'<summary class="nav-link nav-offer__toggle">Oferta</summary>'
    r'(<div class="nav-offer__panel">.*?</div>)</details>',
    re.S,
)


def convert_details(text: str) -> tuple[str, bool]:
    new_text, count = DETAILS_RE.subn(
        r'<div class="nav-offer\1">'
        r'<button type="button" class="nav-link nav-offer__toggle" aria-expanded="false" aria-haspopup="true">Oferta</button>'
        r"\2</div>",
        text,
        count=1,
    )
    return new_text, count > 0


def current_slug_for(path: Path) -> str | None:
    slug = path.stem
    if slug in {item[0] for item in OFFERS}:
        return slug
    return None


def inject(text: str, current: str | None) -> tuple[str, bool]:
    match = NAV_RE.search(text)
    if not match:
        return text, False
    inner = match.group(2)
    if "nav-offer" in inner:
        return text, False
    if MARKER not in inner:
        return text, False
    new_inner = inner.replace(MARKER, MARKER + dropdown_html(current), 1)
    start, end = match.span()
    return text[: start] + match.group(1) + new_inner + match.group(3) + text[end:], True


def main() -> None:
    updated = 0
    skipped = 0
    missing = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "node_modules" in path.parts or "assets" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        converted, converted_changed = convert_details(text)
        new_text, injected = inject(converted, current_slug_for(path))
        changed = converted_changed or injected
        if changed:
            path.write_text(new_text, encoding="utf-8")
            updated += 1
            print(f"updated {path.relative_to(ROOT)}")
        elif "nav-offer" in new_text:
            skipped += 1
        elif '<div class="nav-menu"' in text:
            missing += 1
            print(f"missing marker {path.relative_to(ROOT)}")
    print(f"done updated={updated} skipped={skipped} missing={missing}")


if __name__ == "__main__":
    main()
