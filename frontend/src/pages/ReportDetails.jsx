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
    <div className="card">
      <h2>{report.title}</h2>

      <div style={{ marginTop: 10 }}>
        <a href={report.fileUrl} target="_blank" rel="noreferrer">
          Open original file
        </a>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Extracted Text</h3>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#fbfdff",
            padding: 12,
            borderRadius: 6,
          }}
        >
          {report.originalText || "No text extracted yet."}
        </pre>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn-ghost" onClick={handleExtract}>
          Extract Text
        </button>
        <button className="btn" onClick={handleAnalyze}>
          Analyze with AI
        </button>
      </div>

      {status && <div style={{ marginTop: 12 }}>{status}</div>}

      <div style={{ marginTop: 16 }}>
        <h3>AI Summary</h3>
        <div style={{ background: "#fbfdff", padding: 12, borderRadius: 6 }}>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {report.summary || "No summary yet."}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>AI Insights (raw JSON)</h3>
        <pre
          style={{
            background: "#fbfdff",
            padding: 12,
            borderRadius: 6,
          }}
        >
          {JSON.stringify(report.aiInsights || {}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
