import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth"; // Example hook for user auth

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const { user } = useAuth(); // get the currently logged-in user

  useEffect(() => {
    if (!user) return; // if no user is logged in, do nothing

    // Real-time listener filtered by userId
    const qHistory = query(
      collection(db, "predictions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(qHistory, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setHistory(items);
    });

    return () => unsub();
  }, [user]); // re-run if user changes

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Prediction History</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Level</th>
              <th style={styles.th}>Tips</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.level}</td>
                <td>{row.tips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  },
  title: {
    marginBottom: "15px",
    textAlign: "center",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "500px",
  },
  th: {
    backgroundColor: "#f5f5f5",
    textAlign: "left",
    padding: "8px",
    borderBottom: "2px solid #ddd",
  },
};
