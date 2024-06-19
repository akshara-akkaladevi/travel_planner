import { StreamingTextResponse, GoogleGenerativeAIStream, Message } from "ai";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const messages: Message[] = reqBody.messages;

  // Build the multi-turn chat prompt
  const promptWithParts = buildGoogleGenAIPrompt(messages);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });

  console.log("MODELNAME: gemini-pro");
  console.log("PROMPT WITH PARTS: ");
  console.log(promptWithParts);

  const streamingResponse = await model.generateContentStream(promptWithParts);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}

function buildGoogleGenAIPrompt(messages: Message[]) {
  return {
    contents: messages
      .filter((message) => message.role === "user" || message.role === "assistant")
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
  };
}

export default POST;
