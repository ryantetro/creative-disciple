"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ReflectionPromptBannerProps {
    book: string;
    chapter: number;
    onDismiss: () => void;
}

export default function ReflectionPromptBanner({
    book,
    chapter,
    onDismiss,
}: ReflectionPromptBannerProps) {
    const [prompt, setPrompt] = useState<string>("");
    const [focusAreas, setFocusAreas] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrompt = async () => {
            try {
                const response = await fetch("/api/gemini/prompts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ book, chapter }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setPrompt(data.prompt);
                    setFocusAreas(data.focusAreas || []);
                }
            } catch (error) {
                console.error("Error fetching prompt:", error);
                setPrompt(`Reflect on the teachings in ${book} ${chapter}. What principle stands out to you?`);
            } finally {
                setLoading(false);
            }
        };

        fetchPrompt();
    }, [book, chapter]);

    if (loading) {
        return (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-slate-700">Generating reflection prompt...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-xl border-2 border-blue-300 shadow-md animate-fadeIn">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AI Reflection Prompt
                    </h3>
                </div>
                <button
                    onClick={onDismiss}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    ✕
                </button>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">{prompt}</p>

            {focusAreas.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {focusAreas.map((area, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-white rounded-full text-xs font-medium text-purple-600 border border-purple-200"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-3">
                <Link
                    href="/journal"
                    className="px-4 py-2 rounded-lg font-medium text-white
                     bg-gradient-to-r from-blue-500 to-purple-500
                     hover:from-blue-600 hover:to-purple-600
                     transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Write Reflection
                </Link>
                <button
                    onClick={onDismiss}
                    className="px-4 py-2 rounded-lg font-medium text-slate-600
                     bg-white border-2 border-slate-200
                     hover:border-slate-300 hover:bg-slate-50
                     transition-all duration-200"
                >
                    Maybe Later
                </button>
            </div>
        </div>
    );
}
