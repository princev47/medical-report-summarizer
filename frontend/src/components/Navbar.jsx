import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/ai.jpeg";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="nav-wrap">
      <div className="nav-container">
        <div className="brand" onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="logo" className="brand-logo" />
          <div className="brand-text">
            <div className="brand-title">Medical Report Analyzer</div>
            <small className="small-muted">AI-assisted summaries</small>
          </div>
        </div>

        <nav className="nav-actions">
          {user ? (
            <>
              <button className="btn-ghost" onClick={() => navigate("/upload")}>Upload</button>
              <button className="btn-ghost" onClick={() => navigate("/dashboard")}>My Reports</button>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-ghost">Register</Link>
              <Link to="/" className="btn">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}