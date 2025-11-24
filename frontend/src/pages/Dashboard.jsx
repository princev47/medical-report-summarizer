import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ReportCard from "../components/ReportCard";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard(){
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetch = async () => {
      try{
        const res = await api.get("/reports");
        setReports(res.data);
      }catch(err){
        console.error(err);
      }finally{ setLoading(false); }
    };
    fetch();
  }, []);

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
        <h1>My Reports</h1>
        <Link to="/upload" className="btn">Upload new</Link>
      </div>

      {loading && <div className="card">Loading reports...</div>}
      {!loading && reports.length === 0 && <div className="card">No reports yet. Upload one to get started.</div>}

      <div style={{ marginTop:12 }}>
        {reports.map(r => <ReportCard key={r._id} report={r} />)}
      </div>
    </div>
  );
}
