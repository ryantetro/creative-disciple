"use client";

import ChatInterface from "@/components/ChatInterface";

export default function CompanionPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Scripture Study Companion
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600">
                        Ask questions, explore insights, and deepen your understanding
                    </p>
                </div>

                <ChatInterface />

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg border-2 border-slate-200">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-2">Try asking:</h3>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                        <li>• "What does Alma 32 teach about faith?"</li>
                        <li>• "Explain the symbolism in 1 Nephi 8"</li>
                        <li>• "How can I apply Moroni 10:4 in my life?"</li>
                        <li>• "What are the key themes in 3 Nephi?"</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
