"use client";

import { useState } from "react";
import { BOOKS } from "@/lib/chapters";
import { JournalEntry } from "@/lib/types";
import { load, save } from "@/lib/storage";

interface JournalFormProps {
    onEntryAdded: () => void;
}

export default function JournalForm({ onEntryAdded }: JournalFormProps) {
    const [book, setBook] = useState(BOOKS[0].name);
    const [chapter, setChapter] = useState(1);
    const [entry, setEntry] = useState("");

    const selectedBook = BOOKS.find((b) => b.name === book);
    const maxChapters = selectedBook?.chapters || 1;

    const handleBookChange = (newBook: string) => {
        setBook(newBook);
        setChapter(1); // Reset to chapter 1 when book changes
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!entry.trim()) return;

        const entries = load<JournalEntry[]>("journalEntries", []);
        const newEntry: JournalEntry = {
            id: crypto.randomUUID(),
            book,
            chapter,
            entry: entry.trim(),
            createdAt: new Date().toISOString(),
        };

        entries.unshift(newEntry); // Add to beginning
        save("journalEntries", entries);

        // Reset form
        setEntry("");
        onEntryAdded();
    };

    // Generate chapter numbers array
    const chapters = Array.from({ length: maxChapters }, (_, i) => i + 1);

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">What touched you today?</h2>

            {/* Book Selector */}
            <div className="mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Select Book</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {BOOKS.map((b) => {
                        const isSelected = b.name === book;
                        return (
                            <button
                                key={b.name}
                                type="button"
                                onClick={() => handleBookChange(b.name)}
                                className={`
                  relative p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 min-h-[60px] sm:min-h-[70px]
                  flex flex-col items-center justify-center gap-1
                  hover:scale-105 hover:shadow-md active:scale-95
                  ${isSelected
                                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-sm"
                                        : "border-slate-200 bg-white hover:border-blue-300"
                                    }
                `}
                            >
                                <div className="font-semibold text-slate-800 text-xs leading-tight text-center">
                                    {b.name}
                                </div>
                                <div
                                    className={`text-xs ${isSelected ? "text-blue-600" : "text-slate-500"}`}
                                >
                                    {b.chapters}
                                </div>
                                {isSelected && (
                                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chapter Selector */}
            <div className="mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                    Select Chapter from {book}
                </h3>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-lg">
                    {chapters.map((ch) => {
                        const isSelected = ch === chapter;
                        return (
                            <button
                                key={ch}
                                type="button"
                                onClick={() => setChapter(ch)}
                                className={`
                  aspect-square rounded-lg font-semibold text-xs sm:text-sm min-h-[44px]
                  transition-all duration-200 transform hover:scale-110 active:scale-95
                  ${isSelected
                                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md"
                                        : "bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-sm"
                                    }
                `}
                            >
                                {ch}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Entry Textarea */}
            <div className="mb-4">
                <label htmlFor="journal-entry" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                    Your Reflection on {book} {chapter}
                </label>
                <textarea
                    id="journal-entry"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    rows={6}
                    placeholder="Write about what stood out to you, what you learned, or how it applies to your life..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-slate-200 bg-white text-sm sm:text-base text-slate-800 
                     focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
                     resize-none"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!entry.trim()}
                className="w-full py-3 sm:py-3 rounded-lg font-semibold text-sm sm:text-base text-white
                   bg-gradient-to-r from-blue-500 to-purple-500
                   hover:from-blue-600 hover:to-purple-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px]"
            >
                Save Entry
            </button>
        </form>
    );
}

