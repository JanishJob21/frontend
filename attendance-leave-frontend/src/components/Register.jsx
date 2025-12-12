import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;  // ✅ Use VITE variable

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API}/api/register`, {
        name,
        email,
        password,
        role,
      });

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
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
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "1rem",
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  loginText: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#7f8c8d",
  },
  link: {
    color: "#3498db",
    fontWeight: "500",
    textDecoration: "none",
  },
};
