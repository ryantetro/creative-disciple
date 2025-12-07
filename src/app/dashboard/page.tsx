"use client";

import { useState, useEffect } from "react";
import BookSelector from "@/components/BookSelector";
import ChapterGrid from "@/components/ChapterGrid";
import ProgressBar from "@/components/ProgressBar";
import StreakDisplay from "@/components/StreakDisplay";
import BadgeDisplay from "@/components/BadgeDisplay";
import ReflectionPromptBanner from "@/components/ReflectionPromptBanner";
import { BOOKS, toggleChapter, getCompletedCount, getTotalChapters, getProgress } from "@/lib/chapters";
import { updateStreak, getCurrentStreak } from "@/lib/streaks";
import { updateBadges, getBadges } from "@/lib/badges";
import { load } from "@/lib/storage";
import { CompletedChapters, BadgeData } from "@/lib/types";

export default function DashboardPage() {
    const [selectedBook, setSelectedBook] = useState(BOOKS[0].name);
    const [completed, setCompleted] = useState<CompletedChapters>({});
    const [streak, setStreak] = useState(0);
    const [badges, setBadges] = useState<BadgeData>({
        sevenDayStreak: false,
        thirtyChapters: false,
        fiftyChapters: false,
        hundredChapters: false,
        completeBook: false,
    });
    const [showPrompt, setShowPrompt] = useState(true);

    // Load data on mount
    useEffect(() => {
        setCompleted(load<CompletedChapters>("completedChapters", {}));
        setStreak(getCurrentStreak());
        setBadges(getBadges());
    }, []);

    // Reset prompt when book changes
    useEffect(() => {
        setShowPrompt(true);
    }, [selectedBook]);

    const handleToggleChapter = (chapter: number) => {
        toggleChapter(selectedBook, chapter);
        const updatedCompleted = load<CompletedChapters>("completedChapters", {});
        setCompleted(updatedCompleted);

        // Update streak
        const newStreak = updateStreak();
        setStreak(newStreak);

        // Update badges
        const completedCount = getCompletedCount(updatedCompleted);
        const updatedBadges = updateBadges(completedCount, newStreak);
        setBadges(updatedBadges);
    };

    const selectedBookData = BOOKS.find((b) => b.name === selectedBook);
    const totalChapters = selectedBookData?.chapters || 0;
    const completedCount = getCompletedCount(completed);
    const totalCount = getTotalChapters();
    const progress = getProgress(completed);

    // Calculate next chapter to read for prompt context
    const getNextChapter = () => {
        const bookChapters = completed[selectedBook] || [];
        if (bookChapters.length === 0) return 1;
        const lastCompleted = bookChapters[bookChapters.length - 1];
        return Math.min(lastCompleted + 1, totalChapters);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Scripture Tracker
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600">Track your Book of Mormon reading journey</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ProgressBar
                        percentage={progress}
                        completedCount={completedCount}
                        totalCount={totalCount}
                    />
                    <StreakDisplay streak={streak} />
                </div>

                <BadgeDisplay badges={badges} />

                {showPrompt && (
                    <ReflectionPromptBanner
                        book={selectedBook}
                        chapter={getNextChapter()}
                        onDismiss={() => setShowPrompt(false)}
                    />
                )}

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                    <BookSelector selectedBook={selectedBook} onSelectBook={setSelectedBook} />
                    <div className="mt-4 sm:mt-6">
                        <ChapterGrid
                            book={selectedBook}
                            totalChapters={totalChapters}
                            completed={completed}
                            onToggleChapter={handleToggleChapter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

