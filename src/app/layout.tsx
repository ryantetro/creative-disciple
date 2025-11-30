import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scripture Tracker - Book of Mormon Reading Journey",
  description: "Track your Book of Mormon reading progress, maintain streaks, and journal your spiritual insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white shadow-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Scripture Tracker
              </Link>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-lg font-medium text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/journal"
                  className="px-3 py-2 rounded-lg font-medium text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  Journal
                </Link>
                <Link
                  href="/companion"
                  className="px-3 py-2 rounded-lg font-medium text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  AI Companion
                </Link>
                <Link
                  href="/reading-plan"
                  className="px-3 py-2 rounded-lg font-medium text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  Reading Plan
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
