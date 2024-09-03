import requests
import json
import time
import base64
from PIL import Image

# Call the API to get the eye location (POST) (formdata)
def get_eye_location():
    url = 'http://localhost:5001/locate'
    img_path = 'test/images/image.png'
    files = {'image': open(img_path, 'rb')}
    response = requests.post(url, files=files)
    return response.json()


if __name__ == '__main__':
    response = get_eye_location()
    img = response['image'] # base64 encoded image
    img = base64.b64decode(img)
    with open('test/images/eye_location.png', 'wb') as f:
        f.write(img)
        
    print('Eye location saved to test/images/eye_location.png')