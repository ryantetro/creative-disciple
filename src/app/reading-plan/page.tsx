"use client";

import { useState } from "react";
import ReadingPlanForm from "@/components/ReadingPlanForm";
import ReadingPlanDisplay from "@/components/ReadingPlanDisplay";

export default function ReadingPlanPage() {
    const [plan, setPlan] = useState<any>(null);

    return (
        <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="mb-3">
                        <h1 className="text-3xl font-bold text-[#1F2937]">
                            Personalized Reading Plan
                        </h1>
                    </div>
                    <p className="text-[#6B7280] text-lg">
                        Create a scripture study plan tailored to your goals and schedule.
                    </p>
                </div>

                {/* Form Section */}
                <ReadingPlanForm onPlanGenerated={setPlan} />

                {/* Plan Display Section */}
                {plan && (
                    <div className="mt-10">
                        <ReadingPlanDisplay summary={plan.summary} plan={plan.plan} />
                    </div>
                )}
            </div>
        </div>
    );
}
