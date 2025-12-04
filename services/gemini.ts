import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizQuestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key is present
export const hasApiKey = () => !!apiKey;

export const generateTopicContent = async (topicTitle: string, category: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your Google Gemini API Key.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a comprehensive, engaging, and educational explanation for the scientific topic: "${topicTitle}" (Category: ${category}).
      
      Structure the response in Markdown with the following sections:
      1. **Introduction**: A brief hook and simple definition.
      2. **Key Concepts**: Detailed explanation of the core principles.
      3. **Real-World Examples**: 2-3 examples of how this applies to daily life.
      4. **Did You Know?**: A fun or surprising fact.
      
      Keep the tone encouraging and suitable for a general audience or student. Use emojis where appropriate to make it visually appealing.`,
      config: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini Content Generation Error:", error);
    return "An error occurred while fetching the lesson content. Please try again later.";
  }
};

export const generateQuiz = async (topicTitle: string): Promise<QuizQuestion[]> => {
  if (!apiKey) throw new Error("API Key missing");

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        options: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          minItems: 4,
          maxItems: 4
        },
        correctAnswerIndex: { type: Type.INTEGER },
        explanation: { type: Type.STRING }
      },
      required: ["question", "options", "correctAnswerIndex", "explanation"],
      propertyOrdering: ["question", "options", "correctAnswerIndex", "explanation"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 multiple-choice quiz questions about "${topicTitle}". 
      Ensure the questions test understanding of concepts, not just trivia.
      The output must be a valid JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.5,
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return [];
  }
};

export const solveDoubt = async (question: string, context?: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a friendly and knowledgeable science tutor. 
      A student asks: "${question}".
      ${context ? `Context: The student is currently studying "${context}".` : ''}
      
      Answer clearly, concisely, and encouragingly. Use an analogy if possible to explain complex terms.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "I couldn't generate an answer at this moment.";
  } catch (error) {
    console.error("Gemini Doubt Error:", error);
    return "Sorry, I ran into an issue trying to answer that. Please try again.";
  }
};
