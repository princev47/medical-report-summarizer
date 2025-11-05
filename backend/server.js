import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import reportRoutes from "./routes/reportRoutes.js";
dotenv.config();
await connectDB();


const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));


app.get("/", (req, res) => res.json({ status: "ok", project: "medical-report-summarizer-backend" }));
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));