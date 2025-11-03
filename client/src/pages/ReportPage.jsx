import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth"; // Example hook for user auth
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function ReportPage() {
  const [usageData, setUsageData] = useState([]);
  const { user } = useAuth(); // get the currently logged-in user

  useEffect(() => {
    if (!user) return; // if no user is logged in, do nothing

    // Listen to "predictions" collection, filtered by userId
    const qPredictions = query(
      collection(db, "predictions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(qPredictions, (snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        // if doc has screen_time and date for the chart
        if (d.screen_time !== undefined && d.date) {
          arr.push({
            date: d.date, // x-axis
            screenTime: Number(d.screen_time) || 0, // y-axis
          });
        }
      });
      setUsageData(arr);
    });

    return () => unsub();
  }, [user]); // re-run if user changes

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Screen Time Over Time</h3>
      {usageData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div style={styles.chartBox}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="screenTime"
                stroke="#ff4b2b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "90%",
    maxWidth: "800px",
    margin: "0 auto",
    marginTop: "40px",
  },
  title: { marginBottom: "15px", textAlign: "center" },
  chartBox: {
    width: "100%",
    height: "300px",
    background: "#fafafa",
    borderRadius: "8px",
    padding: "10px",
  },
};
