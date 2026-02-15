
import { GoogleGenAI } from "@google/genai";

export const geminiService = {
  generateProjectCopy: async (title: string, location: string): Promise<string> => {
    try {
      // Initialize GoogleGenAI with the mandatory environment variable.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a 3-sentence ultra-luxurious real estate description for a project called "${title}" located in "${location}". Focus on exclusivity, timeless elegance, and premium lifestyle.`,
        config: {
          temperature: 0.8,
        }
      });
      // Directly access the .text property as per the latest SDK standards.
      return response.text || "Elevate your lifestyle to new heights of sophistication and grace.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "A sanctuary of unparalleled luxury designed for the most discerning residents.";
    }
  }
};
