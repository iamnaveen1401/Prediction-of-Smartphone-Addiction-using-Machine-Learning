import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { logout } from "../services/authService";

/** Example sub-pages */
import PredictPage from "./PredictPage";
import ReportPage from "./ReportPage";
import HistoryPage from "./HistoryPage";

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Track which link is hovered
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  // Helper to combine base link styles + hover effect if hoveredLink === label
  const linkStyle = (label) => ({
    ...styles.link,
    ...(hoveredLink === label ? styles.linkHover : {}),
  });

  return (
    <div style={styles.container}>
      {/* FIXED SIDEBAR */}
      <aside style={styles.sidebar}>
        <nav style={styles.nav}>
          {/* Predict Link */}
          <Link
            to="/dashboard/predict"
            style={linkStyle("predict")}
            onMouseEnter={() => setHoveredLink("predict")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Predict
          </Link>

          {/* Report Link */}
          <Link
            to="/dashboard/report"
            style={linkStyle("report")}
            onMouseEnter={() => setHoveredLink("report")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Report
          </Link>

          {/* History Link */}
          <Link
            to="/dashboard/history"
            style={linkStyle("history")}
            onMouseEnter={() => setHoveredLink("history")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            History
          </Link>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div style={styles.mainArea}>
        {/* HEADER */}
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Welcome to Mobile Addiction Predictor</h1>
          <p style={styles.headerUser}>Hello, {user?.email}!</p>
        </header>

        {/* CONTENT WRAPPER */}
        <div style={styles.contentWrapper}>
          <Routes>
            <Route path="predict" element={<PredictPage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="history" element={<HistoryPage />} />
            {/* Default sub-route */}
            <Route index element={<PredictPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const styles = {
  /* Container just wraps everything */
  container: {
    // No special layout needed; mainArea is offset by sidebar
  },

  /* FIXED SIDEBAR */
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "220px",
    height: "100vh",
    backgroundColor: "#232938", // Dark background
    color: "#fff",
    padding: "20px",
    // optionally add boxShadow or borderRight if you like:
    // boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "60px", // space if you want for a brand area
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
  linkHover: {
    backgroundColor: "#2F3646",
  },
  logoutBtn: {
    marginTop: "30px",
    backgroundColor: "#ff4b2b",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  /* MAIN AREA */
  mainArea: {
    marginLeft: "270px", // leave space for the fixed sidebar
    display: "flex",
    flexDirection: "column",
    height: "100vh",      // fill viewport
    overflowY: "auto",    // allow vertical scroll in main area only
  },

  /* HEADER */
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    color: "#fff",
    padding: "15px 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    flexShrink: 0, // ensure header doesn't shrink
  },
  headerTitle: {
    margin: 0,
    fontSize: "22px",
  },
  headerUser: {
    margin: 0,
    fontSize: "14px",
    opacity: 0.9,
  },

  /* CONTENT WRAPPER - the actual scrollable content area */
  contentWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
};
