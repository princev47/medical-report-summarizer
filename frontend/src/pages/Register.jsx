import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try{
      await api.post("/auth/register", form);
      navigate("/");
    }catch(error){
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card max-width-auth">
      <h2>Create account</h2>
      {err && <div className="small-muted" style={{ color: "crimson" }}>{err}</div>}
      <form onSubmit={handleSubmit} style={{ marginTop:12 }}>
        <div className="form-row">
          <input name="name" className="form-input" placeholder="Full name" value={form.name} onChange={handleChange}/>
        </div>
        <div className="form-row">
          <input name="email" className="form-input" placeholder="Email" value={form.email} onChange={handleChange}/>
        </div>
        <div className="form-row">
          <input name="password" className="form-input" placeholder="Password" type="password" value={form.password} onChange={handleChange}/>
        </div>
        <button className="btn">Register</button>
      </form>
    </div>
  );
}
