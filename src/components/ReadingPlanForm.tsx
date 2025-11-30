"use client";

import { useState } from "react";

interface ReadingPlanFormProps {
    onPlanGenerated: (plan: any) => void;
}

export default function ReadingPlanForm({ onPlanGenerated }: ReadingPlanFormProps) {
    const [goal, setGoal] = useState("complete");
    const [chaptersPerDay, setChaptersPerDay] = useState(2);
    const [daysPerWeek, setDaysPerWeek] = useState(5);
    const [focus, setFocus] = useState("");
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/gemini/reading-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    goal,
                    chaptersPerDay,
                    daysPerWeek,
                    focus: focus.trim() || undefined,
                }),
            });

            if (!response.ok) throw new Error("Failed to generate plan");

            const data = await response.json();
            onPlanGenerated(data);
        } catch (error) {
            console.error("Error generating plan:", error);
            alert("Failed to generate reading plan. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Create Your Reading Plan</h2>

            {/* Goal Type */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Goal Type</h3>
                <div className="space-y-2">
                    {[
                        { value: "complete", label: "Finish the Book of Mormon" },
                        { value: "topic", label: "Study by topic (Faith, Repentance, Christ)" },
                        { value: "daily", label: "Daily spiritual boost" },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name="goal"
                                value={option.value}
                                checked={goal === option.value}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-slate-700">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Schedule */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-slate-600 mb-2">
                            Chapters per day: {chaptersPerDay}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={chaptersPerDay}
                            onChange={(e) => setChaptersPerDay(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 mb-2">
                            Days per week: {daysPerWeek}
                        </label>
                        <input
                            type="range"
                            min="3"
                            max="7"
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Life Focus */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Life Focus (optional)
                </label>
                <input
                    type="text"
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    placeholder="e.g., Staying positive, Building faith, Finding peace"
                    className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-800
                     focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
            </div>

            {/* Generate Button */}
            <button
                onClick={generatePlan}
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white
                   bg-gradient-to-r from-blue-500 to-purple-500
                   hover:from-blue-600 hover:to-purple-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-md hover:shadow-lg"
            >
                {loading ? "Generating Plan..." : "Generate Plan"}
            </button>
        </div>
    );
}
