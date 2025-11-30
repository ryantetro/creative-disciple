"use client";

import { useState } from "react";
import { DailyReading } from "@/lib/types";

interface ReadingPlanDisplayProps {
    summary: string;
    plan: DailyReading[];
}

export default function ReadingPlanDisplay({ summary, plan }: ReadingPlanDisplayProps) {
    const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

    const toggleDay = (day: number) => {
        setCompletedDays((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(day)) {
                newSet.delete(day);
            } else {
                newSet.add(day);
            }
            return newSet;
        });
    };

    const completedCount = completedDays.size;
    const totalDays = plan.length;
    const progress = Math.round((completedCount / totalDays) * 100);

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Reading Plan</h2>

            {/* Summary */}
            <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <p className="text-slate-700 leading-relaxed">{summary}</p>
            </div>

            {/* Progress */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">Progress</span>
                    <span className="text-sm font-bold text-blue-600">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                    {completedCount} of {totalDays} days completed
                </p>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {plan.map((day) => {
                    const isCompleted = completedDays.has(day.day);
                    return (
                        <div
                            key={day.day}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${isCompleted
                                    ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-300"
                                    : "bg-white border-slate-200 hover:border-blue-300"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={() => toggleDay(day.day)}
                                    className="mt-1 w-5 h-5 text-blue-600 rounded cursor-pointer"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-slate-800">Day {day.day}</span>
                                        {isCompleted && <span className="text-green-600">✓</span>}
                                    </div>
                                    <div className="text-sm text-blue-600 font-medium mb-2">
                                        {day.chapters.join(", ")}
                                    </div>
                                    <p className="text-sm text-slate-600 italic">{day.motivation}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
