// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Attendance from "./components/Attendance";
import Leave from "./components/Leave";
import AdminLeave from "./components/AdminLeave";
import "./App.css";

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('userLoggedIn', handleAuthChange);
    window.addEventListener('userLoggedOut', handleAuthChange);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleAuthChange);
      window.removeEventListener('userLoggedOut', handleAuthChange);
    };
  }, []);

  return (
    <div className="app">
      {isAuthenticated && <Navbar />}
      <div 
        className="content" 
        style={{ 
          paddingTop: isAuthenticated ? "70px" : "0",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa"
        }}
      >
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/attendance" replace />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register /> : <Navigate to="/attendance" replace />} 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Navigate to="/attendance" replace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leave" 
            element={
              <ProtectedRoute>
                <Leave />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/AdminLeave" 
            element={
              <ProtectedRoute>
                <AdminLeave />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="*" 
            element={
              isAuthenticated ? 
                <Navigate to="/attendance" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;