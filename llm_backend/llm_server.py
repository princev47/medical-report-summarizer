from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv  # ✅ new import

# Load .env file (make sure you created one in the same folder)
load_dotenv()

groq_key = os.getenv("GROQ_API_KEY")
if not groq_key:
    raise ValueError("❌ GROQ_API_KEY not found. Add it to your .env file or set it in your environment.")

# ✅ Now safely set it for Groq usage
os.environ["GROQ_API_KEY"] = groq_key

import datetime

app = Flask(__name__)
CORS(app)
app.secret_key = 'super_secret_medical_key_456'


# Initialize your medical summarization model (adapt model_name as needed)
llm = ChatGroq(model_name='llama-3.3-70b-versatile')  # Or your specific medical model

# Medical summarizer prompt template
medical_summary_prompt = """
You are an expert medical assistant AI. Your job is to read medical reports and provide a clear, simple summary for a layperson.
Please do the following:
- Summarize the main findings of the report.
- Clearly list any possible diagnoses mentioned.
- Suggest important precautions the patient should take.
- Mention typical medicines related to the diagnosis, if present.
- Add a friendly but firm disclaimer to always consult a doctor for treatment.

Medical Report:
{report_text}

Summary:
"""

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    report_text = data.get('report_text', '')

    if not report_text.strip():
        return jsonify({'error': 'Medical report text is required.'}), 400

    # Build the prompt with the medical report text
    prompt = medical_summary_prompt.format(report_text=report_text)

    # Call the LLM to get the summarization
    response = response =  llm.invoke(prompt)



    # Return the summary
    return jsonify({
        'summary': response.content.strip(),
        'disclaimer': 'This is an AI-generated summary. Please consult a healthcare professional for medical advice and diagnosis.'
    })


if __name__ == '__main__':
    app.run(debug=True)
