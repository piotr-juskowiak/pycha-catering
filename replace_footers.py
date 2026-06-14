import os
import re

iframe_code_root = """  <!-- CULINI FOOTER IMPORT -->
  <iframe class="culini-import-frame culini-footer-import-frame" src="culini-footer-import.html" title="Culini footer" scrolling="no"></iframe>
  <script>
    (() => {
      const frames = Array.from(document.querySelectorAll(".culini-import-frame"));
      if (!frames.length) return;
      let ticking = false;

      const sendFrameMetrics = () => {
        frames.forEach((frame) => {
          if (!frame.contentWindow) return;
          const rect = frame.getBoundingClientRect();
          frame.contentWindow.postMessage({
            type: "culini-parent-scroll",
            frameTop: rect.top,
            viewportHeight: window.innerHeight
          }, "*");
        });
        ticking = false;
      };

      const queueFrameMetrics = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(sendFrameMetrics);
      };

      window.addEventListener("message", (event) => {
        const frame = frames.find((candidate) => candidate.contentWindow === event.source);
        if (!frame) return;
        if (!event.data || event.data.type !== "culini-import-height") return;
            const nextHeight = Math.ceil(Number(event.data.height) || 0);
            if (nextHeight < 240) return;
            frame.style.height = nextHeight + "px";
        queueFrameMetrics();
      });

      frames.forEach((frame) => frame.addEventListener("load", queueFrameMetrics));
      window.addEventListener("scroll", queueFrameMetrics, { passive: true });
      window.addEventListener("resize", queueFrameMetrics);
    })();
  </script>
  <!-- END CULINI FOOTER IMPORT -->"""

iframe_code_sub = iframe_code_root.replace('"culini-footer-import.html"', '"../culini-footer-import.html"')
iframe_code_sub_2 = iframe_code_root.replace('"culini-footer-import.html"', '"../../culini-footer-import.html"')

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "<!-- CULINI FOOTER IMPORT -->" in content:
        return False # Already has the new footer
        
    # Find the footer tag using regex
    # We want to match <footer ...> ... </footer>
    pattern = re.compile(r'<footer[^>]*>.*?</footer>', re.DOTALL)
    
    if not pattern.search(content):
        return False
        
    depth = len(filepath.split(os.sep)) - 2 # -2 because . is 1, and the file is 1
    # Example: ./index.html -> split is ['.', 'index.html'] -> len is 2 -> depth 0
    # ./culini/home-1.html -> ['.', 'culini', 'home-1.html'] -> len is 3 -> depth 1
    
    if depth == 0:
        replacement = iframe_code_root
    elif depth == 1:
        replacement = iframe_code_sub
    elif depth == 2:
        replacement = iframe_code_sub_2
    else:
        # just fallback to root for safety or figure it out
        replacement = iframe_code_sub_2
        
    new_content = pattern.sub(replacement, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    return True

changed = 0
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') and file not in ['culini-footer-import.html']:
            filepath = os.path.join(root, file)
            if process_file(filepath):
                changed += 1
                print(f"Changed {filepath}")

print(f"Total files changed: {changed}")
