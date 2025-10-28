import express from "express";
import { uploadFileAndCreateReport } from "../controllers/reportcontroller.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/upload-file", protect, upload.single("file"), uploadFileAndCreateReport);

export default router;
