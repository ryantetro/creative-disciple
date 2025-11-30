"use client";

import { useState, useMemo } from "react";
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

    // Group days into weeks (grouping by rest days or every 5-7 days)
    const weeks = useMemo(() => {
        const weeksArray: DailyReading[][] = [];
        let currentWeek: DailyReading[] = [];

        plan.forEach((day, index) => {
            const isRestDay = day.motivation.toLowerCase().includes("rest") || 
                            day.chapters.length === 0;
            
            currentWeek.push(day);
            
            // Start a new week if:
            // 1. We hit a rest day and have at least 3 days in current week
            // 2. We have 5-7 days in current week
            // 3. This is the last day
            const shouldStartNewWeek = 
                (isRestDay && currentWeek.length >= 3) ||
                (currentWeek.length >= 5 && !isRestDay) ||
                (index === plan.length - 1);
            
            if (shouldStartNewWeek) {
                weeksArray.push([...currentWeek]);
                currentWeek = [];
            }
        });

        return weeksArray;
    }, [plan]);

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F2937]">
                    Your Personalized Reading Plan
                </h2>
            </div>

            {/* Summary */}
            <div className="mb-8 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <p className="text-[#1F2937] leading-relaxed">{summary}</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#1F2937]">Progress</span>
                    <span className="text-sm font-bold text-[#5E72E4]">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs text-[#6B7280] mt-2">
                    {completedCount} of {totalDays} days completed
                </p>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-6">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">
                            Week {weekIndex + 1}
                        </h3>
                        <div className="space-y-3">
                            {week.map((day) => {
                                const isCompleted = completedDays.has(day.day);
                                const isRestDay = day.motivation.toLowerCase().includes("rest") || 
                                                day.chapters.length === 0;
                                
                                return (
                                    <div
                                        key={day.day}
                                        className={`p-4 rounded-lg border transition-all duration-200 ${
                                            isCompleted
                                                ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-300"
                                                : isRestDay
                                                ? "bg-slate-100 border-slate-300"
                                                : "bg-white border-slate-200 hover:border-[#5E72E4]"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {!isRestDay && (
                                                <input
                                                    type="checkbox"
                                                    checked={isCompleted}
                                                    onChange={() => toggleDay(day.day)}
                                                    className="mt-1 w-5 h-5 text-[#5E72E4] rounded cursor-pointer
                                                     focus:ring-2 focus:ring-[#5E72E4] focus:ring-offset-2"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-base font-semibold text-[#1F2937]">
                                                        Day {day.day}
                                                    </span>
                                                    {isCompleted && (
                                                        <span className="text-green-600 font-bold">✓</span>
                                                    )}
                                                </div>
                                                {!isRestDay && day.chapters.length > 0 && (
                                                    <div className="text-sm text-[#5E72E4] font-medium mb-2">
                                                        {day.chapters.join(", ")}
                                                    </div>
                                                )}
                                                <p className={`text-sm ${
                                                    isRestDay 
                                                        ? "text-[#6B7280] font-medium" 
                                                        : "text-[#6B7280] italic"
                                                }`}>
                                                    {day.motivation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
