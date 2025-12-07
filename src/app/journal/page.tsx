"use client";

import { useState, useEffect } from "react";
import JournalForm from "@/components/JournalForm";
import JournalList from "@/components/JournalList";
import { load } from "@/lib/storage";
import { JournalEntry } from "@/lib/types";

export default function JournalPage() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const loadEntries = () => {
        setEntries(load<JournalEntry[]>("journalEntries", []));
    };

    useEffect(() => {
        loadEntries();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Scripture Journal
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600">Record your thoughts and insights</p>
                </div>

                <JournalForm onEntryAdded={loadEntries} />
                <JournalList entries={entries} />
            </div>
        </div>
    );
}
