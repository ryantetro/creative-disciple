"use client";

interface ProgressBarProps {
    percentage: number;
    completedCount: number;
    totalCount: number;
}

export default function ProgressBar({
    percentage,
    completedCount,
    totalCount,
}: ProgressBarProps) {
    return (
        <div className="w-full bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-slate-800">Progress</h3>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {percentage}%
                </span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-sm text-slate-600 text-center">
                {completedCount} of {totalCount} chapters completed
            </p>
        </div>
    );
}
