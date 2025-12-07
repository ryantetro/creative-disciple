import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Scripture Tracker
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Track your Book of Mormon reading journey, maintain daily streaks,
            and journal your spiritual insights—all in one beautiful app.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white text-base sm:text-lg
                       bg-gradient-to-r from-blue-500 to-purple-500
                       hover:from-blue-600 hover:to-purple-600
                       transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Tracking
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📖</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Chapter Tracking</h3>
            <p className="text-sm sm:text-base text-slate-600">
              Mark chapters as complete with a beautiful visual grid.
              Track your progress through all 239 chapters of the Book of Mormon.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔥</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Daily Streaks</h3>
            <p className="text-sm sm:text-base text-slate-600">
              Build consistency with daily reading streaks.
              Watch your dedication grow day by day.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✨</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Journal Insights</h3>
            <p className="text-sm sm:text-base text-slate-600">
              Record your thoughts and spiritual impressions.
              Create a personal scripture study journal.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🏅</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Achievement Badges</h3>
            <p className="text-sm sm:text-base text-slate-600">
              Unlock badges as you reach milestones.
              Celebrate your scripture study achievements.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📊</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Progress Tracking</h3>
            <p className="text-sm sm:text-base text-slate-600">
              See your overall progress with visual indicators.
              Know exactly how far you've come.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💾</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Local Storage</h3>
            <p className="text-sm sm:text-base text-slate-600">
              All your data stays on your device.
              No account needed, completely private.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

