import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./ReportDetails.css";

export default function ReportDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState("");

  const fetchReport = async () => {
    try {
      const res = await api.get(`/reports/${id}`);
      setReport(res.data);
    } catch (err) {
      console.error("Fetch report error:", err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  // ✔ FIXED — matches backend route: POST /api/reports/extract/:id
  const handleExtract = async () => {
    setStatus("Extracting text...");
    try {
      await api.post(`/reports/extract/${id}`);
      await fetchReport();
      setStatus("Text extraction complete");
    } catch (err) {
      console.error(err);
      setStatus("Extraction failed");
    }
  };

  // ✔ FIXED — matches backend route: POST /api/reports/analyze/:id
  const handleAnalyze = async () => {
    setStatus("Analyzing with AI...");
    try {
      await api.post(`/reports/analyze/${id}`);
      await fetchReport();
      setStatus("AI analysis complete");
    } catch (err) {
      console.error(err);
      setStatus("Analysis failed");
    }
  };

  if (!report) return <div className="card">Loading...</div>;

  return (
    <div className="report-isolation">
  <div className="report-page">
    <div className="report-card">
      <h2 className="report-title">{report.title}</h2>

      <a
        href={report.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="file-link"
      >
        Open original file
      </a>

      <section className="section">
        <h3 className="section-title">Extracted Text</h3>
        <pre className="text-box">
          {report.originalText || "No text extracted yet."}
        </pre>
      </section>

      <div className="action-row">
        <button className="btn-ghost" onClick={handleExtract}>
          Extract Text
        </button>
        <button className="btn-primary" onClick={handleAnalyze}>
          Analyze with AI
        </button>
      </div>

      {status && <div className="status">{status}</div>}

      <section className="section ai-section">
        <h3 className="section-title">AI Summary</h3>
        <div className="ai-summary">
          {report.summary || "No summary yet."}
        </div>
      </section>
    </div>
  </div>
  </div>
);

}
