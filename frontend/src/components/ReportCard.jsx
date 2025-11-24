import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReportCard.css";

export default function ReportCard({ report }) {
  const navigate = useNavigate();
  return (
    <div className="report-card card">
      <div className="report-card-left">
        <div className="report-title">{report.title}</div>
        <div className="small-muted">Uploaded: {new Date(report.createdAt).toLocaleString()}</div>
      </div>
      <div>
        <button className="btn-ghost" onClick={() => navigate(`/report/${report._id}`)}>View</button>
      </div>
    </div>
  );
}
