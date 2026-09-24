#!/usr/bin/env python3
"""Local static server that mimics Vercel's cleanUrls behaviour.

Plain `python3 -m http.server` returns 404 for extensionless links such as
/kim-jestesmy, which is how the whole site links between pages.

Usage: python3 scratch/dev-server.py [port]
"""

import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class CleanUrlHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)
        if os.path.isdir(local) or os.path.isfile(local):
            return local
        if not os.path.splitext(local)[1]:
            with_html = local.rstrip("/") + ".html"
            if os.path.isfile(with_html):
                return with_html
        return local

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    handler = partial(CleanUrlHandler, directory=ROOT)
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"Serving {ROOT} on http://127.0.0.1:{port} (clean URLs, no cache)")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
