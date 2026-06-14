import os
import re

new_footer_root = """  <!-- CULINI FOOTER IMPORT -->
  <style>
    .culini-import-frame {
      display: block;
      width: 100%;
      border: 0;
      background: #ffffff;
    }
    .culini-footer-import-frame {
      height: 900px;
    }
    @media (max-width: 767px) {
      .culini-footer-import-frame {
        height: 2100px;
      }
    }
  </style>
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

new_footer_sub = new_footer_root.replace('"culini-footer-import.html"', '"../culini-footer-import.html"')
new_footer_sub_2 = new_footer_root.replace('"culini-footer-import.html"', '"../../culini-footer-import.html"')

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if the file has the footer import block
    if "<!-- CULINI FOOTER IMPORT -->" not in content:
        return False
        
    # Check if we already applied the style (avoid double applying)
    if "<style>\n    .culini-import-frame {" in content:
        return False

    pattern = re.compile(r'<!-- CULINI FOOTER IMPORT -->.*?<!-- END CULINI FOOTER IMPORT -->', re.DOTALL)
    
    depth = len(filepath.split(os.sep)) - 2
    if depth == 0:
        replacement = new_footer_root
    elif depth == 1:
        replacement = new_footer_sub
    elif depth == 2:
        replacement = new_footer_sub_2
    else:
        replacement = new_footer_sub_2
        
    new_content = pattern.sub(replacement, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

changed = 0
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') and file not in ['culini-footer-import.html']:
            filepath = os.path.join(root, file)
            if process_file(filepath):
                changed += 1
                print(f"Fixed {filepath}")

print(f"Total files fixed: {changed}")
