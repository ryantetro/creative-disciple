import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

export async function POST(request: NextRequest) {
    try {
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
        return NextResponse.json(
            { error: "Failed to generate insights" },
            { status: 500 }
        );
    }
}
