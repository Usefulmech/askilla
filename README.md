# 🎓 Askilla — AI Tutor ("Ask Anything. Sabi Everything.")

> **3MTT Knowledge Showcase 2.0 Project**  
> An AI-powered conversational tutor designed for Nigerian learners across all educational levels (WAEC, JAMB, University, Digital Skills, Business Writing). Askilla breaks down any topic into bite-sized micro-lesson modules in **Standard English** and **Nigerian Pidgin** with warm feedback from **Uncle Sabi**, voice STT/TTS capabilities, and zero red-X shaming.

---

## 🌟 Key Features

- **🗣️ Bilingual Learning Support:** Lessons, explanations, questions, and feedback generated natively in Standard English and Nigerian Pidgin.
- **👨‍🏫 Uncle Sabi Tutor Persona:** Warm, patient Nigerian tutor tone that never shames learners. Replaces red X's with encouraging hints (*"You're close! Let's think about it differently."*).
- **🎤 Voice STT & TTS:** Speak answers directly using browser Speech Recognition (`en-NG` / native English) and listen to explanations read aloud with Speech Synthesis.
- **⚡ AI & Offline Native Engine:** Powered by OpenAI GPT-4o for live custom topic generation, with an instant offline fallback generator.
- **📊 PostgreSQL & Analytics Dataset:** Full Prisma ORM schema connected to Neon Serverless Postgres for user sessions, module caching, and attempt analytics.
- **🎨 Warm Notebook Design System:** Strict 3-color palette (`#F5F5F0` base background, `#2D2D2D` text, `#D4A574` primary action) with Plus Jakarta Sans & Inter typography.
- **🏆 Shareable Completion Cards:** Generate "I Sabi [Topic] Now!" cards to share wins on WhatsApp and social media.

---

## 🏗️ Architecture & Project Structure

The codebase is organized cleanly into decoupled frontend, backend, and database layers:

```
askilla/
├── app/                        # Next.js 15 App Router (Frontend Pages & API Routes)
│   ├── api/                    # Serverless Backend Endpoints
│   │   ├── generate-module/    # AI Topic Generation & DB Cache API
│   │   └── progress/           # User Attempt & Analytics API
│   ├── globals.css             # Theme Tokens, Fonts, & Micro-animations
│   ├── layout.tsx              # Root HTML Layout & Viewport Configuration
│   └── page.tsx                # Main Screen Flow Router
├── components/                 # Reusable React UI Components
│   ├── UncleSabiMascot.tsx     # Uncle Sabi Avatar & Speech Bubble System
│   ├── LanguageSelector.tsx    # Native Language Pill Selectors
│   ├── VoiceInput.tsx          # Browser SpeechRecognition STT Component
│   ├── AudioPlayer.tsx         # Browser SpeechSynthesis TTS Component
│   ├── OnboardingModal.tsx     # Screen 0: Language & User Onboarding
│   ├── IntroWalkthrough.tsx    # Screen 1: 3-Step Animated Walkthrough
│   ├── HomeDashboard.tsx       # Screen 2: Topic Picker & Trending Topics
│   ├── LearningSession.tsx     # Screen 3 & 4: Core Lesson, Question & Feedback
│   ├── ProgressDashboard.tsx   # Screen 5: Circular Ring & Achievement Card
│   ├── SettingsView.tsx        # Screen 6: Language & Preferences Toggles
│   └── BottomNav.tsx           # Mobile Thumb Navigation Bar
├── lib/                        # Shared Utilities & Backend Services
│   ├── ai/                     # LLM Prompts & Native Module Generator
│   │   ├── prompts.ts          # Structured Prompt Engineering
│   │   └── module-generator.ts # OpenAI API Integration & Native Fallbacks
│   ├── db/                     # Prisma Client Singleton
│   │   └── prisma.ts           # PostgreSQL Database Connection
│   ├── store/                  # Client State Management
│   │   └── useAskillaStore.ts  # Zustand App Store
│   └── types/                  # TypeScript Interfaces
│       └── askilla.ts          # Module & Question Data Models
├── prisma/                     # Database Models & Migrations
│   └── schema.prisma           # PostgreSQL Prisma Schema
├── .env.example                # Environment Variable Template
├── .gitignore                  # Git Exclusion Rules
├── package.json                # Project Dependencies & Scripts
├── tailwind.config.js          # Tailwind CSS Configuration
└── tsconfig.json               # TypeScript Configuration
```

---

## 🚀 Full Installation & Setup Guide

### 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.17.0 or higher
- **npm** (or `pnpm` / `yarn`)
- **Git**

---

### 2. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/askilla.git

# Navigate into project directory
cd askilla

# Install dependencies
npm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your database and OpenAI credentials:

```env
# Database Connection String for PostgreSQL (Neon Serverless Postgres)
DATABASE_URL="postgresql://user:password@ep-cool-sample-123456.us-east-2.aws.neon.tech/askilla?sslmode=require"

# OpenAI API Key for GPT-4o (Optional: Fallback engine works automatically if omitted)
OPENAI_API_KEY="sk-proj-your-actual-openai-api-key"

# Environment Mode
NODE_ENV="development"
```

---

### 4. Setup Database (Neon PostgreSQL + Prisma)

Generate the Prisma Client and push the schema to your Neon PostgreSQL database:

```bash
# Generate Prisma Client types
npm run db:generate

# Push schema directly to Neon PostgreSQL database
npm run db:push
```

---

### 5. Run Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test Askilla.

---

## 🛠️ Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the development server at `localhost:3000`
- `npm run build` — Builds the production bundle
- `npm run start` — Starts the production server
- `npm run db:generate` — Generates Prisma client types
- `npm run db:push` — Synchronizes schema changes to your PostgreSQL database

---

## 📱 Interactive User Flow (7 Screens)

1. **Onboarding (Screen 0):** Select your preferred learning language (English, Pidgin, Yoruba, Hausa, Igbo) and enter your phone number/name.
2. **Walkthrough (Screen 1):** 3-step animated intro ("Ask anything", "Learn your way", "Sabi everything").
3. **Home Dashboard (Screen 2):** Type or speak any topic in the search bar or choose from trending pills (*WAEC Math*, *JAMB English*, *Excel Basics*, *Data Analysis*).
4. **Learning Session (Screen 3):** Read micro-lessons with bolded English terms, native language guides, SVG diagrams, and faint source citations. Listen via voice TTS or speak your answer via mic.
5. **Feedback States (Screen 4):** Receive encouraging Uncle Sabi feedback. Correct answers trigger celebration confetti; wrong answers provide multi-tier hints without shaming.
6. **Progress View (Screen 5):** Track your progress with the circular progress ring and generate shareable achievement cards.
7. **Settings (Screen 6):** Change your learning language anytime, toggle voice feedback, or switch dark mode.

---

## 🔒 Developer / Creator ML Dataset Hub

Askilla includes an automated background educational interaction logger for AI model fine-tuning and predictive analytics:

- **Local Dataset Path**: Saved automatically to `data/askilla_ml_dataset.jsonl` in structured JSONL format.
- **Private Creator Admin Route**: Access `/admin/dataset` (e.g. `http://localhost:3000/admin/dataset`) to view live interaction metrics, inspect sample entries, and download `.jsonl` or `.csv` training datasets with 1 click.
- **Student Privacy**: All dataset export tools are hidden from the student UI for a clean, distraction-free learning experience.

---

## 📜 License

This project is created for the **3MTT Knowledge Showcase 2.0**. All rights reserved.
