import warnings
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

warnings.filterwarnings('ignore', category=UserWarning)
warnings.filterwarnings('ignore', message="A module that was compiled using NumPy 1.x cannot be run in NumPy 2.0.0")

class URLClassifier:
    def __init__(self):
        model_directory = "model"
        self.tokenizer = AutoTokenizer.from_pretrained(model_directory)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_directory)

    def classify_url(self, user_input):
        inputs = self.tokenizer(user_input, return_tensors="pt")

        # Ensure the input tensors are on the correct device (GPU if available)
        inputs = {key: tensor.to(self.model.device) for key, tensor in inputs.items()}

        # Perform inference
        with torch.no_grad():
            outputs = self.model(**inputs)

        # Get predicted probabilities
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)

        # Get predicted label (assuming a binary classification)
        predicted_label = probs.argmax().item()
        
        return predicted_label

# Example usage
if __name__ == '__main__':
    model_directory = "model"  # replace with your actual model directory
    classifier = URLClassifier()
    user_input = "example input string"  # replace with your actual input string
    result = classifier.classify_url(user_input)
    print(result)
    