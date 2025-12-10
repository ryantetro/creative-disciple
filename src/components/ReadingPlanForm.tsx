"use client";

import { useState } from "react";
import { canMakeRequest, recordRequest, getRemainingRequests } from "@/lib/rateLimit";

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

        // Check rate limit before making request
        const rateCheck = canMakeRequest();
        
        if (!rateCheck.allowed) {
            const remaining = getRemainingRequests();
            alert(rateCheck.reason || `Please wait before generating another plan. ${remaining} requests remaining today.`);
            setLoading(false);
            return;
        }

        try {
            recordRequest();
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

            if (!response.ok) {
                if (response.status === 429) {
                    alert("Rate limit reached. Please wait a moment and try again.");
                } else {
                    throw new Error("Failed to generate plan");
                }
                return;
            }

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
        <div className="space-y-4 sm:space-y-6">
            {/* Section 1: Choose Your Goal */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200">
                <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-3 sm:mb-4">
                    1. Choose Your Goal
                </h2>
                <div className="space-y-3">
                    {[
                        { value: "complete", label: "Finish the Book of Mormon" },
                        { value: "topic", label: "Study by Topic (Faith, Repentance, Hope, Christ, etc.)" },
                        { value: "daily", label: "Daily Spiritual Growth (short daily insights)" },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="goal"
                                value={option.value}
                                checked={goal === option.value}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-4 h-4 text-[#5E72E4] focus:ring-2 focus:ring-[#5E72E4] focus:ring-offset-2"
                            />
                            <span className="text-[#1F2937] group-hover:text-[#5E72E4] transition-colors">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Section 2: Set Your Schedule */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200">
                <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-3 sm:mb-4">
                    2. Set Your Schedule
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#6B7280] mb-2">
                            Chapters per day
                        </label>
                        <select
                            value={chaptersPerDay}
                            onChange={(e) => setChaptersPerDay(parseInt(e.target.value))}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 pr-10 rounded-lg border-2 border-slate-200 bg-white text-sm sm:text-base text-[#1F2937] min-h-[44px]
                             focus:outline-none focus:border-[#5E72E4] focus:ring-2 focus:ring-[#5E72E4]/20
                             transition-all duration-200 appearance-none cursor-pointer
                             bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7280%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 bg-size-[20px]"
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#6B7280] mb-2">
                            Days per week
                        </label>
                        <select
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 pr-10 rounded-lg border-2 border-slate-200 bg-white text-sm sm:text-base text-[#1F2937] min-h-[44px]
                             focus:outline-none focus:border-[#5E72E4] focus:ring-2 focus:ring-[#5E72E4]/20
                             transition-all duration-200 appearance-none cursor-pointer
                             bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7280%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 bg-size-[20px]"
                        >
                            {[3, 4, 5, 6, 7].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 3: Life Focus */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200">
                <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-3 sm:mb-4">
                    3. What Are You Focusing On Right Now? <span className="text-[#6B7280] font-normal">(Optional)</span>
                </h2>
                <input
                    type="text"
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    placeholder="Add focus or leave blank…"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 rounded-lg border-2 border-slate-200 bg-white text-sm sm:text-base text-[#1F2937] min-h-[44px]
                     focus:outline-none focus:border-[#5E72E4] focus:ring-2 focus:ring-[#5E72E4]/20
                     placeholder:text-[#9CA3AF] transition-all duration-200"
                />
            </div>

            {/* Generate Button */}
            <button
                onClick={generatePlan}
                disabled={loading}
                className="w-full py-3 sm:py-4 rounded-lg font-semibold text-white text-base sm:text-lg min-h-[44px]
                   bg-gradient-to-br from-blue-500 to-purple-500
                   hover:from-blue-600 hover:to-purple-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-lg hover:shadow-xl
                   transform hover:scale-[1.01] active:scale-[0.99]"
            >
                {loading ? "Generating Plan..." : "Generate My Plan"}
            </button>
        </div>
    );
}
