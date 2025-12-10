// OpenAI utility wrapper for fallback when Gemini hits rate limits

import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

const getOpenAIClient = (): OpenAI => {
    if (!openaiClient) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("OPENAI_API_KEY is missing from environment variables");
            throw new Error("OPENAI_API_KEY is not defined in environment variables");
        }
        openaiClient = new OpenAI({ apiKey });
    }
    return openaiClient;
};

export async function generateContentWithOpenAI(prompt: string): Promise<string> {
    try {
        const client = getOpenAIClient();
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini", // Fast and cost-effective model
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable and respectful scripture study companion for the Book of Mormon.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error("Empty response from OpenAI");
        }
        return response;
    } catch (error) {
        console.error("Error generating content with OpenAI:", error);
        throw error;
    }
}

export async function generateChatWithOpenAI(
    messages: Array<{ role: string; content: string }>,
    systemPrompt?: string
): Promise<string> {
    try {
        const client = getOpenAIClient();

        // Convert messages to OpenAI format
        const openAIMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

        // Add system prompt if provided
        if (systemPrompt) {
            openAIMessages.push({
                role: "system",
                content: systemPrompt,
            });
        }

        // Convert user/assistant messages
        for (const msg of messages) {
            if (msg.role === "user") {
                openAIMessages.push({
                    role: "user",
                    content: msg.content,
                });
            } else if (msg.role === "assistant" || msg.role === "model") {
                openAIMessages.push({
                    role: "assistant",
                    content: msg.content,
                });
            }
        }

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: openAIMessages as any,
            max_tokens: 1000,
            temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error("Empty response from OpenAI");
        }
        return response;
    } catch (error) {
        console.error("Error generating chat with OpenAI:", error);
        throw error;
    }
}

