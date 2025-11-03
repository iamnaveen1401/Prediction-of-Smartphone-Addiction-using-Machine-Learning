import React, { useState } from "react";

export default function FileUpload({ onPredictComplete }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handlePredict = () => {
    if (!file) {
      alert("Please choose a CSV file first!");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const lines = e.target.result.split("\n");
      // Suppose row 1 => "300,80,120"
      if (lines[1]) {
        const [screen_time, unlocks, social_usage] = lines[1].split(",").map(Number);
        // Call your ML backend, e.g. /predict
        try {
          const res = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ screen_time, unlocks, social_usage })
          });
          const data = await res.json();
          onPredictComplete(data); // e.g. { prediction, recommendation }
        } catch (err) {
          console.error(err);
          alert("Prediction error: " + err);
        }
      } else {
        alert("CSV invalid or empty!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={styles.row}>
      <label style={styles.label}>
        Choose File
        <input
          type="file"
          accept=".csv"
          style={styles.hiddenInput}
          onChange={handleFileChange}
        />
      </label>
      <button style={styles.button} onClick={handlePredict}>Predict</button>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  label: {
    backgroundColor: "#eee",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    position: "relative",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};
