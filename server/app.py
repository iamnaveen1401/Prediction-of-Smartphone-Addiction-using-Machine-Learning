from flask import Flask, request, jsonify
import pickle
import os
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Globally enable CORS

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    """
    Expects JSON like:
      {
        "screen_time": <int>,
        "unlocks": <int>,
        "social_usage": <int>,
        "night_usage": <int>,
        "gaming_usage": <int>
      }
    Returns JSON:
      {
        "status": "success",
        "prediction": "Low" / "Moderate" / "High",
        "tips": "...",
        "data": {
          "screen_time": ...,
          "unlocks": ...,
          "social_usage": ...,
          "night_usage": ...,
          "gaming_usage": ...
        }
      }
    """
    try:
        # Parse JSON from request
        data = request.get_json(force=True)

        # DEBUG: Print the raw JSON data received
        print("===== DEBUG: Received JSON data:", data)

        # Extract features (default 0 if missing)
        screen_time = int(data.get("screen_time", 0) or 0)
        unlocks = int(data.get("unlocks", 0) or 0)
        social_usage = int(data.get("social_usage", 0) or 0)
        night_usage = int(data.get("night_usage", 0) or 0)
        gaming_usage = int(data.get("gaming_usage", 0) or 0)

        # Create DataFrame for model
        X_input = pd.DataFrame(
            [[screen_time, unlocks, social_usage, night_usage, gaming_usage]],
            columns=["screen_time", "unlocks", "social_usage", "night_usage", "gaming_usage"]
        )

        # DEBUG: Show the features we’re passing to the model
        print("===== DEBUG: X_input for model:\n", X_input)

        # Predict numeric label (0=Low,1=Moderate,2=High)
        pred_label = model.predict(X_input)[0]

        # DEBUG: Show the raw numeric label returned by the model
        print("===== DEBUG: pred_label from model:", pred_label)

        # Map numeric label to string
        label_map = {0: "Low", 1: "Moderate", 2: "High"}
        prediction_str = label_map.get(pred_label, "Low")  # default "Low" if something unexpected

        # Smart recommendations
        tips = "Maintain healthy usage!"
        if prediction_str == "Moderate":
            tips = "Try limiting social or gaming usage!"
        elif prediction_str == "High":
            tips = "High addiction detected—consider a digital detox!"

        # Construct JSON response
        response_data = {
            "status": "success",
            "prediction": prediction_str,
            "tips": tips,
            "data": {
                "screen_time": screen_time,
                "unlocks": unlocks,
                "social_usage": social_usage,
                "night_usage": night_usage,
                "gaming_usage": gaming_usage,
            }
        }

        # DEBUG: Final response data
        print("===== DEBUG: Final response data:", response_data)

        # Return JSON, plus CORS headers
        response = jsonify(response_data)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200

    except Exception as e:
        print("===== ERROR in /predict:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
