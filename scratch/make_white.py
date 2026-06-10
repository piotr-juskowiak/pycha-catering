from PIL import Image

path = "assets/white_forks.png"
img = Image.open(path).convert("RGBA")
width, height = img.size
pixels = img.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Change color to white, preserve original alpha
        pixels[x, y] = (255, 255, 255, a)

img.save(path, "PNG")
print("Successfully processed assets/white_forks.png to be white.")
