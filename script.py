
import re
import os
import requests
from pathlib import Path

# Read the JS file
with open('/Users/creewick/Desktop/index.js', 'r') as file:
    content = file.read()

# Find all .webp URLs using regex
webp_urls = re.findall(r'"(/assets/.*?\.webp)"', content)

# Create images directory if it doesn't exist
output_dir = Path('./images')
output_dir.mkdir(exist_ok=True)

# Download each webp file
for url in webp_urls:
    try:
        # Get filename from URL
        filename = os.path.basename(url)
        # Clean up random characters from filename
        filename = re.sub(r'-[^-]*\.webp$', '.webp', filename)
        output_path = output_dir / filename
        
        # Download file
        url = 'https://botc.app' + url
        response = requests.get(url)
        response.raise_for_status()
        
        # Save file
        with open(output_path, 'wb') as f:
            f.write(response.content)
            
        print(f'Downloaded {filename}')
            
    except Exception as e:
        print(f'Error downloading {url}: {str(e)}')
