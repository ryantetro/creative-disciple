// Gemini AI utility wrapper (primary, with OpenAI fallback)

import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateContentWithOpenAI, generateChatWithOpenAI } from "./openai";

let genAI: GoogleGenerativeAI | null = null;

const getGenAI = (): GoogleGenerativeAI => {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing from environment variables");
            throw new Error("GEMINI_API_KEY is not defined in environment variables");
        }
        genAI = new GoogleGenerativeAI(apiKey);
    }
    return genAI;
};

export const getGeminiModel = () => {
    // Using gemini-2.5-flash-lite which has better rate limits:
    // - 10 RPM (vs 5 for gemini-2.5-flash)
    // - 20 RPD (daily limit)
    // - 250K TPM (tokens per minute)
    // Note: gemini-2.5-flash-live is for Live API (different endpoint) and doesn't work with generateContent
    return getGenAI().getGenerativeModel({ model: "gemini-2.5-flash-lite" });
};

// Retry helper with exponential backoff
async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000
): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const isRateLimit = errorMessage.includes("429") || 
                              errorMessage.includes("rate limit") ||
                              errorMessage.includes("quota");
            
            if (isRateLimit && attempt < maxRetries - 1) {
                const delay = initialDelay * Math.pow(2, attempt);
                console.log(`Rate limit hit, retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error;
        }
    }
    throw new Error("Max retries exceeded");
}

export async function generateContent(prompt: string): Promise<string> {
    return retryWithBackoff(async () => {
        try {
            const model = getGeminiModel();
            const result = await model.generateContent(prompt);
            const response = result.response;
            return response.text();
        } catch (error: unknown) {
            console.error("Error generating content with Gemini:", error);
            
            // Check if it's a rate limit or quota error
            const errorMessage = error instanceof Error ? error.message : String(error);
            const errorStatus = (error as { status?: number })?.status;
            const isRateLimit = errorMessage.includes("429") || 
                              errorMessage.includes("rate limit") ||
                              errorMessage.includes("quota") ||
                              errorStatus === 429;
            
            // Fallback to OpenAI if rate limited
            if (isRateLimit && process.env.OPENAI_API_KEY) {
                console.log("Gemini rate limited, falling back to OpenAI...");
                try {
                    return await generateContentWithOpenAI(prompt);
                } catch (openaiError) {
                    console.error("OpenAI fallback also failed:", openaiError);
                    throw error; // Throw original Gemini error
                }
            }
            
            throw error;
        }
    });
}

export async function generateChat(
    messages: Array<{ role: string; content: string }>,
    systemPrompt?: string
): Promise<string> {
    return retryWithBackoff(async () => {
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
            if (!lastMessage || !lastMessage.content) {
                throw new Error("Last message is missing or empty");
            }

            const result = await chat.sendMessage(lastMessage.content);
            const responseText = result.response.text();
            
            if (!responseText) {
                throw new Error("Empty response from AI model");
            }
            
            return responseText;
        } catch (error: unknown) {
            console.error("Error in generateChat with Gemini:", error);
            
            // Check if it's a rate limit or quota error
            const errorMessage = error instanceof Error ? error.message : String(error);
            const errorStatus = (error as { status?: number })?.status;
            const isRateLimit = errorMessage.includes("429") || 
                              errorMessage.includes("rate limit") ||
                              errorMessage.includes("quota") ||
                              errorStatus === 429;
            
            // Fallback to OpenAI if rate limited
            if (isRateLimit && process.env.OPENAI_API_KEY) {
                console.log("Gemini rate limited, falling back to OpenAI...");
                try {
                    return await generateChatWithOpenAI(messages, systemPrompt);
                } catch (openaiError) {
                    console.error("OpenAI fallback also failed:", openaiError);
                    throw error; // Throw original Gemini error
                }
            }
            
            // Re-throw with more context if it's already an Error
            if (error instanceof Error) {
                // Preserve original error message for better debugging
                throw error;
            }
            
            throw new Error("Failed to generate chat response");
        }
    });
}
