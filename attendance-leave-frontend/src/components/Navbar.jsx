// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const updateUserName = () => {
    const name = localStorage.getItem('userName');
    setUserName(name || '');
  };

  useEffect(() => {
    updateUserName();
    window.addEventListener('userLoggedIn', updateUserName);
    window.addEventListener('storage', updateUserName);
    return () => {
      window.removeEventListener('userLoggedIn', updateUserName);
      window.removeEventListener('storage', updateUserName);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName('');
    window.dispatchEvent(new Event('userLoggedOut'));
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#333",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/attendance"
          style={{ 
            color: "white", 
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}
        >
          Leave Management
        </Link>
        <div style={{ display: "flex", gap: "15px", marginLeft: "20px" }}>
          <Link
            to="/attendance"
            style={{ 
              color: "white", 
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              transition: "background 0.3s"
            }}
            className="nav-link"
          >
            Attendance
          </Link>
          <Link
            to="/leave"
            style={{ 
              color: "white", 
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              transition: "background 0.3s"
            }}
            className="nav-link"
          >
            Leave
          </Link>
          <Link
            to="/AdminLeave"
            style={{ 
              color: "white", 
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              transition: "background 0.3s"
            }}
            className="nav-link"
          >
            Admin
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {userName && (
          <span style={{ color: "white", fontWeight: "500" }}>
            Welcome, {userName}
          </span>
        )}
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 15px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            cursor: "pointer",
            backgroundColor: "#f8f9fa",
            transition: "all 0.3s",
            fontWeight: "500"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#e9ecef";
            e.target.style.borderColor = "#adb5bd";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#f8f9fa";
            e.target.style.borderColor = "#ddd";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}