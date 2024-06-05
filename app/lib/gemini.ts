// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;

export async function getEmbedding(prompt: string, image: { inlineData: { data: string; mimeType: string; } }) {
    const model = "gemini-1.5-flash-latest"; // Updated model
    const taskType = "GENERATION_IMAGE";

    const response = await genAI.generateContent([
        prompt,
        image
    ]);

    const embedding = response.data?.embedding;

    if (!embedding) throw new Error("Error generating embedding");

    console.log(embedding);
    return embedding;
}
