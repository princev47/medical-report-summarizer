import express from "express";
import { uploadFileAndCreateReport } from "../controllers/reportcontroller.js";
import { protect } from "../middleware/authmiddleware.js";
import { upload } from "../middleware/upload.js";
import { extractReportText } from "../controllers/reportcontroller.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFileAndCreateReport);
router.post("/extract/:id", protect, extractReportText);


export default router;
