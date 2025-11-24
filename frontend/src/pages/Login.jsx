import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card max-width-auth">
      <h2>Login</h2>
      {err && <div className="small-muted" style={{ color: "crimson" }}>{err}</div>}
      <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
        <div className="form-row">
          <input className="form-input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-row">
          <input className="form-input" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn">Login</button>
          <Link to="/register" className="btn-ghost" style={{ alignSelf:"center" }}>Register</Link>
        </div>
      </form>
    </div>
  );
}
