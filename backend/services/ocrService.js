import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";
import path from "path";

export const extractTextFromFile = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    let extractedText = "";

    if (ext === ".pdf") {
      //  PDF extraction
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } else if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      //  OCR extraction for images
      const result = await Tesseract.recognize(filePath, "eng");
      extractedText = result.data.text;
    } else {
      throw new Error("Unsupported file type for text extraction");
    }

    return extractedText.trim();
  } catch (error) {
    console.error(" Error extracting text:", error.message);
    throw error;
  }
};
