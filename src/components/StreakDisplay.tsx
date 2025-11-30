"use client";

interface StreakDisplayProps {
    streak: number;
}

export default function StreakDisplay({ streak }: StreakDisplayProps) {
    const getMessage = () => {
        if (streak === 0) return "Start your reading streak today!";
        if (streak === 1) return "Great start! Keep it going!";
        if (streak < 7) return "You're building momentum!";
        if (streak < 30) return "Incredible dedication!";
        return "You're a scripture master!";
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100">
            <div className="flex items-center gap-4">
                <div className="text-5xl animate-pulse">🔥</div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Reading Streak</h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {streak} {streak === 1 ? "day" : "days"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">{getMessage()}</p>
                </div>
            </div>
        </div>
    );
}
