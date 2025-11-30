import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

export async function POST(request: NextRequest) {
    try {
        const { book, chapter } = await request.json();

        if (!book || !chapter) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const prompt = `Generate a thoughtful reflection prompt for ${book} chapter ${chapter} from the Book of Mormon.

The prompt should:
- Be personal and thought-provoking
- Focus on application and spiritual growth
- Be 2-3 sentences long
- Encourage deep reflection

Provide the response in JSON format:
{
  "prompt": "Your reflection prompt here",
  "focusAreas": ["area1", "area2", "area3"]
}`;

        const response = await generateContent(prompt);

        // Parse the JSON response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const promptData = JSON.parse(jsonMatch[0]);
            return NextResponse.json(promptData);
        }

        // Fallback
        return NextResponse.json({
            prompt: `Reflect on the teachings in ${book} ${chapter}. What principle stands out to you, and how can you apply it in your life today?`,
            focusAreas: ["Personal Application", "Spiritual Growth", "Faith"],
        });
    } catch (error) {
        console.error("Error generating prompt:", error);
        return NextResponse.json(
            { error: "Failed to generate prompt" },
            { status: 500 }
        );
    }
}
