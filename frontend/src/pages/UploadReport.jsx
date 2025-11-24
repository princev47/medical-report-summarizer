import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./UploadReport.css";

export default function UploadReport(){
  const [title,setTitle] = useState("");
  const [file,setFile] = useState(null);
  const [msg,setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if(!file) return setMsg("Please select a file");

    try{
      const fd = new FormData();
      fd.append("title", title || "Report");
      fd.append("file", file);

      const res = await api.post("/reports/upload", fd, {
       headers: {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
      });

      setMsg("Uploaded successfully");
      // navigate to details page
      navigate(`/report/${res.data._id}`);
    }catch(err){
      setMsg(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="card max-width-auth">
      <h2>Upload Report</h2>
      <form onSubmit={handleSubmit} style={{ marginTop:12 }}>
        <div className="form-row">
          <input className="form-input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn">Upload</button>
          <button type="button" className="btn-ghost" onClick={()=>navigate("/dashboard")}>Cancel</button>
        </div>
        {msg && <div style={{ marginTop:10 }} className="small-muted">{msg}</div>}
      </form>
    </div>
  );
}
