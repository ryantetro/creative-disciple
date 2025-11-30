// Badge/achievement system

import { BadgeData } from "./types";
import { load, save } from "./storage";

export const updateBadges = (totalChapters: number, streak: number): BadgeData => {
    const badges = load<BadgeData>("badges", {
        sevenDayStreak: false,
        thirtyChapters: false,
        fiftyChapters: false,
        hundredChapters: false,
        completeBook: false,
    });

    // Unlock badges based on achievements
    if (streak >= 7) badges.sevenDayStreak = true;
    if (totalChapters >= 30) badges.thirtyChapters = true;
    if (totalChapters >= 50) badges.fiftyChapters = true;
    if (totalChapters >= 100) badges.hundredChapters = true;

    save("badges", badges);
    return badges;
};

export const getBadges = (): BadgeData => {
    return load<BadgeData>("badges", {
        sevenDayStreak: false,
        thirtyChapters: false,
        fiftyChapters: false,
        hundredChapters: false,
        completeBook: false,
    });
};

export interface BadgeInfo {
    id: keyof BadgeData;
    name: string;
    description: string;
    icon: string;
}

export const BADGE_DEFINITIONS: BadgeInfo[] = [
    {
        id: "sevenDayStreak",
        name: "Week Warrior",
        description: "Read for 7 consecutive days",
        icon: "🔥",
    },
    {
        id: "thirtyChapters",
        name: "Dedicated Reader",
        description: "Complete 30 chapters",
        icon: "📖",
    },
    {
        id: "fiftyChapters",
        name: "Scripture Scholar",
        description: "Complete 50 chapters",
        icon: "⭐",
    },
    {
        id: "hundredChapters",
        name: "Century Club",
        description: "Complete 100 chapters",
        icon: "💯",
    },
    {
        id: "completeBook",
        name: "Book Master",
        description: "Complete an entire book",
        icon: "👑",
    },
];
