import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

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

        const { book, chapter, entry } = await request.json();

        if (!book || !chapter || !entry) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const prompt = `You are a thoughtful scripture study companion. Analyze this journal entry about ${book} chapter ${chapter} from the Book of Mormon.

Journal Entry:
"${entry}"

Provide a response in the following JSON format:
{
  "themes": ["theme1", "theme2", "theme3"],
  "insight": "A thoughtful insight about what this person is learning",
  "question": "A reflection question to deepen their understanding",
  "application": "A practical way to apply this principle"
}

Focus on being encouraging, respectful, and spiritually uplifting. Keep responses concise and meaningful.`;

        const response = await generateContent(prompt);

        // Parse the JSON response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const insight = JSON.parse(jsonMatch[0]);
            return NextResponse.json(insight);
        }

        // Fallback if JSON parsing fails
        return NextResponse.json({
            themes: ["Faith", "Personal Growth"],
            insight: response,
            question: "How can you apply this principle in your life today?",
            application: "Take time to reflect on what you've learned.",
        });
    } catch (error) {
        console.error("Error generating insights:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        if (errorMessage.includes("GEMINI_API_KEY") || errorMessage.includes("API key")) {
            return NextResponse.json(
                { error: "AI service configuration error. Please contact support." },
                { status: 503 }
            );
        }
        
        if (errorMessage.includes("quota") || errorMessage.includes("rate limit") || errorMessage.includes("429")) {
            return NextResponse.json(
                { error: "AI service is temporarily unavailable. Please try again later." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate insights. Please try again." },
            { status: 500 }
        );
    }
}
