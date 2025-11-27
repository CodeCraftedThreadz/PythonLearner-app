import { GoogleGenAI } from "@google/genai";
import { ExecutionResult } from '../types';

let ai: GoogleGenAI | null = null;

try {
  // Initialize ONLY if the key is available
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("Gemini API Key is missing. AI features will be simulated or disabled.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

export const executePythonCode = async (code: string): Promise<ExecutionResult> => {
  if (!ai) {
    return {
      output: "Error: API Key not configured. Cannot execute code via AI backend.",
      error: true
    };
  }

  try {
    const prompt = `
      You are a Python 3 interpreter. 
      I will provide you with a snippet of Python code.
      Your task is to execute it mentally and provide the Standard Output (stdout).
      
      Rules:
      1. If the code runs successfully, return ONLY the output.
      2. If there is a syntax error or runtime error, return the error message as a Python interpreter would.
      3. Do not provide explanations unless the code explicitly prints them.
      4. Be concise.

      Code:
      ${code}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return {
      output: response.text ? response.text.trim() : "",
      error: false
    };

  } catch (error) {
    console.error("Gemini execution error:", error);
    return {
      output: "System Error: Failed to connect to AI runtime.",
      error: true
    };
  }
};

export const getAiExplanation = async (concept: string, contextCode: string): Promise<string> => {
  if (!ai) return "AI service unavailable.";

  try {
    const prompt = `
      You are a friendly and expert Python tutor.
      The student is asking about: "${concept}".
      
      Here is the code they are currently looking at:
      \`\`\`python
      ${contextCode}
      \`\`\`

      Provide a short, clear, 1-paragraph explanation suitable for a beginner. 
      Use simple analogies if possible.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't generate an explanation at this time.";
  } catch (error) {
    return "Error retrieving AI explanation.";
  }
};
