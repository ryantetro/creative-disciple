# Scripture Tracker

A modern, beautiful Book of Mormon scripture tracking and journaling application built with Next.js, TypeScript, and Tailwind CSS.

![Scripture Tracker](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 📖 **Chapter Tracking** - Mark chapters as complete with a beautiful visual grid
- 🔥 **Daily Streaks** - Build consistency with daily reading streak tracking
- 🏅 **Achievement Badges** - Unlock badges as you reach milestones
- ✨ **Journal Entries** - Record your thoughts and spiritual insights
- 📊 **Progress Tracking** - Visual progress indicators and statistics
- 💾 **Local Storage** - All data stays on your device, completely private

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd creative-disciple

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Main tracking interface
│   └── journal/           # Journal entries page
├── components/            # React components
│   ├── BookSelector.tsx
│   ├── ChapterGrid.tsx
│   ├── ProgressBar.tsx
│   ├── StreakDisplay.tsx
│   ├── BadgeDisplay.tsx
│   ├── JournalForm.tsx
│   └── JournalList.tsx
└── lib/                   # Utility functions and data
    ├── types.ts           # TypeScript interfaces
    ├── storage.ts         # LocalStorage wrapper
    ├── chapters.ts        # Book of Mormon data
    ├── streaks.ts         # Streak logic
    └── badges.ts          # Badge system
```

## 🎨 Design Theme

**Celestial Gradient Minimalism** - A clean, spiritual design with soft gradients and modern aesthetics.

- Soft celestial blue and purple gradients
- Clean, minimalist card-based layouts
- Smooth transitions and micro-animations
- Fully responsive design
- Professional typography

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **LocalStorage API** - Client-side data persistence

## 📊 Data Structure

All data is stored locally in your browser using LocalStorage:

- **completedChapters** - Tracks which chapters you've read
- **journalEntries** - Stores your personal reflections
- **streakData** - Maintains your reading streak
- **badges** - Tracks unlocked achievements

## 🎯 Achievement Badges

- 🔥 **Week Warrior** - Read for 7 consecutive days
- 📖 **Dedicated Reader** - Complete 30 chapters
- ⭐ **Scripture Scholar** - Complete 50 chapters
- 💯 **Century Club** - Complete 100 chapters
- 👑 **Book Master** - Complete an entire book

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with one click

### Build for Production

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎓 Perfect for

- Personal scripture study tracking
- BYU class projects
- Learning Next.js and React
- Portfolio projects
- Spiritual development

## 📖 Book of Mormon Coverage

Tracks all 239 chapters across 15 books:
- 1 Nephi through Moroni
- Complete chapter-by-chapter tracking
- Accurate book and chapter counts

## 🔒 Privacy

- No account required
- No data collection
- All data stored locally on your device
- Works completely offline after first load

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

Built with modern web technologies and a focus on user experience and spiritual growth.

---

**Made with ❤️ for scripture study**
