import express from "express";
import { 
  uploadFileAndCreateReport,
  extractReportText,
  getFinalReport
} from "../controllers/reportcontroller.js";
import { analyzeReport } from "../controllers/aiConnect.js";
import { protect } from "../middleware/authmiddleware.js";
import { upload } from "../middleware/upload.js";
import Report from "../models/Report.js";

const router = express.Router();

// Upload file
router.post("/upload", protect, upload.single("file"), uploadFileAndCreateReport);

// Extract text from file
router.post("/extract/:id", protect, extractReportText);

// Run AI analysis
router.post("/analyze/:id", protect, analyzeReport);

// ✔ NEW — Get all reports
router.get("/", protect, async (req, res) => {
  const reports = await Report.find({ user: req.user._id });
  res.json(reports);
});

// ✔ NEW — Get basic report details by ID
router.get("/:id", protect, async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(report);
});

// Get final analyzed report
router.get("/:id/final", protect, getFinalReport);

export default router;
