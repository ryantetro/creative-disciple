"use client";

import { BOOKS } from "@/lib/chapters";

interface BookSelectorProps {
    selectedBook: string;
    onSelectBook: (book: string) => void;
}

export default function BookSelector({ selectedBook, onSelectBook }: BookSelectorProps) {
    return (
        <div className="w-full">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">Select a Book</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {BOOKS.map((book) => {
                    const isSelected = book.name === selectedBook;
                    return (
                        <button
                            key={book.name}
                            onClick={() => onSelectBook(book.name)}
                            className={`
                relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 min-h-[80px] sm:min-h-[100px]
                flex flex-col items-center justify-center gap-1 sm:gap-2
                hover:scale-105 hover:shadow-lg active:scale-95
                ${isSelected
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md"
                                    : "border-slate-200 bg-white hover:border-blue-300"
                                }
              `}
                        >
                            <div className="text-center">
                                <div className="font-semibold text-slate-800 text-xs sm:text-sm mb-1 leading-tight">
                                    {book.name}
                                </div>
                                <div
                                    className={`
                    text-xs font-medium
                    ${isSelected ? "text-blue-600" : "text-slate-500"}
                  `}
                                >
                                    {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
                                </div>
                            </div>
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
