"use client";

import { useState } from "react";
import { AIInsight } from "@/lib/types";

interface AIInsightCardProps {
    book: string;
    chapter: number;
    entry: string;
}

export default function AIInsightCard({ book, chapter, entry }: AIInsightCardProps) {
    const [insight, setInsight] = useState<AIInsight | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const generateInsight = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/gemini/insights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book, chapter, entry }),
            });

            if (!response.ok) throw new Error("Failed to generate insights");

            const data = await response.json();
            setInsight(data);
            setIsExpanded(true);
        } catch (err) {
            setError("Failed to generate insights. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!insight && !loading) {
        return (
            <button
                onClick={generateInsight}
                className="mt-3 px-4 py-2 rounded-lg font-medium text-white
                   bg-gradient-to-r from-blue-500 to-purple-500
                   hover:from-blue-600 hover:to-purple-600
                   transition-all duration-200 shadow-md hover:shadow-lg
                   flex items-center gap-2"
            >
                <span>✨</span>
                Get AI Insights
            </button>
        );
    }

    if (loading) {
        return (
            <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-slate-700">Generating insights...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-3 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <p className="text-sm text-red-600">{error}</p>
                <button
                    onClick={generateInsight}
                    className="mt-2 text-sm text-red-700 underline hover:text-red-800"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!insight) return null;

    return (
        <div className="mt-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    <span className="font-semibold text-slate-800">AI Insights</span>
                </div>
                <span className="text-slate-600">{isExpanded ? "▼" : "▶"}</span>
            </button>

            {isExpanded && (
                <div className="p-4 pt-0 space-y-4 animate-fadeIn">
                    {/* Themes */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Themes</h4>
                        <div className="flex flex-wrap gap-2">
                            {insight.themes.map((theme, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white rounded-full text-xs font-medium text-blue-600 border border-blue-200"
                                >
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Insight */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Insight</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{insight.insight}</p>
                    </div>

                    {/* Question */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Reflection Question</h4>
                        <p className="text-sm text-slate-600 italic">{insight.question}</p>
                    </div>

                    {/* Application */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Application</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{insight.application}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
