import { NextRequest, NextResponse } from "next/server";
import { generateChat } from "@/lib/gemini";

const SYSTEM_PROMPT = `You are a knowledgeable and respectful scripture study companion for the Book of Mormon. 

Your role is to:
- Help users understand scripture passages with historical context and insights
- Provide thoughtful cross-references to related verses
- Encourage personal application and spiritual growth
- Be respectful, encouraging, and spiritually uplifting
- Keep responses concise (2-3 paragraphs maximum)

Focus on helping users deepen their understanding and apply principles in their lives.`;

export async function POST(request: NextRequest) {
    try {
        // Check if at least one API key is configured
        if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
            console.error("Neither GEMINI_API_KEY nor OPENAI_API_KEY is configured");
            return NextResponse.json(
                { error: "AI service is not configured. Please contact support." },
                { status: 503 }
            );
        }

        const { messages, context } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        // Add system context if provided
        let conversationMessages = [...messages];
        if (context?.book && context?.chapter) {
            conversationMessages = [
                {
                    role: "user",
                    content: `Context: I'm currently studying ${context.book} chapter ${context.chapter}.`,
                },
                {
                    role: "assistant",
                    content: `Great! I'm here to help you understand ${context.book} ${context.chapter}. What would you like to know?`,
                },
                ...messages,
            ];
        }

        const response = await generateChat(conversationMessages, SYSTEM_PROMPT);

        return NextResponse.json({ response });
    } catch (error) {
        console.error("Error in chat API:", error);
        
        // Provide more specific error messages
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        // Check if it's an API key error
        if (errorMessage.includes("GEMINI_API_KEY") || errorMessage.includes("API key")) {
            return NextResponse.json(
                { error: "AI service configuration error. Please contact support." },
                { status: 503 }
            );
        }
        
        // Check if it's a rate limit or quota error
        if (errorMessage.includes("quota") || errorMessage.includes("rate limit") || errorMessage.includes("429")) {
            return NextResponse.json(
                { error: "AI service is temporarily unavailable. Please try again later." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate response. Please try again." },
            { status: 500 }
        );
    }
}
