# Askilla — AI Learning Platform

> **3MTT Knowledge Showcase 2.0 Project**  
> Askilla is an AI-powered educational tutor designed for Nigerian learners across high school exams (WAEC/JAMB), university STEM courses, career digital skills, and business writing. It breaks down complex topics into structured micro-lessons in **Standard English** and **Nigerian Pidgin**, featuring warm feedback from **Uncle Sabi**, neural voice synthesis, and zero-shame check-in assessments.

---

## Core Capabilities

- **Bilingual Support**: Instant lesson generation in Standard English and authentic Nigerian Pidgin.
- **Uncle Sabi Tutor Persona**: Patient, encouraging instructional tone with multi-tier hints instead of red-X shaming.
- **Neural Voice Tutor**: Text-to-speech audio synthesis (`tts-1-hd`) with Pidgin cadence pre-processing and voice input.
- **Concept Visualizer**: Embedded vector SVG diagrams modeling exact scientific mechanisms, mathematical proofs, and technical workflows.
- **Neon PostgreSQL Persistence**: Connected via Prisma ORM for user progress tracking, module caching, and attempt analytics.
- **Verified Educational Citations**: Real-world source attributions from Khan Academy, OpenStax, and educational portals.

---

## Architecture & Project Structure

```
askilla/
├── app/                        # Next.js 14 App Router (Pages & Serverless API Routes)
│   ├── admin/dataset/          # Private Creator Analytics & Dataset Hub
│   ├── api/                    # Serverless Endpoints (generate-module, analytics, tts, chat)
│   ├── globals.css             # Design Tokens & Micro-animations
│   ├── layout.tsx              # Root HTML Layout & Viewport Metadata
│   ├── page.tsx                # Main Screen Controller
│   └── share/                  # Certificate Verification & Share Page
├── components/                 # Reusable React UI Components
│   ├── HomeDashboard.tsx       # Search Bar & Trending Study Tracks
│   ├── LearningSession.tsx     # Active Lesson, SVG Visualizer & Check-in Questions
│   ├── ProgressDashboard.tsx   # Learning Analytics & Certificate Archive
│   ├── AudioPlayer.tsx         # Neural TTS Audio Player
│   ├── OnboardingModal.tsx     # Required Student Onboarding
│   └── SettingsView.tsx        # Language & Dark Mode Toggles
├── lib/                        # Shared Utilities & AI Engine
│   ├── ai/                     # Prompt Engineering & Module Generation
│   ├── db/                     # Prisma PostgreSQL Client Singleton
│   └── store/                  # Zustand App Store
├── prisma/                     # Database Models & Schema Definition
│   └── schema.prisma           # PostgreSQL Schema (User, UserProgress, QuestionAttempt, DatasetLog)
└── public/                     # Static Assets & Favicon Branding
```

---

## Environment Setup

### 1. Requirements
- **Node.js**: v18.17.0 or higher
- **npm** v9.0.0 or higher
- **PostgreSQL**: Neon Serverless Postgres instance

---

### 2. Installation & Configuration

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Usefulmech/askilla.git
   cd askilla
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   # Neon PostgreSQL Connection Strings
   DATABASE_URL="postgresql://user:password@ep-floral-meadow-123456.us-east-2.aws.neon.tech/askilla?sslmode=require"
   DIRECT_URL="postgresql://user:password@ep-floral-meadow-123456.us-east-2.aws.neon.tech/askilla?sslmode=require"

   # OpenAI Credentials
   OPENAI_API_KEY="sk-proj-your-openai-api-key"

   # Optional Tavily Web Search Key
   TAVILY_API_KEY="tvly-your-tavily-api-key"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. Generate Prisma Client and synchronize database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to access Askilla locally.

---

## Production Vercel Deployment Guide

To deploy Askilla to Vercel Cloud:

1. Push your latest codebase to GitHub.
2. Import the repository on [Vercel](https://vercel.com/new).
3. Configure the Project Environment Variables (`OPENAI_API_KEY`, `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_APP_URL`).
4. Set Build Command: `npx prisma generate && next build`.
5. Click **Deploy**.

---

## Available Scripts

- `npm run dev` — Starts local development server at `localhost:3000`
- `npm run build` — Builds optimized Next.js production bundle
- `npm run start` — Starts production build server
- `npx tsc --noEmit` — Executes TypeScript type verification

---

## Developer ML Dataset & Analytics Hub

Askilla includes an automated background educational interaction logger for AI model fine-tuning and predictive analytics:

- **Database Persistence**: Written directly to Neon PostgreSQL (`prisma.datasetLog`).
- **Creator Admin Route**: Access `/admin/dataset` to view live interaction metrics, inspect sample entries, and download `.jsonl` or `.csv` training datasets.

---

## License

Created for the **3MTT Knowledge Showcase 2.0**. All rights reserved.
