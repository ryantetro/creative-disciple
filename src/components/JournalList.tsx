"use client";

import { JournalEntry } from "@/lib/types";
import AIInsightCard from "./AIInsightCard";

interface JournalListProps {
    entries: JournalEntry[];
}

export default function JournalList({ entries }: JournalListProps) {
    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-xl p-12 shadow-md text-center">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No entries yet</h3>
                <p className="text-slate-600">Start journaling about your scripture study above!</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Reflections</h2>
            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-400 
                     hover:shadow-lg transition-shadow duration-200"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                                {entry.book} {entry.chapter}
                            </h3>
                            <p className="text-sm text-slate-500">{formatDate(entry.createdAt)}</p>
                        </div>
                        <div className="text-2xl">✨</div>
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{entry.entry}</p>

                    {/* AI Insights */}
                    <AIInsightCard book={entry.book} chapter={entry.chapter} entry={entry.entry} />
                </div>
            ))}
        </div>
    );
}

