
# Phishy: Phishing Detection Browser Extension

Phishy is a browser extension designed to detect phishing links and malicious messages in real-time. By leveraging deep learning models, specifically BERT, Phishy enables users to navigate the web more safely by alerting them to potential security risks in links and messages. This extension offers seamless integration with web browsers, providing a user-friendly interface for enhanced online security.

## Features
- **Real-Time Detection**: Scans URLs and messages to detect potential phishing content.
- **Deep Learning Integration**: Utilizes a pretrained BERT model, fine-tuned for phishing detection.
- **User-Friendly Alerts**: Informs users of any identified phishing risks through clear, non-intrusive notifications.
- **Lightweight and Fast**: Optimized for performance to ensure a smooth browsing experience.

## Technology Stack
- **Backend**: Flask
- **Frontend**: HTML, CSS, JavaScript
- **Machine Learning Model**: BERT, trained and fine-tuned for phishing link and message classification
- 
### STEP 01-To clone the repository, paste the below link in your terminal

```bash
git clone https://github.com/Rahulagowda004/Phishy_the_phishing_detector_extension.git
```

### STEP 02- Create a virtual environment after opening the repository

```bash
python -m venv .venv
```

```bash
.venv\Scripts\activate
```

### STEP 03- install the requirements

```bash
pip install -r requirements.txt
```

### STEP 04- download the model from the below link, then extract and save it the cloned repository in your local file

```bash
https://drive.google.com/drive/folders/1RGChD9E93uEWdS_Ys0xX4LtSMdpZD0V9?usp=sharing
```

### STEP 04- Finally run the following command

```bash
python app.py
```


## Usage
1. Open your browser and enable the Phishy extension.
2. Navigate to any website or click on any URL.
3. Phishy will automatically scan for phishing indicators and alert you if any threats are detected.

## Project Structure
- **extension/**: Contains frontend files for the browser extension.
- **backend/**: Flask server for handling phishing detection.
- **model/**: BERT model files and related scripts for phishing detection.
- **requirements.txt**: Lists Python dependencies for the backend.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
