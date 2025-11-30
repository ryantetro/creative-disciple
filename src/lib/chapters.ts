// Book of Mormon structure and chapter tracking logic

import { Book, CompletedChapters } from "./types";
import { load, save } from "./storage";

export const BOOKS: Book[] = [
    { name: "1 Nephi", chapters: 22 },
    { name: "2 Nephi", chapters: 33 },
    { name: "Jacob", chapters: 7 },
    { name: "Enos", chapters: 1 },
    { name: "Jarom", chapters: 1 },
    { name: "Omni", chapters: 1 },
    { name: "Words of Mormon", chapters: 1 },
    { name: "Mosiah", chapters: 29 },
    { name: "Alma", chapters: 63 },
    { name: "Helaman", chapters: 16 },
    { name: "3 Nephi", chapters: 30 },
    { name: "4 Nephi", chapters: 1 },
    { name: "Mormon", chapters: 9 },
    { name: "Ether", chapters: 15 },
    { name: "Moroni", chapters: 10 },
];

export const getTotalChapters = (): number => {
    return BOOKS.reduce((sum, book) => sum + book.chapters, 0);
};

export const getCompletedCount = (completed: CompletedChapters): number => {
    return Object.values(completed).reduce((sum, chapters) => sum + chapters.length, 0);
};

export const toggleChapter = (book: string, chapter: number): void => {
    const completed = load<CompletedChapters>("completedChapters", {});

    if (!completed[book]) {
        completed[book] = [];
    }

    if (completed[book].includes(chapter)) {
        completed[book] = completed[book].filter((c) => c !== chapter);
    } else {
        completed[book].push(chapter);
        completed[book].sort((a, b) => a - b);
    }

    save("completedChapters", completed);
};

export const isChapterCompleted = (
    completed: CompletedChapters,
    book: string,
    chapter: number
): boolean => {
    return completed[book]?.includes(chapter) || false;
};

export const getProgress = (completed: CompletedChapters): number => {
    const completedCount = getCompletedCount(completed);
    const total = getTotalChapters();
    return Math.round((completedCount / total) * 100);
};
