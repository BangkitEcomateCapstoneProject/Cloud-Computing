import tensorflow as tf
from tensorflow import keras
from flask import Flask, request, jsonify
from keras.models import load_model
from keras.utils import img_to_array, load_img
import numpy as np
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

model_url = 'https://storage.googleapis.com/model-ecomate-bucket/machine-learning-model/wasteclassifierv2.h5'

model_path = tf.keras.utils.get_file("wasteclassifierv2.h5", model_url)

if model_path is None:
    raise ValueError("model not found")

model = load_model(model_path)

class_labels = ['biological', 'cardboard', 'glass', 'metal', 'paper', 'plastic']

def resize_img(img):
    img = img.resize((150,150))
    x = img_to_array(img)
    x = x / 255.0
    x = np.expand_dims(x, axis=0)
    return x

@app.route('/predict', methods=['POST']) 
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error' : 'No selected file'}), 400
    try:
        img = load_img(io.BytesIO(file.read()), target_size=(150,150))
        x = resize_img(img)
        preds = model.predict(x)
        predicted_class_index = np.argmax(preds)
        predicted_label = class_labels[predicted_class_index]
        predicted_probability = preds[0][predicted_class_index]
        response = {
            'prediction' : predicted_label,
            'probability': float(predicted_probability)
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
