from PIL import Image
img = Image.open("scratch/temp_icon.png")
pixels = img.load()
width, height = img.size
corners = [pixels[0, 0], pixels[width-1, 0], pixels[0, height-1], pixels[width-1, height-1]]
center = pixels[width//2, height//2]
print("Corners:", corners)
print("Center:", center)

# Let's count some colors
from collections import Counter
colors = []
for y in range(0, height, 10):
    for x in range(0, width, 10):
        colors.append(pixels[x, y])
print("Most common colors:", Counter(colors).most_common(5))
