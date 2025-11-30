"use client";

import { useState } from "react";
import ReadingPlanForm from "@/components/ReadingPlanForm";
import ReadingPlanDisplay from "@/components/ReadingPlanDisplay";

export default function ReadingPlanPage() {
    const [plan, setPlan] = useState<any>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Reading Plan Generator
                    </h1>
                    <p className="text-slate-600">
                        Create a personalized scripture study plan with AI
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ReadingPlanForm onPlanGenerated={setPlan} />

                    {plan && (
                        <ReadingPlanDisplay summary={plan.summary} plan={plan.plan} />
                    )}
                </div>

                {!plan && (
                    <div className="mt-6 text-center p-12 bg-white rounded-xl border-2 border-slate-200">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            Ready to Start?
                        </h3>
                        <p className="text-slate-600">
                            Configure your reading plan above and click "Generate Plan"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
