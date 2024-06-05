import { Pinecone } from "@pinecone-database/pinecone";
const apikey = process.env.NEXT_PUBLIC_PINECONE_API_KEY;
if (!apikey) {
throw Error("PINECONE_API_KEY is not set");
}
const pinecone = new Pinecone({
    apiKey: apikey,
});

export const notesIndex = pinecone.Index("nextjs-ai-note-app");