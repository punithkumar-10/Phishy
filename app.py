import warnings
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from urllib.parse import urlparse, parse_qs, urlunparse
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import json
import os

from pipeline import URLClassifier  # Assuming URLClassifier is defined in pipeline.py

warnings.filterwarnings('ignore', category=UserWarning)
warnings.filterwarnings('ignore', message="A module that was compiled using NumPy 1.x cannot be run in NumPy 2.0.0")

app = Flask(__name__)
CORS(app)

# Disable Flask's default logging
log = logging.getLogger('werkzeug')
log.disabled = True

classifier = URLClassifier()

def clean_url(input_url):
    # Parse the URL
    parsed_url = urlparse(input_url)
    # Extract scheme, netloc (domain), and path
    scheme = parsed_url.scheme
    netloc = parsed_url.netloc
    path = parsed_url.path
    # Extract and clean query parameters
    if parsed_url.query:
        query_params = parse_qs(parsed_url.query)
        if 'q' in query_params:
            query = f"q={query_params['q'][0]}"
        else:
            query = ""
    else:
        query = ""
    # Reconstruct the cleaned URL
    cleaned_url = urlunparse((scheme, netloc, path, '', query, ''))
    return cleaned_url

def append_to_json(file_path, data):
    try:
        with open(file_path, 'r') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(data)

    with open(file_path, 'w') as f:
        json.dump(existing_data, f, indent=2)

phishy_count = 0
non_phishy_count = 0

@app.route('/url', methods=['POST'])
def receive_url():
    global phishy_count, non_phishy_count  # Declare them as global variables
    data = request.get_json()
    url = data.get('url')
    cleaned_url = clean_url(url)
    print("Cleaned URL:", cleaned_url)
    with open(r'cache.txt', 'r') as cache_file:
        cached_urls = cache_file.read().splitlines()
    if cleaned_url in cached_urls:
        label_url = 0
    else:
        label_url = classifier.classify_url(cleaned_url)
    result_url = "site is secure" if label_url == 0 else "site is not secure"
    append_to_json("artifacts/data.json", {
        "text": cleaned_url,
        "label": label_url
    })
    if result_url == "site is secure":
        non_phishy_count += 1
    elif result_url == "site is not secure":
        phishy_count += 1
    print("SITE:", result_url)
    return jsonify(result_url=result_url, url=cleaned_url, phishy_count=phishy_count, non_phishy_count=non_phishy_count), 200

@app.route('/user_input', methods=['POST'])
def receive_user_input():
    data = request.get_json()
    user_input = data.get('user_input')
    print("User Input:", user_input)
    label_input = classifier.classify_url(user_input)
    result_input = "input is secure" if label_input == 0 else "input is not secure"
    append_to_json("artifacts/data.json", {
        "input": user_input,
        "label": label_input,
        "result": result_input
    })
    print("Input:", result_input)
    return jsonify(result_input=result_input), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
