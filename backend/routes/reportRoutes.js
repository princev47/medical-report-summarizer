import express from "express";
import { uploadFileAndCreateReport } from "../controllers/reportcontroller.js";
import { protect } from "../middleware/authmiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFileAndCreateReport);

export default router;
