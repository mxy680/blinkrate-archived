from flask import Flask, request, jsonify
import cv2
import dlib
import numpy as np
import base64
from PIL import Image

app = Flask(__name__)

# Load the Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier('models/haarcascade_frontalface_default.xml')

# Load the pre-trained facial landmark model from dlib
predictor = dlib.shape_predictor('models/shape_predictor_68_face_landmarks.dat')

# Initialize dlib's face detector
detector = dlib.get_frontal_face_detector()

@app.route('/locate', methods=['POST'])
def locate():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in the request'}), 400
    
    # Load the image from FormData
    image = request.files['image']
    
    img = Image.open(image.stream)

    # Convert the Pillow image to a numpy array
    img = np.array(img)
    
    # If the image has an alpha channel, remove it (convert to RGB)
    if img.shape[-1] == 4:
        img = img[..., :3]

    # Convert the image from RGB to BGR (OpenCV uses BGR format)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = detector(gray)
        
    if len(faces) == 0:
        return jsonify({'error': 'No face detected'})
    
    if len(faces) > 1:
        return jsonify({'error': 'Multiple faces detected'})
    
    face = faces[0]
    
    # Get the landmarks/parts for the face
    landmarks = predictor(gray, face)
    
    # Extract eye landmarks (left eye: points 36-41, right eye: points 42-47)
    left_eye = []
    right_eye = []

    for i in range(36, 42):
        x = landmarks.part(i).x
        y = landmarks.part(i).y
        left_eye.append((x, y))
        cv2.circle(img, (x, y), 2, (112, 91, 14), -1)

    for i in range(42, 48):
        x = landmarks.part(i).x
        y = landmarks.part(i).y
        right_eye.append((x, y))
        cv2.circle(img, (x, y), 2, (112, 91, 14), -1)

    # Encode the image as JPEG
    _, buffer = cv2.imencode('.jpg', img)
    image_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        'image': image_base64,
        'landmarks': {
            'left_eye': left_eye,
            'right_eye': right_eye
        }
    })
    

if __name__ == "__main__":
    # Run the app on host 0.0.0.0, which makes it accessible externally
    app.run(host='0.0.0.0', port=5000)
