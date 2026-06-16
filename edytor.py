import http.server
import socketserver
import json
import os
import webbrowser
import threading
import time
import base64

PORT = 5050
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(DIRECTORY, "assets/menu-popup/weekly-menu-data.js")

class EditorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_AUTHHEAD(self):
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm="Edytor Menu Pycha Catering"')
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def check_auth(self):
        # Base64 encoded 'admin:Pycha2026'
        expected = 'Basic ' + base64.b64encode(b'admin:Pycha2026').decode('utf-8')
        auth_header = self.headers.get('Authorization')
        if auth_header == expected:
            return True
        return False

    def do_GET(self):
        if not self.check_auth():
            self.do_AUTHHEAD()
            self.wfile.write(b"Brak dostepu. Wprowadz login i haslo.")
            return
        super().do_GET()

    def do_POST(self):
        if not self.check_auth():
            self.do_AUTHHEAD()
            self.wfile.write(b"Brak dostepu. Wprowadz login i haslo.")
            return

        if self.path == '/save_menu':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode('utf-8'))
                
                # Format exactly as the javascript object
                js_content = f"window.PYCHA_MENU_DATA = {json.dumps(payload, indent=4, ensure_ascii=False)};"
                
                with open(DATA_FILE, 'w', encoding='utf-8') as f:
                    f.write(js_content)
                    
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success'}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), EditorHandler) as httpd:
        print(f"\n===========================================")
        print(f"Edytor menu uruchomiony pomyślnie!")
        print(f"Otwórz w przeglądarce: http://localhost:{PORT}/edycja-menu.html")
        print(f"===========================================\n")
        print("Aby wyłączyć edytor, naciśnij CTRL+C")
        httpd.serve_forever()

if __name__ == "__main__":
    def open_browser():
        time.sleep(1)
        webbrowser.open(f"http://localhost:{PORT}/edycja-menu.html")
        
    threading.Thread(target=open_browser, daemon=True).start()
    start_server()
