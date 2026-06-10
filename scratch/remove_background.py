import urllib.request
import os
from PIL import Image
import rembg

os.makedirs("/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/assets/redesign", exist_ok=True)

images = {
    "large": {
        "url": "https://i.imgur.com/Zv1R91C.jpeg",
        "output_path": "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/assets/redesign/about_photo_large_no_bg.png"
    },
    "small": {
        "url": "https://i.imgur.com/LydPwgZ.jpeg",
        "output_path": "/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/assets/redesign/about_photo_small_no_bg.png"
    }
}

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"

for key, img_info in images.items():
    print(f"Downloading {key} image from {img_info['url']}...")
    temp_download_path = f"/Users/piotrjuskowiak/Downloads/us.sitesucker.mac.sitesucker-pro/nimble-owl-6de25.rehost.site/scratch/temp_{key}.jpg"
    
    req = urllib.request.Request(img_info['url'], headers={'User-Agent': user_agent})
    with urllib.request.urlopen(req) as response:
        with open(temp_download_path, 'wb') as out_file:
            out_file.write(response.read())
            
    print(f"Removing background from {key} image...")
    with open(temp_download_path, 'rb') as input_file:
        input_data = input_file.read()
        output_data = rembg.remove(input_data)
        
    with open(img_info['output_path'], 'wb') as output_file:
        output_file.write(output_data)
        
    print(f"Saved background-removed image to {img_info['output_path']}")
    
    # Clean up temp file
    if os.path.exists(temp_download_path):
        os.remove(temp_download_path)

print("All done!")
