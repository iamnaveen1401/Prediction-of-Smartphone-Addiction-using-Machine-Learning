import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function PredictPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [uploadHover, setUploadHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const { user } = useAuth();

  const handlePredict = () => {
    if (!user) {
      alert("You must be logged in to make a prediction.");
      return;
    }
    if (!file) {
      alert("Please upload your usage CSV first!");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const lines = e.target.result.split("\n").map((line) => line.trim());
      if (lines.length < 2 || !lines[1]) {
        alert("CSV file invalid or empty! Need at least 2 lines.");
        return;
      }
      const secondLine = lines[1].split(",").map((val) => val.trim());
      const screen_time = Number(secondLine[0] || 0);
      const unlocks = Number(secondLine[1] || 0);
      const social_usage = Number(secondLine[2] || 0);
      const night_usage = Number(secondLine[3] || 0);
      const gaming_usage = Number(secondLine[4] || 0);
      setIsLoading(true);
      setProgress(0);
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          setProgress(100);
        }
      }, 50);
      setTimeout(async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              screen_time,
              unlocks,
              social_usage,
              night_usage,
              gaming_usage,
            }),
          });
          const data = await response.json();
          const finalPrediction = {
            screen_time: screen_time ?? 0,
            unlocks: unlocks ?? 0,
            social_usage: social_usage ?? 0,
            night_usage: night_usage ?? 0,
            gaming_usage: gaming_usage ?? 0,
            level: data.prediction ?? "Low",
            tips: data.tips ?? "Maintain healthy usage!",
          };
          setPrediction(finalPrediction);
          const cleanData = Object.fromEntries(
            Object.entries(finalPrediction).map(([k, v]) => [k, v ?? null])
          );
          await addDoc(collection(db, "predictions"), {
            ...cleanData,
            userId: user.uid,
            date: new Date().toLocaleString(),
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          alert("Server error: " + err.message);
        } finally {
          setIsLoading(false);
        }
      }, 2500);
    };
    reader.readAsText(file);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>MOBILE ADDICTION PREDICTION</h1>
      <p style={styles.subTitle}>Upload your CSV file.</p>
      <div style={styles.uploadWrapper}>
        <label
          style={{
            ...styles.uploadCircle,
            ...(uploadHover ? styles.uploadCircleHover : {}),
          }}
          onMouseEnter={() => setUploadHover(true)}
          onMouseLeave={() => setUploadHover(false)}
        >
          <MdCloudUpload style={styles.uploadIcon} />
          <input
            type="file"
            accept=".csv"
            style={styles.hiddenInput}
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
        </label>
        <p style={styles.fileLabel}>{file ? file.name : "No file chosen"}</p>
      </div>
      <button
        style={{
          ...styles.predictButton,
          ...(buttonHover ? styles.predictButtonHover : {}),
        }}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        onClick={handlePredict}
      >
        Predict
      </button>
      {prediction && (
        <div style={styles.resultBox}>
          <h3>Results from ML:</h3>
          <p>Screen Time: {prediction.screen_time}</p>
          <p>Unlocks: {prediction.unlocks}</p>
          <p>Social Usage: {prediction.social_usage}</p>
          <p>Night Usage: {prediction.night_usage}</p>
          <p>Gaming Usage: {prediction.gaming_usage}</p>
          <h4>Addiction Level: {prediction.level}</h4>
          <p>Recommendation: {prediction.tips}</p>
        </div>
      )}
      {isLoading && (
        <div style={styles.overlay}>
          <div style={styles.loaderBox}>
            <p style={styles.loaderText}>Predicting...</p>
            <p style={styles.loaderPercent}>{progress}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    padding: "30px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  },
  mainTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    color: "#37474f",
  },
  subTitle: {
    fontSize: "16px",
    color: "#607d8b",
    marginTop: "10px",
    marginBottom: "30px",
  },
  uploadWrapper: {
    marginBottom: "20px",
  },
  uploadCircle: {
    display: "inline-block",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
    transition: "transform 0.3s",
  },
  uploadCircleHover: {
    transform: "scale(0.95)",
  },
  uploadIcon: {
    fontSize: "40px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  fileLabel: {
    marginTop: "10px",
    color: "#444",
  },
  predictButton: {
    fontSize: "18px",
    backgroundColor: "#000",
    color: "#fff",
    padding: "14px 28px",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
    transition: "transform 0.3s",
  },
  predictButtonHover: {
    transform: "scale(0.95)",
  },
  resultBox: {
    marginTop: "30px",
    textAlign: "left",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "15px",
    border: "1px solid #ddd",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  loaderBox: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "12px",
    textAlign: "center",
  },
  loaderText: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  loaderPercent: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};
