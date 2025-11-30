// Streak tracking logic

import { StreakData } from "./types";
import { load, save } from "./storage";

export const updateStreak = (): number => {
    const streakData = load<StreakData>("streakData", {
        lastDate: "",
        currentStreak: 0,
    });

    const today = new Date().toISOString().slice(0, 10);

    // If already updated today, return current streak
    if (streakData.lastDate === today) {
        return streakData.currentStreak;
    }

    const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);

    // Check if this is a consecutive day
    if (streakData.lastDate === yesterday) {
        streakData.currentStreak += 1;
    } else {
        // Streak broken, start over
        streakData.currentStreak = 1;
    }

    streakData.lastDate = today;
    save("streakData", streakData);

    return streakData.currentStreak;
};

export const getCurrentStreak = (): number => {
    const streakData = load<StreakData>("streakData", {
        lastDate: "",
        currentStreak: 0,
    });

    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);

    // If last activity was today or yesterday, streak is still active
    if (streakData.lastDate === today || streakData.lastDate === yesterday) {
        return streakData.currentStreak;
    }

    // Streak is broken
    return 0;
};
