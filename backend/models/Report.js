import mongoose from "mongoose";


const reportSchema = new mongoose.Schema(
{
user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
    },
title: String,


fileUrl: String,


originalText: String,
parsedLabs: [
{
name: String,
value: String,
unit: String,
normalRange: String
}
],
summary: String,
aiInsights: {},
},
{ timestamps: true }
);


export default mongoose.model("Report", reportSchema);