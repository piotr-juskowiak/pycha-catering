from PIL import Image
import os

input_path = "/Users/piotrjuskowiak/.gemini/antigravity-ide/brain/0980e094-ecf7-4bd2-8b3e-243e698df3c3/white_forks_icon_1781025295108.png"
output_path = "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/assets/white_forks.png"

# Load original image
img = Image.open(input_path).convert("RGB")
width, height = img.size

# Create a new RGBA image
new_img = Image.new("RGBA", (width, height))
pixels = img.load()
new_pixels = new_img.load()

# Thresholds based on analysis
MIN_VAL = 21   # Anything <= 21 will be completely transparent
MAX_VAL = 250  # Anything >= 250 will be completely opaque

for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y]
        intensity = max(r, g, b)
        
        if intensity <= MIN_VAL:
            alpha = 0
        elif intensity >= MAX_VAL:
            alpha = 255
        else:
            # Linear interpolation
            alpha = int((intensity - MIN_VAL) * 255 / (MAX_VAL - MIN_VAL))
            
        # Set pixel to pure white with computed alpha
        new_pixels[x, y] = (255, 255, 255, alpha)

# Save output
os.makedirs(os.path.dirname(output_path), exist_ok=True)
new_img.save(output_path, "PNG")
print(f"Successfully processed image with contrast-stretch transparency and saved to {output_path}")
