import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
  const spinnerKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  `;
  
 
  const SpinnerStyles = () => <style>{spinnerKeyframes}</style>;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
      toast.success("Signup Successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <ToastContainer />
      {/* Keyframes for spinner */}
      <SpinnerStyles />

      <div style={styles.authBox}>
        <h2 style={styles.title}>Create an Account</h2>
        <p style={styles.subtitle}>Join us and start your journey</p>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              // Spinner
              <div style={styles.spinner} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  authContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background:
      "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/assets/bg-image.jpg') center/cover no-repeat",
    backdropFilter: "blur(10px)",
  },
  authBox: {
    width: "400px",
    padding: "40px",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    color: "white",
    transition: "0.5s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    opacity: "0.8",
  },
  input: {
    width: "70%",
    padding: "12px",
    margin: "10px 0",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    color: "white",
    fontSize: "16px",
    textAlign: "center",
    transition: "0.3s",
    boxShadow: "inset 2px 2px 10px rgba(255, 255, 255, 0.2)",
  },
  button: {
    width: "50%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #ff7b54, #ff4b2b)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(255, 122, 85, 0.3)",
  },
  linkText: {
    marginTop: "10px",
    fontSize: "14px",
    opacity: "0.8",
  },
  link: {
    color: "#ffcccb",
    textDecoration: "none",
    fontWeight: "bold",
  },
  spinner: {
    display: "inline-block",
    width: "18px",
    height: "18px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
};
