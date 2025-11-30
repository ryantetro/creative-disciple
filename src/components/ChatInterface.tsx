"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "@/lib/types";

interface ChatInterfaceProps {
    context?: { book: string; chapter: number };
}

export default function ChatInterface({ context }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: input.trim(),
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/gemini/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    context,
                }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: data.response,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-md border-2 border-slate-200">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            Scripture Study Companion
                        </h3>
                        <p className="text-slate-600">
                            Ask me anything about the Book of Mormon!
                        </p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-4 ${message.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gradient-to-br from-purple-50 to-blue-50 text-slate-800 border-2 border-purple-200"
                                }`}
                        >
                            {message.role === "user" ? (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {message.content}
                                </p>
                            ) : (
                                <div className="text-sm leading-relaxed markdown-content">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => <h1 className="text-xl font-semibold text-slate-800 mt-4 mb-2">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-lg font-semibold text-slate-800 mt-4 mb-2">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-base font-semibold text-slate-800 mt-3 mb-2">{children}</h3>,
                                            p: ({ children }) => <p className="text-slate-700 mb-3 leading-relaxed">{children}</p>,
                                            strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                                            ul: ({ children }) => <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 space-y-1">{children}</ol>,
                                            li: ({ children }) => <li className="text-slate-700 leading-relaxed">{children}</li>,
                                            blockquote: ({ children }) => <blockquote className="border-l-4 border-purple-300 pl-4 italic text-slate-600 my-3">{children}</blockquote>,
                                            code: ({ children }) => <code className="text-purple-600 bg-purple-50 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                                            pre: ({ children }) => <pre className="bg-slate-100 p-3 rounded-lg overflow-x-auto my-3">{children}</pre>,
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                <span className="text-sm text-slate-600">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-slate-200 p-4">
                <div className="flex gap-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question about the scriptures..."
                        rows={2}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-800
                       focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
                       resize-none"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        className="px-6 py-2 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-purple-500
                       hover:from-blue-600 hover:to-purple-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
