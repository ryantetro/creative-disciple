// TypeScript interfaces for the Scripture Tracker app

export interface Book {
  name: string;
  chapters: number;
}

export interface CompletedChapters {
  [bookName: string]: number[];
}

export interface JournalEntry {
  id: string;
  book: string;
  chapter: number;
  entry: string;
  createdAt: string;
}

export interface StreakData {
  lastDate: string;
  currentStreak: number;
}

export interface BadgeData {
  sevenDayStreak: boolean;
  thirtyChapters: boolean;
  fiftyChapters: boolean;
  hundredChapters: boolean;
  completeBook: boolean;
}

// AI-related types
export interface AIInsight {
  themes: string[];
  insight: string;
  question: string;
  application: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ReadingPlan {
  id: string;
  goal: string;
  plan: DailyReading[];
  summary: string;
  createdAt: string;
}

export interface DailyReading {
  day: number;
  chapters: string[];
  motivation: string;
  completed: boolean;
}
