"use client";

import { BadgeData } from "@/lib/types";
import { BADGE_DEFINITIONS } from "@/lib/badges";

interface BadgeDisplayProps {
    badges: BadgeData;
}

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {BADGE_DEFINITIONS.map((badge) => {
                    const isUnlocked = badges[badge.id];
                    return (
                        <div
                            key={badge.id}
                            className={`
                flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200
                ${isUnlocked
                                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md"
                                    : "border-slate-200 bg-slate-50 opacity-50"
                                }
              `}
                        >
                            <div className={`text-4xl mb-2 ${isUnlocked ? "animate-bounce" : "grayscale"}`}>
                                {badge.icon}
                            </div>
                            <h4 className="text-xs font-semibold text-slate-800 text-center mb-1">
                                {badge.name}
                            </h4>
                            <p className="text-xs text-slate-600 text-center">{badge.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
