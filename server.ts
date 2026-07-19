import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK safely
const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

// API endpoint to generate a blog article draft
app.post("/api/gemini/generate", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ 
        error: "Gemini API key is missing. Please add your GEMINI_API_KEY in the Secrets panel." 
      });
    }

    const { topic, category, tone, keywords } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `Write a comprehensive, professional, and engaging blog article about "${topic}".
Category: ${category || "General"}
Tone: ${tone || "professional, insightful"}
Keywords to include: ${keywords ? keywords.join(", ") : "none"}

Structure the article using clean Markdown. It should include:
1. An eye-catching, informative title.
2. An engaging introduction setting the stage.
3. 2-3 detailed, well-structured main sections with subheadings. Provide actionable insights, real-world relevance, and analytical depth. If the topic is Excel, provide formula examples. If it is Business Analytics/MBA, talk about strategic business implications.
4. A "Key Takeaways" bulleted summary.
5. A list of 2-3 realistic references or authoritative web sources for further reading (with placeholder URLs or high-quality domains like Microsoft Docs, Harvard Business Review, or reputable tech sites).

Ensure the writing is exceptionally clear, authoritative, and reads like an expert article. Return ONLY the markdown content. Do not wrap it in markdown code blocks like \`\`\`markdown or write extra introductory phrases. Start directly with the title.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const markdownText = response.text || "";
    res.json({ content: markdownText });
  } catch (error: any) {
    console.error("Gemini Generate Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate article" });
  }
});

// API endpoint to enhance or rewrite a current draft
app.post("/api/gemini/enhance", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ 
        error: "Gemini API key is missing. Please add your GEMINI_API_KEY in the Secrets panel." 
      });
    }

    const { currentContent, instructions } = req.body;
    if (!currentContent) {
      return res.status(400).json({ error: "Current content is required" });
    }

    const prompt = `You are an expert editor. Enhance and refine the following blog draft based on these instructions: "${instructions || "Improve clarity, tone, formatting, and overall engagement."}".

Draft Content:
---
${currentContent}
---

Maintain the existing core structure and references unless asked to modify them. Enhance the professional quality, vocabulary, readability, and structural flow.
Return ONLY the enhanced markdown content. Do not include any meta-commentary, introductory remarks, or wrap the response in markdown code blocks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    const markdownText = response.text || "";
    res.json({ content: markdownText });
  } catch (error: any) {
    console.error("Gemini Enhance Error:", error);
    res.status(500).json({ error: error.message || "Failed to enhance article" });
  }
});

async function startServer() {
  // Setup Vite Dev server middleware or static serve in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
