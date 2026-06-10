import requests
from PIL import Image
import os

url = "https://i.imgur.com/kGtBj9u.png"
dest = "scratch/new_forks.png"

os.makedirs("scratch", exist_ok=True)
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
response = requests.get(url, headers=headers)
if response.status_code == 200:
    with open(dest, "wb") as f:
        f.write(response.content)
    img = Image.open(dest)
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    pixels = img.load()
    print("Corner pixel:", pixels[0, 0])
else:
    print(f"Failed to download: {response.status_code}")
