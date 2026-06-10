from PIL import Image
img = Image.open("assets/white_forks.png")
print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
pixels = img.load()
width, height = img.size

# Check corner pixel (should be transparent)
print("Corner pixel:", pixels[0, 0])

# Find first non-transparent pixel to verify colors
non_transparent = None
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 200:
            non_transparent = (x, y, (r, g, b, a))
            break
    if non_transparent:
        break
print("Opaque pixel sample:", non_transparent)
