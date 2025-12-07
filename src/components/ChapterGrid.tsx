"use client";

import { CompletedChapters } from "@/lib/types";
import { isChapterCompleted } from "@/lib/chapters";

interface ChapterGridProps {
    book: string;
    totalChapters: number;
    completed: CompletedChapters;
    onToggleChapter: (chapter: number) => void;
}

export default function ChapterGrid({
    book,
    totalChapters,
    completed,
    onToggleChapter,
}: ChapterGridProps) {
    const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

    return (
        <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{book}</h2>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-2">
                {chapters.map((chapter) => {
                    const isCompleted = isChapterCompleted(completed, book, chapter);
                    return (
                        <button
                            key={chapter}
                            onClick={() => onToggleChapter(chapter)}
                            className={`
                aspect-square rounded-lg font-semibold text-xs sm:text-sm min-h-[44px]
                transition-all duration-200 transform hover:scale-105 active:scale-95
                ${isCompleted
                                    ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                                    : "bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-md"
                                }
              `}
                        >
                            {chapter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
