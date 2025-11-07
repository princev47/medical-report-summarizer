import Report from "../models/Report.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadFileAndCreateReport = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "medical_reports",
      resource_type: "auto", // allows PDF, image, etc.
    });

    // Clean up local file
    fs.unlinkSync(req.file.path);

    // Create report in MongoDB
    const report = await Report.create({
      user: req.user._id,
      title,
      fileUrl: result.secure_url,
    });

    res.status(201).json(report);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};


  //text extraction
import { extractTextFromFile } from "../services/ocrService.js";

//import fs from "fs";
import axios from "axios";
import path from "path";
//import Report from "../models/reportModel.js";


// Controller to extract text from a report file
export const extractReportText = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Create temp folder if not exists
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Detect file extension from the Cloudinary URL
    const ext = path.extname(new URL(report.fileUrl).pathname) || ".pdf"; // default .pdf if unknown
    const tempFilePath = path.join(tempDir, `${Date.now()}-report${ext}`);

    // Download file from Cloudinary
    const response = await axios.get(report.fileUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(tempFilePath, response.data);

    console.log(`✅ File downloaded to: ${tempFilePath}`);

    // Extract text using OCR/PDF parser
    const extractedText = await extractTextFromFile(tempFilePath);

    // Delete temp file
    fs.unlinkSync(tempFilePath);
    console.log("🧹 Temporary file deleted");

    // Update MongoDB
    report.originalText = extractedText;
    await report.save();

    res.status(200).json({
      message: "Text extraction completed successfully",
      reportId: report._id,
      extractedText,
    });
  } catch (error) {
    console.error("Error in extractReportText:", error.message);
    res.status(500).json({ message: "Failed to extract report text", error: error.message });
  }
};

