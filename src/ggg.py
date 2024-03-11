'''
import requests
from base64 import b64encode
import io
from PIL import Image
def toB64(imgUrl):
    return str(b64encode(requests.get(imgUrl).content))[2:-1]


api_key = "SG_b8d30654f2993bdd"
url = "https://api.segmind.com/v1/sd2.1-faceswapper"

# Request payload
data = {
  "input_face_image": toB64('https://upload.wikimedia.org/wikipedia/commons/2/2d/Amitabh.Bachchan.jpg'),
  "target_face_image": toB64('https://i0.wp.com/www.ritzmagazine.in/wp-content/uploads/2021/10/Amitabh-Bachchan.jpg?fit=700%2C501&ssl=1'),
  "file_type": "jpeg",
  "face_restore": True
}

response = requests.post(url, json=data, headers={'x-api-key': api_key})
print(response.content)
image = Image.open(io.BytesIO(response.content))
filename_depth = f"m_Depth.gif"
image.save(filename_depth)
print(response)'''

'''import requests
from base64 import b64encode
import io
from PIL import Image

def image_to_b64(image_path):
    with open(image_path, "rb") as img_file:

        return b64encode(img_file.read()).decode('utf-8')

api_key = "SG_6bc29753c1e8b8f7"
url = "https://api.segmind.com/v1/sd2.1-faceswapper"

# Paths to source and target images in the current directory
source_image_path = "hrithik-roshan-1.jpg"
target_image_path = "Phot.jpeg"

# Convert images to base64
source_b64 = image_to_b64(source_image_path)
target_b64 = image_to_b64(target_image_path)
print(source_b64)
# Request payload
data = {
    "file_type": "PNG",
    "face_restore": True,
    "input_face_image": target_b64,
    "target_face_image": source_b64

}
headers = {'x-api-key': api_key}

response = requests.post(url, json=data, headers=headers)
if response.status_code == 200:
    # Save the swapped image as 'output_image.jpg' in the current directory
    with open('output_image1.jpg', 'wb') as f:
        f.write(response.content)
    print("Face swap successful. Output image saved as 'output_image.jpg'.")
else:
    print("Face swap failed. Status code:", response.status_code)
    print("Error message:", response.text)
'''

import requests
from base64 import b64encode

def toB64(imgUrl):
    return str(b64encode(requests.get(imgUrl).content))[2:-1]


api_key = "SG_6bc29753c1e8b8f7"
url = "https://api.segmind.com/v1/sd2.1-faceswapper"
# Request payload
data = {
  "input_face_image": toB64('https://www.segmind.com/elon.jpg'),
  "target_face_image": toB64('https://www.segmind.com/burn.gif'),
  "file_type": "gif",
  "face_restore": True
}

response = requests.post(url, json=data, headers={'x-api-key': api_key})
print(response)