from PIL import Image
img = Image.open("/Users/piotrjuskowiak/.gemini/antigravity-ide/brain/0980e094-ecf7-4bd2-8b3e-243e698df3c3/white_forks_icon_1781025295108.png").convert("L")
width, height = img.size

# Check the distribution of pixel values
vals = list(img.getdata())
from collections import Counter
# print the most common dark values (0-60)
dark_vals = [v for v in vals if v < 60]
print("Dark values distribution (top 15):", Counter(dark_vals).most_common(15))

# print the most common bright values (200-255)
bright_vals = [v for v in vals if v >= 200]
print("Bright values distribution (top 15):", Counter(bright_vals).most_common(15))
