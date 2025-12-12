import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;  // ✅ Correct for Vite

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/login`, {
        email,
        password,
      });

      console.log("Login response:", res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user name if available
      if (res.data.user && res.data.user.name) {
        localStorage.setItem("userName", res.data.user.name);
        window.dispatchEvent(new Event("userLoggedIn"));
      }

      alert(res.data.message);
      navigate("/attendance");

    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    backgroundColor: "#f5f5f5",
    padding: 0,
    margin: 0,
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "20px",
  },
  title: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#2c3e50",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  registerText: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#7f8c8d",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "500",
  },
};
