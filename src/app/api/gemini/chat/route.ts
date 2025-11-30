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
        console.error("Error in chat:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
