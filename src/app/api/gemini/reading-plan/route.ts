import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";
import { BOOKS } from "@/lib/chapters";

export async function POST(request: NextRequest) {
    try {
        const { goal, chaptersPerDay, daysPerWeek, focus } = await request.json();

        if (!goal || !chaptersPerDay || !daysPerWeek) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const totalChapters = BOOKS.reduce((sum, book) => sum + book.chapters, 0);
        const booksData = BOOKS.map((b) => `${b.name} (${b.chapters} chapters)`).join(", ");

        const prompt = `Create a personalized Book of Mormon reading plan with the following parameters:

Goal: ${goal === "complete" ? "Complete the entire Book of Mormon" : goal === "topic" ? "Study by specific topics" : "Daily spiritual boost"}
Chapters per day: ${chaptersPerDay}
Days per week: ${daysPerWeek}
${focus ? `Personal focus: ${focus}` : ""}

Books in the Book of Mormon: ${booksData}
Total chapters: ${totalChapters}

Generate a reading plan in JSON format:
{
  "summary": "A brief encouraging summary of this plan",
  "plan": [
    {
      "day": 1,
      "chapters": ["1 Nephi 1-2"],
      "motivation": "A short motivational message for this day"
    },
    ...
  ]
}

Create a plan for the first ${Math.min(30, Math.ceil(totalChapters / chaptersPerDay))} days. Make it encouraging and personalized${focus ? ` with focus on ${focus}` : ""}.`;

        const response = await generateContent(prompt);

        // Parse the JSON response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const plan = JSON.parse(jsonMatch[0]);
            return NextResponse.json(plan);
        }

        // Fallback plan
        const fallbackPlan = [];
        let currentDay = 1;
        let currentChapter = 0;

        for (const book of BOOKS) {
            for (let ch = 1; ch <= book.chapters; ch += chaptersPerDay) {
                const endCh = Math.min(ch + chaptersPerDay - 1, book.chapters);
                const chapterRange = ch === endCh ? `${ch}` : `${ch}-${endCh}`;

                fallbackPlan.push({
                    day: currentDay,
                    chapters: [`${book.name} ${chapterRange}`],
                    motivation: "Keep up the great work!",
                });

                currentDay++;
                currentChapter += chaptersPerDay;

                if (currentDay > 30) break;
            }
            if (currentDay > 30) break;
        }

        return NextResponse.json({
            summary: `A ${daysPerWeek}-day per week plan to read ${chaptersPerDay} chapter(s) daily.`,
            plan: fallbackPlan.slice(0, 30),
        });
    } catch (error) {
        console.error("Error generating reading plan:", error);
        return NextResponse.json(
            { error: "Failed to generate reading plan" },
            { status: 500 }
        );
    }
}
