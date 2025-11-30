// Gemini AI utility wrapper

import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

const getGenAI = (): GoogleGenerativeAI => {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined in environment variables");
        }
        genAI = new GoogleGenerativeAI(apiKey);
    }
    return genAI;
};

export const getGeminiModel = () => {
    return getGenAI().getGenerativeModel({ model: "gemini-2.0-flash" });
};

export async function generateContent(prompt: string): Promise<string> {
    try {
        const model = getGeminiModel();
        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate AI response");
    }
}

export async function generateChat(
    messages: Array<{ role: string; content: string }>,
    systemPrompt?: string
): Promise<string> {
    try {
        const model = getGeminiModel();

        // Build conversation history
        const history = messages.slice(0, -1).map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        return result.response.text();
    } catch (error) {
        console.error("Error in chat:", error);
        throw new Error("Failed to generate chat response");
    }
}
