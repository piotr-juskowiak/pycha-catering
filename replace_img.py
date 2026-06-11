with open("index.html", "r") as f:
    lines = f.readlines()

# Verify we are deleting the right lines
if "Right Column (Orbit Layout)" in lines[1238] and 'class="event-orbit-container"' in lines[1239] and '</div>' in lines[1355]:
    new_lines = lines[:1238] + [
        '        <!-- Right Column (Image) -->\n',
        '        <div class="event-right-col" style="display: flex; justify-content: center; align-items: center;">\n',
        '          <img src="https://i.imgur.com/5LYnqrB.png" alt="Oferta Eventowa" style="width: 100%; max-width: 600px; height: auto; object-fit: contain;">\n',
        '        </div>\n'
    ] + lines[1356:]
    
    with open("index.html", "w") as f:
        f.writelines(new_lines)
    print("Successfully replaced lines.")
else:
    print("Error: Lines do not match expected structure.")
    print("Line 1239:", lines[1238].strip())
    print("Line 1240:", lines[1239].strip())
    print("Line 1356:", lines[1355].strip())
