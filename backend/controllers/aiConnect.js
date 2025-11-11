import axios from "axios";
import Report from "../models/Report.js";
import dotenv from "dotenv";
  dotenv.config();

const LLM_SERVER_URL = process.env.LLM_SERVER_URL;

export const analyzeReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (!report.originalText)
      return res.status(400).json({ message: "No extracted text found" });

    const response = await axios.post('http://127.0.0.1:8000/analyze',{
      report_text: report.originalText,
    });

    // Save structured AI response
    report.summary = response.data.summary;
    report.aiInsights = response.data;
    await report.save();

    res.status(200).json({
      message: "AI analysis completed successfully",
      aiInsights: report.aiInsights,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error.message);
    res.status(500).json({
      message: "AI analysis failed",
      error: error.response?.data || error.message,
    });
  }
};
