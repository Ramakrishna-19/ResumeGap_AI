const axios = require("axios");
const puppeteer = require("puppeteer");

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    console.log("OPENROUTER:", process.env.OPENROUTER_API_KEY ? "Loaded ✅" : "Missing ❌");

    const prompt = `
You are an expert technical interviewer.

Analyze the candidate and generate a HIGH-QUALITY interview report.

⚠️ STRICT RULES:
- Output ONLY valid JSON
- matchScore MUST be INTEGER (0–100)
- Generate:
  - At least 10 technical questions
  - At least 6 behavioral questions
- If candidate is weak → generate MORE questions
- If strong → fewer but advanced questions

-------------------------

Resume:
${resume || "Not provided"}

Self Description:
${selfDescription || "Not provided"}

Job Description:
${jobDescription}

-------------------------

Return JSON:

{
  "title": "string",
  "matchScore": number,

  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "clear structured answer"
    }
  ],

  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "STAR method answer guidance"
    }
  ],

  "skillGaps": [
    {
      "skill": "string",
      "severity": "low | medium | high"
    }
  ],

  "preparationPlan": [
    {
      "day": number,
      "focus": "string",
      "tasks": ["task1", "task2"]
    }
  ]
}
`;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openai/gpt-3.5-turbo",
            messages: [
                { role: "user", content: prompt }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const text = response.data.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, "").trim();

    try {
        const result = JSON.parse(cleaned);

        // ✅ Fix matchScore
        if (result.matchScore <= 1) {
            result.matchScore = Math.round(result.matchScore * 100);
        } else {
            result.matchScore = Math.round(result.matchScore);
        }

        // ✅ Ensure arrays exist
        result.technicalQuestions = result.technicalQuestions || [];
        result.behavioralQuestions = result.behavioralQuestions || [];

        // ✅ FORCE minimum technical questions (10)
        while (result.technicalQuestions.length < 10) {
            result.technicalQuestions.push({
                question: "Explain a core concept from your domain.",
                intention: "To evaluate technical understanding",
                answer: "Explain clearly with examples and real-world use cases"
            });
        }

        // ✅ FORCE minimum behavioral questions (6)
        while (result.behavioralQuestions.length < 6) {
            result.behavioralQuestions.push({
                question: "Describe a challenging situation you handled.",
                intention: "To evaluate communication and problem-solving",
                answer: "Use STAR method"
            });
        }

        return result;

    } catch (err) {
        console.log("JSON ERROR:", cleaned);
        throw new Error("Invalid AI response");
    }
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are a professional resume writer.

Generate a HIGH-QUALITY ATS-friendly resume in clean HTML format.

⚠️ STRICT RULES:
- Output ONLY JSON
- JSON must contain ONLY "html"
- HTML must be COMPLETE (<!DOCTYPE html>, html, head, body)
- Use inline CSS only
- Clean and professional design

-------------------------

Resume:
${resume || "Not provided"}

Self Description:
${selfDescription || "Not provided"}

Job Description:
${jobDescription}

-------------------------

REQUIREMENTS:
- Sections:
  Name, Summary, Skills, Projects, Experience, Education
- Bullet points
- Job-focused content
- 1–2 page structure

-------------------------

Return JSON:
{
  "html": "<!DOCTYPE html>...complete HTML resume..."
}
`;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openai/gpt-3.5-turbo",
            messages: [
                { role: "user", content: prompt }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const text = response.data.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, "").trim();

    let htmlContent = "";

    try {
        const jsonContent = JSON.parse(cleaned);
        htmlContent = jsonContent.html;
    } catch (err) {
        console.log("RESUME JSON ERROR:", cleaned);
        throw new Error("Invalid resume AI response");
    }

    if (!htmlContent || !htmlContent.includes("<html")) {
        throw new Error("Invalid HTML content generated");
    }

    return await generatePdfFromHtml(htmlContent);
}

module.exports = { generateInterviewReport, generateResumePdf };