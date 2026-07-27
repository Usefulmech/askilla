# ASKILLA — VERSION 1.0 (COMPLETE)
## Ask Anything. Sabi Everything.
### Education & Skills Category | 3-Day Build | July 2026

---

## 1. THE PROBLEM (30 Seconds)

Nigerians want to learn — but the system is stacked against them:
- **Students:** WAEC/JAMB tutorial centers cost ₦5,000–₦20,000/month. YouTube videos don't answer THEIR specific confusion. Past question books have answers but no explanation.
- **Uni students:** Need to learn data analysis, Excel, research skills — but courses are expensive, generic, and don't speak their language.
- **Working adults:** Want to learn negotiation, business writing, digital skills — but can't afford ₦50,000+ professional courses.
- **Everyone:** When they get stuck, nobody is there to say *"You're close. Let's think about it differently."* They just see a red X, a confusing video, or a paywall — and give up.

**Askilla is an AI tutor that breaks ANY topic into bite-sized modules, asks questions, and when you get it wrong — explains patiently, in your language, until you get it.**

**Tagline:** *"Ask anything. Sabi everything."*

---

## 2. THE PRODUCT (One Core Loop)

### The Loop (30 seconds per interaction)
1. **Ask anything** — Type or speak any topic: "Quadratic equations" | "Excel basics" | "How to write a business proposal" | "Data analysis fundamentals"
2. **AI builds your module** — 4–6 short lessons, 3–4 questions each, with faint source citations
3. **Answer questions** — Multiple choice or short text
4. **Get feedback** — Correct: affirming nudge. Wrong: encouraging explanation + retry. **Never a red X.**
5. **Track progress** — Visual progress bar. Done = shareable "I Sabi [Topic] Now" card

### The "Uncle Sabi" Tutor Tone
| Moment | Response |
|--------|----------|
| Correct | *"You sabi! You just solved that equation. That's the same thing engineers do."* |
| Wrong (first try) | *"Hmm, you're close. Let's think about it differently. What if we break it into two steps?"* |
| Wrong (second try) | *"This one is tricky. Even my uncle who has taught for 20 years says students mix this up. Let's try another way."* |
| Module complete | *"You just finished Excel Basics. That's not just theory — that's a skill that pays."* |

---

## 3. TARGET USER (Everyone)

| Name | Age | Context | What They Want to Learn |
|------|-----|---------|------------------------|
| Chinedu | 17 | SS3 student, rural Anambra | WAEC Math, JAMB English |
| Amina | 16 | SS2 student, Kano | NECO Biology, in Hausa |
| Tunde | 21 | Uni student, Lagos | Data analysis, Excel, research skills |
| Ngozi | 24 | NYSC corp member | Business writing, presentation skills |
| Baba Musa | 45 | Trader, Kano | How to use WhatsApp Business, pricing strategy |
| Uncle Chinedu | 52 | Taxi driver | Understanding savings, investment basics |
| Mama Ngozi | 62 | Retired | Helping grandson with homework, staying sharp |

**Universal appeal:** From secondary school to university to working adult to retiree. If you can ask it, Askilla can teach it.

---

## 4. WHY THIS WINS EDUCATION CATEGORY

| Judge Criteria | Askilla Delivers |
|----------------|-------------------|
| **Real problem, real user** | 200M+ Nigerians, students to working adults, all need affordable learning |
| **Innovative AI use** | GPT-4o as conversational tutor, generates ANY topic on demand |
| **Cultural relevance** | Content in Pidgin, Yoruba, Hausa, Igbo — not just English translation |
| **Accessibility** | Voice input/output via browser APIs. Works on low-end Android phones. |
| **Measurable impact** | Every question answered = learning moment tracked. Wrong answers retried until correct. |
| **Scalability** | One platform, any subject, any topic, any language. From WAEC to business skills. |
| **Dataset value** | First dataset of how Nigerians learn across languages and levels — what works. |

---

## 5. CORE FEATURES (MVP — Locked for 3 Days)

### 5.1 Onboarding / Language Selection (Screen 0)
- **First screen user sees** — no intro animation before this
- Language selector: English | Pidgin | Yoruba | Hausa | Igbo
- Phone number input (no OTP for demo)
- Name input (optional — "What should Uncle Sabi call you?")
- "Start Learning" button (disabled until language selected)

### 5.2 Intro Animation (Screen 1 — First-Time Only)
- **Step 1:** "Ask anything" — typing animation + floating topic pills
- **Step 2:** "Learn your way" — module cards slide in + language chips
- **Step 3:** "Sabi everything" — SVG checkmark draws itself
- Skip button always available

### 5.3 Home / Topic Picker (Screen 2)
- Large search input: "Wetin you wan learn?" (or "What do you want to learn?" in English mode)
- Voice input button (microphone icon)
- Trending topics: WAEC Math, JAMB English, Excel, Business Writing, Data Analysis
- Recent / Continue Learning section (if returning user)
- Bottom navigation: Home | My Learning | Practice | Settings

### 5.4 Module / Question View (Screen 3)
- **Uncle Sabi avatar + message** — warm, friendly, encouraging
- **Explanation card** — text in chosen language, English terms in **bold**, native equivalents faint
- **Visual / Diagram** — stock image from Unsplash/Pexels or SVG fallback
- **Source citation** — faint, non-clickable, bottom of explanation
- **Audio button** — optional, tap to play (browser TTS)
- **Question card** — multiple choice or short text
- **Answer options** — large tap targets, clear selection states
- **Voice answer option** — speak your answer
- **Submit button** — disabled until option selected

### 5.5 Feedback States (After Submit)
- **Correct:** "You sabi! " + celebration + continue button
- **Wrong (first try):** Gentle shake + encouraging hint + "Try Again"
- **Wrong (second try):** Detailed explanation + "Show Answer" option

### 5.6 Progress / Done View (Screen 4)
- Circular progress ring (modules completed)
- Completed modules list with checkmarks
- Shareable completion card: "I Sabi [Topic] Now — Askilla"
- Next topic suggestions

### 5.7 Settings / Language Switching
- Change learning language anytime
- Toggle: Notifications | Voice Feedback | Dark Mode
- About Askilla + 3MTT info

### 5.8 Voice Input/Output (Browser APIs)
- **SpeechRecognition API:** User speaks answer
- **SpeechSynthesis API:** AI reads question and feedback aloud
- **Whisper STT (Next Phase):** Fine-tuned speech recognition for Nigerian accents
- **No backend voice processing for MVP** — free, native, instant

### 5.9 Visual Explanations (Unsplash/Pexels API + SVG Fallback)
- AI generates search phrase for concept
- Pulls relevant stock image from Unsplash/Pexels
- **Fallback:** If no relevant image found, AI generates simple SVG/text-based diagram
- Free tier: 50 requests/hour

---

## 6. SOURCE CITATION (Faint, Non-Clickable)

**Purpose:** Adds credibility. Shows the user this isn't made up. Builds trust.

**How it works:**
- AI generates module → includes "source" field in JSON
- Displayed as faint grey text at bottom of explanation
- Non-clickable — just visible attribution
- Sources include: Khan Academy, Coursera, WAEC Syllabus, JAMB Brochure, NECO Curriculum, 3MTT Curriculum, Google Digital Skills, standard textbooks

**Example:**
```
[Explanation text in Pidgin/Yoruba/Hausa/Igbo]

—
Source: Khan Academy — Algebra Basics
```

**Why faint:** Doesn't compete with learning content. Just sits there as proof of quality.

---

## 7. LANGUAGE MANAGEMENT (Complete System)

### 7.1 User Language Selection
**Onboarding:**
```
"Which language do you prefer for learning?"
[ ] English
[ ] Pidgin
[ ] Yoruba
[ ] Hausa
[ ] Igbo

"You can change this anytime in settings."
```

**Stored in user profile:**
```sql
preferred_language TEXT DEFAULT 'english'
```

**Changeable in settings** — not locked in forever.

### 7.2 AI Generation Strategy (Native, Not Translated)

**Wrong approach:**
- Generate in English → Translate to Yoruba → Sounds robotic, literal, wrong

**Right approach:**
- Pass language to prompt → AI generates natively in that language

```javascript
// The prompt sent to GPT-4o
const prompt = `
You are Uncle Sabi, a patient Nigerian tutor. 
Generate a learning module on "${topic}" in ${language}.

Rules:
- Use ${language} NATURALLY, not translated from English
- Tone: encouraging, warm, like a favorite uncle
- Examples: use Nigerian contexts (market, school, family, workplace)
- English terms: highlight in **bold** with ${language} equivalent in parentheses
- Goal: understand in ${language}, master English term for exam/professional use

For Pidgin: use Nigerian Pidgin naturally ("I dey", "na so", "abeg", "no wam")
For Yoruba: use proper Yoruba, not literal translation ("ìdí ọ̀ràn" not "equation")
For Hausa: use Hausa phrasing, not English structure ("lissafi" not "mathematics")
For Igbo: use Igbo expressions, not word-for-word ("ọmụmụ" not "learning")
`;
```

### 7.3 Content Structure (Language-Agnostic)

```json
{
  "topic": "Quadratic Equations",
  "language": "pidgin",
  "modules": [
    {
      "title": "Wetin Be Quadratic Equation?",
      "explanation": {
        "local": "Quadratic equation na equation where the highest power of x na 2...",
        "english_terms": ["quadratic", "equation", "root", "factor"],
        "native_equivalents": {
          "quadratic": "ìdí ọ̀ràn tó ní ìpà méjì (Yoruba context)",
          "equation": "ìdí ọ̀ràn",
          "root": "gbòngì",
          "factor": "ìpín"
        }
      },
      "questions": [
        {
          "question": "Which of these na quadratic equation?",
          "options": ["x + 3 = 0", "x² + 2x + 1 = 0", "x³ - 8 = 0"],
          "correct_answer": "x² + 2x + 1 = 0",
          "wrong_feedback": "Hmm, look again. Quadratic mean the highest power na 2. Which one get x²?",
          "correct_feedback": "You sabi! Quadratic mean the highest power of x na 2. You don master am!"
        }
      ]
    }
  ]
}
```

**Key insight:** The entire module — questions, feedback, explanations — is generated in the chosen language from the start. Not translated. Not adapted. **Born in that language.**

### 7.4 UI Language (English + Pidgin Mix)

The app interface uses **English + Pidgin mix** — standard for Nigerian apps:

| English | Pidgin Mix | Context |
|---------|-----------|---------|
| "Ask anything" | "Ask anything" | Main prompt |
| "Start Learning" | "Start Learning" | Button |
| "Your Progress" | "Your Progress" | Label |
| "Correct!" | "You sabi!" | Feedback |
| "Try again" | "Try am again" | Retry |
| "Module Complete" | "You don finish!" | Celebration |

**Why not full Yoruba/Hausa/Igbo UI?**
- Most Nigerian users navigate apps in English even if they prefer content in native language
- Full UI translation is expensive to maintain
- The **learning content** is what matters — that's where native language shines

**Exception:** If user selects Yoruba/Hausa/Igbo, show a **welcome message** in that language, then revert to English/Pidgin UI with native content.

### 7.5 Database Storage (Per Language)

```sql
-- modules table
CREATE TABLE modules (
    id UUID PRIMARY KEY,
    topic TEXT NOT NULL,
    language TEXT NOT NULL, -- 'english', 'pidgin', 'yoruba', 'hausa', 'igbo'
    difficulty TEXT,
    content JSONB NOT NULL, -- full module in this language
    created_at TIMESTAMP DEFAULT NOW()
);

-- user preference
CREATE TABLE users (
    id UUID PRIMARY KEY,
    phone TEXT UNIQUE,
    preferred_language TEXT DEFAULT 'english',
    -- can be changed anytime
);
```

**Cache by language:** Same topic, different language = different module. Cached separately.

### 7.6 The Fallback (Critical)

**If AI fails to generate in native language** (rare but possible):

1. **Detect:** Check if response contains English words where it shouldn't
2. **Retry:** Send follow-up prompt: *"Please regenerate entirely in Yoruba, not English"*
3. **Fallback:** If still failing, generate in English + show "English version" badge
4. **Log:** Track failures to improve prompt

### 7.7 The Demo Moment (For Judges)

**Show language switching live:**

> *"I'll now ask the same topic in three languages to show it works."*

1. Type "Algebra basics" → Select **English** → module generates in English
2. Type "Algebra basics" → Select **Pidgin** → module generates in Pidgin
3. Type "Algebra basics" → Select **Yoruba** → module generates in Yoruba

**The judge sees:** Same topic, three completely different modules. Not translations. **Native generations.**

### 7.8 Language Summary Table

| Aspect | How It Works |
|--------|--------------|
| **User selects** | Onboarding + settings, changeable anytime |
| **AI generates** | Natively in chosen language, not translated |
| **UI language** | English + Pidgin mix (standard Nigerian app pattern) |
| **Content language** | Fully native: explanations, questions, feedback, examples |
| **English terms** | Highlighted in **bold**, with native equivalent in parentheses |
| **Database** | Separate module per language, cached |
| **Fallback** | Retry → English fallback → log for improvement |

---

## 8. MVP vs. NEXT PHASE (Roadmap)

### MVP (3-Day Build)
| Feature | Status |
|---------|--------|
| Topic input (text/voice) |  Built |
| AI module generation (5 languages) |  Built |
| Text explanations with source citations |  Built |
| Image from Unsplash/Pexels |  Built |
| SVG diagram fallback |  Built |
| Question/answer flow |  Built |
| Encouraging feedback (no red X) |  Built |
| Progress tracking |  Built |
| Shareable completion card |  Built |
| Browser Speech API (voice I/O) |  Built |
| Phone auth (no OTP) |  Built |
| Neon database + Prisma |  Built |
| Language switching (English, Pidgin, Yoruba, Hausa, Igbo) |  Built |
| Onboarding with language selection |  Built |
| Uncle Sabi avatar/mascot |  Built |
| Intro animation |  Built |

### Next Phase (Post-Hackathon)
| Feature | Timeline | Pitch Line |
|---------|----------|------------|
| **Real OTP/SMS auth** | Month 1 | *"OTP verification for security"* |
| **Whisper STT** | Month 2 | *"Fine-tuned speech recognition for Nigerian accents"* |
| **Paystack billing** | Month 2 | *"Monetization: ₦100 per module or ₦500/month unlimited"* |
| **Full PWA offline** | Month 3 | *"Offline mode for students without data"* |
| **Clickable source links** | Month 3 | *"Clickable citations to full resources"* |
| **Custom image generation** | Month 4 | *"AI-generated diagrams for technical topics"* |
| **More languages** | Month 4 | *"Expand to Fulfulde, Tiv, Ibibio, and more"* |

---

## 9. TECHNICAL ARCHITECTURE

### Frontend
| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| State | Zustand |
| PWA | Next-PWA Plugin |
| Icons | Lucide React |
| Fonts | Plus Jakarta Sans (headings), System font (body) |

### Backend
| Layer | Technology |
|-------|------------|
| Framework | Next.js API Routes (serverless) |
| AI/LLM | OpenAI GPT-4o |
| Image API | Unsplash API (free tier) |
| Database | Neon (Serverless Postgres) |
| ORM | Prisma |
| Auth | Phone number only, no OTP (simple JWT) |

### Infrastructure
```
Client (Next.js PWA on Vercel)
    │ HTTPS
    ▼
Next.js API Routes (Vercel)
    │
    ├── OpenAI GPT-4o (module generation + tutoring)
    ├── Unsplash API (stock images)
    └── Neon Postgres (user data, progress, modules)
```

---

## 10. DATABASE SCHEMA (Neon Postgres)

```sql
-- users (phone auth, no OTP)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT UNIQUE NOT NULL,
    name TEXT,
    preferred_language TEXT DEFAULT 'english',
    created_at TIMESTAMP DEFAULT NOW()
);

-- modules (AI-generated, cached)
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT NOT NULL,
    language TEXT NOT NULL,
    difficulty TEXT,
    content JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- user_progress
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    module_id UUID REFERENCES modules(id),
    current_question INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    wrong_attempts INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- question_attempts (the dataset)
CREATE TABLE question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    module_id UUID REFERENCES modules(id),
    question_index INTEGER,
    user_answer TEXT,
    is_correct BOOLEAN,
    feedback_given TEXT,
    language TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 11. THE LLM PROMPT (Module Generation)

```
You are Uncle Sabi, a patient Nigerian tutor. Generate a learning module on [TOPIC] in [LANGUAGE].

Rules:
- 4-6 short modules total
- Each module: 1 concept explanation (2 min read), 1 image search phrase, 1 source citation, 3-4 questions
- Questions: mix of multiple choice and short answer
- Tone: encouraging, warm, never shaming. Like a favorite uncle teaching.
- Language: [English/Pidgin/Yoruba/Hausa/Igbo] — use naturally, not translated literally
- Examples: use Nigerian contexts (market, school, family, workplace)
- English terms: highlight in **bold** with native equivalent in parentheses
- Goal: understand in native language, master English term for exam/professional use

Language-specific instructions:
- Pidgin: use Nigerian Pidgin naturally ("I dey", "na so", "abeg", "no wam", "how far")
- Yoruba: use proper Yoruba, not literal translation ("ìdí ọ̀ràn" not "equation")
- Hausa: use Hausa phrasing, not English structure ("lissafi" not "mathematics")
- Igbo: use Igbo expressions, not word-for-word ("ọmụmụ" not "learning")

Source citation: Include a "source" field with a real, credible source:
- For academic topics: Khan Academy, Coursera, standard textbooks
- For exam topics: WAEC Syllabus, JAMB Brochure, NECO Curriculum
- For skills: 3MTT Nigeria, Google Digital Skills, industry-standard resources

Visual fallback: Include "image_search" for Unsplash, and "diagram" field with simple SVG/text-based diagram as fallback

For wrong answers, provide encouraging feedback that:
1. Acknowledges the attempt
2. Explains why it's wrong gently
3. Gives a hint toward the right answer
4. Never says "incorrect" or uses red X

Output JSON:
{
  "topic": "...",
  "language": "...",
  "modules": [
    {
      "title": "...",
      "explanation": {
        "local": "...",
        "english_terms": ["..."],
        "native_equivalents": {"term": "native"}
      },
      "image_search": "...",
      "diagram": "<svg>...</svg>",
      "source": "...",
      "audio_available": true,
      "questions": [...]
    }
  ]
}
```

---

## 12. 3-DAY BUILD PLAN

| Day | Focus | Demo Moment |
|-----|-------|-------------|
| **Day 1** | Core loop: topic input → module generation → question flow → feedback | Judge types "Excel basics" → gets 4-module course → answers wrong → gets encouraging explanation → retries → correct |
| **Day 2** | Phone auth + Neon + image API + SVG fallback + voice I/O + source citations + language switching | Judge logs in with phone, switches to Pidgin, sees module regenerate in Pidgin, speaks answer, hears feedback, sees faint source citation |
| **Day 3** | Polish UI + shareable card + intro animation + demo video + pitch | Smooth full flow, language switch demo, "I Sabi Excel Basics Now" card, recorded demo, 3-min pitch |

---

## 13. DESIGN SPEC (STITCH-READY)

### Design System (Strict Three-Color)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#F5F5F0` | **ALL backgrounds. Every screen.** |
| `--text` | `#2D2D2D` | **ALL text. Headings, body, labels.** |
| `--action` | `#D4A574` | **ALL actions. Buttons, progress, highlights, badges.** |

**NO OTHER COLORS. Period.**

### Typography
- **Headings:** Plus Jakarta Sans — modern, warm, friendly
- **Body:** System font stack (Inter fallback) — normal, readable, unobtrusive
- **Sizes:** Large for prompts, medium for explanations, small for citations and footer

### Shapes
- **Border radius:** 16px on all cards, 24px on large containers, 999px on pills and buttons
- **No sharp corners anywhere**

### Animation Language
- **Breathing:** Action buttons pulse subtly (0.98 ↔ 1.02, 3s loop)
- **Slide-up:** Cards enter from bottom (Y: 20px → 0, opacity 0 → 1, 0.4s ease-out)
- **Progress fill:** Smooth width transition (0.5s ease)
- **Correct feedback:** Gentle scale pulse (1 → 1.05 → 1, 0.3s) + "You sabi!" badge pops in
- **Wrong feedback:** Subtle horizontal shake (±4px, 0.3s) + warm explanation slides up
- **Typing cursor:** Blinking pipe character, 0.8s interval
- **Floating elements:** Slow vertical drift (±8px, 4s loop)

---

## 14. COMPLETE SCREEN DESIGNS

### SCREEN 0: ONBOARDING / LANGUAGE SELECTION

**Layout:** Full-screen `#F5F5F0` background, centered content, generous vertical spacing

**Elements (Top to Bottom):**

1. **App Logo/Wordmark**
   - "Askilla" in Plus Jakarta Sans, 32px, `#2D2D2D`
   - Tagline below: "Ask anything. Sabi everything." — 16px, `#2D2D2D`, opacity 0.7

2. **Welcome Message**
   - "Welcome! " — 24px, Plus Jakarta Sans, `#2D2D2D`
   - "Before we start, which language do you prefer for learning?" — 16px, normal, `#2D2D2D`, opacity 0.8

3. **Language Selector (The Core Feature)**
   - Five pill-shaped buttons in a horizontal scroll or 2x3 grid
   - Each pill: `#F5F5F0` background, 1px `#D4A574` border, 999px border radius
   - Text inside: "English" | "Pidgin" | "Yoruba" | "Hausa" | "Igbo" — 14px, `#2D2D2D`
   - **Selected state:** `#D4A574` background, `#2D2D2D` text, subtle scale (1.05)
   - Checkmark icon on selected pill

4. **Phone Number Input**
   - Label: "Your phone number" — 14px, `#2D2D2D`, opacity 0.7
   - Input field: `#FFFFFF` background, 16px border radius, 1px `#E0E0E0` border
   - Placeholder: "08012345678" — 16px, `#2D2D2D`, opacity 0.4
   - Nigeria flag  prefix

5. **Name Input (Optional)**
   - Label: "What should we call you?" — 14px, `#2D2D2D`, opacity 0.7
   - Input field: same style as phone
   - Placeholder: "Uncle Sabi will call you this" — 16px, `#2D2D2D`, opacity 0.4

6. **"Start Learning" Button**
   - Full-width, 56px height, 999px border radius
   - `#D4A574` background, `#2D2D2D` text
   - Text: "Start Learning " — 16px, Plus Jakarta Sans, semi-bold
   - Breathing pulse animation when active
   - Disabled state (until language selected): opacity 0.5, no pulse

7. **"You can change language anytime in settings"**
   - 12px, `#2D2D2D`, opacity 0.5, centered

---

### SCREEN 1: INTRO ANIMATION (First-Time Only, After Onboarding)

**Step 1: "Ask anything"**
- Large centered text: "Ask anything" — types out character by character
- Cursor blinking after text
- Below: floating topic pills drift slowly:
  - "Excel basics" | "WAEC Math" | "Business writing" | "Data analysis" | "Negotiation"
  - Each pill: `#D4A574` background, 999px radius, small text
- Bottom: "Swipe to continue →" hint

**Step 2: "Learn your way"**
- Large text: "Learn your way"
- Subtext: "In your language. At your pace. Any topic."
- Language chips float in from bottom:
  - "English" | "Pidgin" | "Yoruba" | "Hausa" | "Igbo"
  - Each chip: `#D4A574` border, `#F5F5F0` bg, slides up with stagger (0.1s each)
- Small module card preview slides in:
  - "Excel Basics — 5 modules" with mini progress bar

**Step 3: "Sabi everything"**
- Large SVG checkmark draws itself (stroke animation, 1s)
- Text: "Sabi everything"
- Subtext: "Wrong answers? Uncle Sabi explains. No shame. Just growth."
- "Start Learning" button pulses at bottom

---

### SCREEN 2: HOME / TOPIC PICKER (Main Screen)

**Header**
- Left: Hamburger menu (≡) — 24px, `#2D2D2D`
- Center: "Askilla" wordmark — 20px, Plus Jakarta Sans
- Right: Language pill — shows current language (e.g., "Pidgin ▼") — `#D4A574` bg, 999px radius, small text

**Hero Section**
- Large prompt: "Wetin you wan learn?" (or "What do you want to learn?" in English mode)
  - 28px, Plus Jakarta Sans, `#2D2D2D`
  - Animated: subtle float up/down
- **Search/Input Field**
  - Full-width, 56px height, 999px border radius
  - `#FFFFFF` background, 1px `#E0E0E0` border
  - Left:  search icon
  - Placeholder text: "Type a topic, subject, or skill..." — 16px, `#2D2D2D`, opacity 0.4
  - Right:  microphone icon (voice input) — `#D4A574`
  - Focus state: border changes to `#D4A574`, subtle glow

**Trending Topics (Horizontal Scroll)**
- Section label: "Trending now " — 14px, `#2D2D2D`, opacity 0.7
- Horizontal scroll of pill buttons:
  - "WAEC Math" | "JAMB English" | "Excel Basics" | "Business Writing" | "Data Analysis"
  - Each: `#D4A574` background, 999px radius, 14px text
  - Subtle breathing animation on first pill

**Recent / Continue Learning (If returning user)**
- Section label: "Continue where you left off " — 14px, `#2D2D2D`, opacity 0.7
- Card: "Excel Basics — 3 of 5 modules sabi'd"
  - `#FFFFFF` background, 16px radius, subtle shadow
  - Mini progress bar: `#D4A574` fill
  - "Continue →" text in `#D4A574`

**Bottom Navigation**
- Fixed bottom bar, `#FFFFFF` background, top border 1px `#E0E0E0`
- Four icons:
  -  Home (active: `#D4A574`) |  My Learning |  Practice | ️ Settings
  - Labels below icons: 10px, `#2D2D2D`

**Footer**
- "3MTT Knowledge Showcase 2.0" — 10px, `#2D2D2D`, opacity 0.4, centered

---

### SCREEN 3: MODULE / QUESTION VIEW (The Core Learning Screen)

**Header**
- Left: ← Back arrow
- Center: Module title — "Excel Basics" — 18px, Plus Jakarta Sans
- Right: Progress: "3/5" — 14px, `#2D2D2D`, opacity 0.7

**Progress Bar**
- Full-width, 8px height, 999px radius
- Background: `#E0E0E0`
- Fill: `#D4A574`, smooth width transition

**Content Area (Scrollable)**

#### 1. Uncle Sabi Avatar + Message
- Small circular avatar (warm illustration, friendly uncle face) — 40px
- Speech bubble: "Let's learn about SUM formulas today. You sabi numbers already — we just dey add tool."
  - `#FFFFFF` background, 16px radius, subtle shadow
  - Text: 16px, `#2D2D2D`
  - Small tail pointing to avatar

#### 2. Explanation Card
- `#FFFFFF` background, 16px radius, padding 20px
- **Title:** "Wetin Be SUM Formula?" — 20px, Plus Jakarta Sans, `#2D2D2D`
- **Text explanation:** 
  - "SUM formula na function wey go add all the numbers for you automatically. Instead of you dey use calculator, Excel go do am sharp sharp."
  - 16px, normal, `#2D2D2D`, line-height 1.6
  - **English terms in bold:** "**SUM**", "**formula**", "**function**"
- **Native equivalents (faint):**
  - "SUM = Àfikún (Yoruba) | Ƙara (Hausa) | Mgbakwunye (Igbo)"
  - 12px, `#2D2D2D`, opacity 0.5

#### 3. Visual / Diagram
- If image available: stock photo, 16px radius, full-width
- If SVG fallback: simple diagram, `#D4A574` stroke, `#F5F5F0` fill
- Caption below: "How SUM formula works" — 12px, `#2D2D2D`, opacity 0.6

#### 4. Source Citation (Faint)
- At bottom of explanation card
- "— Source: Microsoft Excel Documentation" — 11px, `#2D2D2D`, opacity 0.35
- Non-clickable, just visible

#### 5. Audio Button (Optional)
- "▶️ Listen to Uncle Sabi explain this" — pill button
- `#D4A574` border, `#F5F5F0` bg, 999px radius
- Tap to play audio (browser TTS)
- When playing: pulse animation, text changes to "️ Pause"

#### 6. Question Card
- `#FFFFFF` background, 16px radius, padding 20px
- **Question label:** "Try am now " — 14px, `#2D2D2D`, opacity 0.7
- **Question text:** "If cell A1 = 10, A2 = 20, A3 = 30. Wetin =SUM(A1:A3) go give you?"
  - 18px, `#2D2D2D`, line-height 1.5

#### 7. Answer Options (Multiple Choice)
- Four large tap targets, stacked vertically, 16px gap
- Each option:
  - `#FFFFFF` background, 16px radius, 1px `#E0E0E0` border
  - Padding: 16px vertical, 20px horizontal
  - Text: 16px, `#2D2D2D`
  - **Hover/Active:** border changes to `#D4A574`, subtle scale (1.02)
  - **Selected:** `#D4A574` background, `#2D2D2D` text
- Options:
  - A) 30
  - B) 60  (correct)
  - C) 100
  - D) 600

#### 8. Voice Answer Option
- " Or speak your answer" — pill button below options
- `#D4A574` border, tap to activate SpeechRecognition
- When listening: pulsing red dot (use `#D4A574` tinted), "Listening..."

#### 9. Submit Button
- Full-width, 56px height, 999px radius
- `#D4A574` background, `#2D2D2D` text
- "Submit Answer →" — 16px, Plus Jakarta Sans
- Disabled until option selected

---

### SCREEN 4: FEEDBACK STATES (After Submit)

#### CORRECT ANSWER STATE
- Green checkmark (use `#D4A574` tinted, not new color) pops in with bounce
- "You sabi! " — 24px, Plus Jakarta Sans, `#2D2D2D`
- Uncle Sabi message:
  - "Correct! SUM(A1:A3) = 60. You just use Excel like accountant. That na **formula** — one powerful tool."
  - `#FFFFFF` bubble, 16px radius
- "Continue →" button: `#D4A574` bg, slides up
- Confetti-like particles (small circles, `#D4A574`, float and fade)

#### WRONG ANSWER STATE (First Try)
- Gentle shake on question card (±4px horizontal, 0.3s)
- Uncle Sabi message:
  - "Hmm, you dey close. Remember say SUM mean 'add everything together.' A1 = 10, A2 = 20, A3 = 30. Try add them first."
  - `#FFFFFF` bubble, 16px radius
- "Try Again ↺" button: `#D4A574` border, `#F5F5F0` bg
- Options reset, user can select again

#### WRONG ANSWER STATE (Second Try)
- Uncle Sabi message:
  - "This one dey tricky. No wam — even my uncle wey teach for 20 years say students dey mix am up. Let's break am down: 10 + 20 + 30 = ?"
  - More detailed hint, warmer tone
- "Try Again ↺" button still available
- Option to "Show Answer ️" — reveals correct answer with full explanation

---

### SCREEN 5: PROGRESS / DONE VIEW

**Header**
- "Your Progress " — 24px, Plus Jakarta Sans

**Circular Progress Ring**
- Large circle in center, 200px diameter
- Background ring: `#E0E0E0`, 8px stroke
- Fill ring: `#D4A574`, 8px stroke, animated draw (1s)
- Center text: "3/5" — 48px, Plus Jakarta Sans, `#2D2D2D`
- Below: "modules sabi'd" — 14px, `#2D2D2D`, opacity 0.7

**Completed Modules List**
- Section: "Wetin you don sabi " — 18px, Plus Jakarta Sans
- List of completed modules:
  - " Introduction to Excel"
  - " SUM and AVERAGE formulas"
  - " Cell references"
  - " COUNT and MAX formulas" (in progress)
  - " Charts and graphs" (locked, opacity 0.5)
- Each item: `#FFFFFF` card, 16px radius, padding 16px
- Checkmark: `#D4A574`

**Shareable Completion Card**
- `#FFFFFF` background, 16px radius, padding 24px
- Decorative border: 2px `#D4A574` dashed
- Large text: "I Sabi Excel Basics Now! " — 24px, Plus Jakarta Sans
- Subtext: "Askilla — Ask anything. Sabi everything." — 14px
- "Share your win " button: `#D4A574` bg, 999px radius
- Preview of social share (WhatsApp, Twitter, copy link)

**Next Steps**
- "Wetin you wan learn next? " — 18px, Plus Jakarta Sans
- Suggested topics as pills: "Excel Advanced" | "Google Sheets" | "Budgeting"
- Each: `#D4A574` bg, 999px radius

---

### SCREEN 6: UNCLE SABI PROFILE / MASCOT

**Uncle Sabi Character Design**
- Warm, friendly Nigerian uncle figure
- Soft round face, kind eyes, slight smile
- Wearing simple traditional attire (subtle, not stereotypical)
- Color palette: warm browns that harmonize with `#D4A574`
- Style: flat illustration, modern, approachable

**Appearances Throughout App**
- Small avatar (40px) next to messages in module view
- Medium illustration (80px) in feedback states
- Large illustration (120px) in celebration/completion screens
- Animated: subtle head nod when speaking, gentle bounce when celebrating

---

### SCREEN 7: SETTINGS / LANGUAGE SWITCHING

**Header**
- "Settings ️" — 24px, Plus Jakarta Sans

**Language Section**
- "Your Learning Language " — 18px, Plus Jakarta Sans
- Current language highlighted: e.g., "Pidgin "
- Other languages as options:
  - "English" | "Yoruba" | "Hausa" | "Igbo"
  - Each: `#FFFFFF` card, 16px radius, tap to switch
  - Confirmation modal: "Switch to Yoruba? Your current progress will be saved."

**Other Settings**
- "Notifications " — toggle
- "Voice Feedback " — toggle
- "Dark Mode " — toggle (inverts: `#2D2D2D` bg, `#F5F5F0` text)
- "About Askilla ℹ️" — links to 3MTT info

---

## 15. COMPONENT LIBRARY

### Buttons
| Type | Style |
|------|-------|
| Primary | `#D4A574` bg, `#2D2D2D` text, 999px radius, 56px height |
| Secondary | `#F5F5F0` bg, `#D4A574` border, `#2D2D2D` text, 999px radius |
| Pill/Chip | `#D4A574` bg, `#2D2D2D` text, 999px radius, 32px height |
| Icon Button | 48px circle, `#D4A574` bg or border |

### Cards
| Type | Style |
|------|-------|
| Content Card | `#FFFFFF` bg, 16px radius, subtle shadow |
| Explanation Card | `#FFFFFF` bg, 16px radius, left border 4px `#D4A574` |
| Question Card | `#FFFFFF` bg, 16px radius, 1px `#E0E0E0` border |
| Feedback Card | `#FFFFFF` bg, 16px radius, subtle shadow |

### Inputs
| Type | Style |
|------|-------|
| Text Input | `#FFFFFF` bg, 16px radius, 1px `#E0E0E0` border, focus: `#D4A574` border |
| Search | Text input +  left +  right |
| Select/Pill | 999px radius, `#D4A574` border or bg |

### Feedback Elements
| Type | Style |
|------|-------|
| Correct Badge | "You sabi!" — `#D4A574` bg pill, pops in with bounce |
| Encouragement Bubble | Uncle Sabi avatar + speech bubble, slides up |
| Progress Ring | SVG circle, `#D4A574` stroke, animated |
| Source Citation | 11px, `#2D2D2D`, opacity 0.35 |

---

## 16. ANIMATION SPECIFICATIONS

### Micro-interactions
| Trigger | Animation |
|---------|-----------|
| Button tap | Scale 0.98 → 1, 0.15s |
| Card appear | Y: 20px → 0, opacity 0 → 1, 0.4s ease-out |
| Progress fill | Width 0% → X%, 0.5s ease |
| Correct answer | Scale pulse 1 → 1.05 → 1, badge pop |
| Wrong answer | Shake ±4px, 0.3s |
| Typing cursor | Blink opacity 1 ↔ 0, 0.8s |
| Floating pills | Y: ±8px drift, 4s loop |
| Audio playing | Pulse ring around button, 1.5s loop |
| Uncle Sabi speaking | Subtle head nod, 0.5s |

### Page Transitions
| From → To | Animation |
|-----------|-----------|
| Onboarding → Home | Slide up, 0.4s |
| Home → Module | Slide right, 0.3s |
| Module → Feedback | Fade + scale, 0.3s |
| Feedback → Next question | Slide left, 0.3s |
| Module → Progress | Slide up, 0.4s |

---

## 17. RESPONSIVE CONSIDERATIONS

### Mobile (Primary)
- All designs above are mobile-first
- Touch targets minimum 48px
- Bottom nav for thumb reachability

### Tablet
- Side-by-side layout: explanation left, question right
- Larger Uncle Sabi illustration
- More content visible without scroll

### Desktop
- Centered content, max-width 480px (mobile-like experience)
- Or expanded: topic list left, content right
- Keyboard navigation support

---

## 18. ACCESSIBILITY

- All text minimum 14px, body 16px
- Color contrast: `#2D2D2D` on `#F5F5F0` = 12.6:1 (exceeds WCAG AAA)
- Touch targets 48px minimum
- Voice input alternative for typing
- Screen reader labels on all interactive elements
- Reduced motion support: disable animations if user prefers

---

## 19. GOOGLE STITCH PROMPT (Copy-Paste Ready)

```
Design a comprehensive mobile-first learning app called "Askilla" — an AI tutor that teaches anything in your language. This is a complete, all-in-one design system. Every screen, every state, every feature must be designed.

---

## DESIGN SYSTEM (Strict Three-Color)

### Colors (Only These Three)
- Background: #F5F5F0 — ALL backgrounds. Every screen.
- Text: #2D2D2D — ALL text. Headings, body, labels.
- Action: #D4A574 — ALL actions. Buttons, progress, highlights, badges.

NO OTHER COLORS. Period.

### Typography
- Headings: Plus Jakarta Sans — modern, warm, friendly
- Body: System font (Inter fallback) — normal, readable

### Shapes
- Border radius: 16px on cards, 24px on large containers, 999px on pills and buttons
- No sharp corners anywhere

### Animation
- Breathing: Action buttons pulse subtly (0.98 ↔ 1.02, 3s loop)
- Slide-up: Cards enter from bottom (Y: 20px → 0, opacity 0 → 1, 0.4s ease-out)
- Progress fill: Smooth width transition (0.5s ease)
- Correct: Gentle scale pulse + "You sabi!" badge pops in
- Wrong: Subtle horizontal shake (±4px, 0.3s) + warm explanation slides up
- Typing cursor: Blinking pipe character, 0.8s interval
- Floating elements: Slow vertical drift (±8px, 4s loop)

---

## SCREENS TO DESIGN (7 Screens + All States)

### SCREEN 0: ONBOARDING / LANGUAGE SELECTION
Full-screen #F5F5F0 background, centered content.

Elements (top to bottom):
1. "Askilla" wordmark — 32px, Plus Jakarta Sans, #2D2D2D
2. Tagline: "Ask anything. Sabi everything." — 16px, #2D2D2D, opacity 0.7
3. "Welcome! " — 24px, Plus Jakarta Sans
4. "Before we start, which language do you prefer for learning?" — 16px, opacity 0.8
5. Language selector: Five pill buttons — "English" | "Pidgin" | "Yoruba" | "Hausa" | "Igbo"
   - Unselected: #F5F5F0 bg, 1px #D4A574 border, 999px radius
   - Selected: #D4A574 bg, #2D2D2D text, scale 1.05
6. Phone input: "Your phone number" — #FFFFFF bg, 16px radius, Nigeria flag  prefix
7. Name input (optional): "What should we call you?"
8. "Start Learning " button — full-width, 56px height, 999px radius, #D4A574 bg, #2D2D2D text, breathing pulse when active, disabled until language selected
9. "You can change language anytime in settings" — 12px, opacity 0.5

### SCREEN 1: INTRO ANIMATION (3 Steps)
Step 1: "Ask anything" — typing animation + floating topic pills (#D4A574 bg, drifting)
Step 2: "Learn your way" — module cards slide in + language chips float up
Step 3: "Sabi everything" — SVG checkmark draws itself + "Start Learning" button pulses

### SCREEN 2: HOME / TOPIC PICKER
Header: Hamburger (≡) | "Askilla" wordmark | Language pill ("Pidgin ▼", #D4A574 bg)

Hero:
- "Wetin you wan learn?" — 28px, Plus Jakarta Sans, floating animation
- Search input: #FFFFFF bg, 999px radius,  left,  right (#D4A574), focus glow

Trending topics: Horizontal scroll of pills — "WAEC Math" | "JAMB English" | "Excel Basics" | "Business Writing" | "Data Analysis" — all #D4A574 bg

Recent learning card: "Excel Basics — 3 of 5 modules sabi'd" — #FFFFFF bg, mini progress bar (#D4A574 fill)

Bottom nav:  Home (#D4A574 active) |  My Learning |  Practice | ️ Settings

Footer: "3MTT Knowledge Showcase 2.0" — 10px, opacity 0.4

### SCREEN 3: MODULE / QUESTION (The Core Screen)
Header: ← Back | "Excel Basics" | "3/5" progress

Progress bar: Full-width, 8px height, #E0E0E0 bg, #D4A574 fill

Content:
1. Uncle Sabi avatar (40px, warm illustration) + speech bubble (#FFFFFF bg, 16px radius): "Let's learn about SUM formulas today..."
2. Explanation card (#FFFFFF bg, 16px radius):
   - Title: "Wetin Be SUM Formula?" — 20px, Plus Jakarta Sans
   - Text: "SUM formula na function wey go add all the numbers..." — 16px, **bold** English terms
   - Native equivalents faint: "SUM = Àfikún (Yoruba) | Ƙara (Hausa) | Mgbakwunye (Igbo)" — 12px, opacity 0.5
   - Source citation: "— Source: Microsoft Excel Documentation" — 11px, opacity 0.35
3. Visual: Stock photo or SVG diagram (#D4A574 stroke, #F5F5F0 fill)
4. Audio button: "▶️ Listen to Uncle Sabi" — pill, #D4A574 border, tap to play
5. Question card (#FFFFFF bg, 16px radius):
   - "Try am now " — 14px, opacity 0.7
   - Question: "If cell A1 = 10, A2 = 20, A3 = 30. Wetin =SUM(A1:A3) go give you?" — 18px
6. Answer options: Four large tap targets, #FFFFFF bg, 16px radius, 1px #E0E0E0 border, selected: #D4A574 bg
7. Voice answer: " Or speak your answer" — pill, #D4A574 border, listening state: pulsing dot
8. Submit: "Submit Answer →" — full-width, 56px height, 999px radius, #D4A574 bg, disabled until selected

### SCREEN 4: FEEDBACK STATES
Correct: Checkmark pops in + "You sabi! " — 24px + Uncle Sabi message + "Continue →" button + confetti particles (#D4A574 circles)

Wrong (first): Gentle shake + Uncle Sabi hint + "Try Again ↺" button

Wrong (second): Detailed explanation + "Try Again ↺" + "Show Answer ️" option

### SCREEN 5: PROGRESS / DONE
Circular progress ring (200px, #E0E0E0 bg stroke, #D4A574 fill stroke, animated draw, "3/5" center)

Completed list: " Introduction to Excel" | " SUM and AVERAGE" | " COUNT and MAX" | " Charts and graphs"

Shareable card (#FFFFFF bg, 2px #D4A574 dashed border): "I Sabi Excel Basics Now! " + "Share your win " button

Next: "Wetin you wan learn next? " — pills: "Excel Advanced" | "Google Sheets" | "Budgeting"

### SCREEN 6: UNCLE SABI MASCOT
Warm, friendly Nigerian uncle figure. Soft round face, kind eyes, slight smile. Simple traditional attire. Flat illustration style. Warm browns harmonizing with #D4A574.

Appearances: 40px avatar (module view) | 80px (feedback) | 120px (celebration)

### SCREEN 7: SETTINGS
"Settings ️" — 24px

Language: "Your Learning Language " — current highlighted, others as #FFFFFF cards

Toggles: Notifications  | Voice Feedback  | Dark Mode 

About: Links to 3MTT info

---

## COMPONENT LIBRARY

Buttons:
- Primary: #D4A574 bg, #2D2D2D text, 999px radius, 56px height
- Secondary: #F5F5F0 bg, #D4A574 border, #2D2D2D text, 999px radius
- Pill/Chip: #D4A574 bg, #2D2D2D text, 999px radius, 32px height
- Icon: 48px circle, #D4A574 bg or border

Cards:
- Content: #FFFFFF bg, 16px radius, subtle shadow
- Explanation: #FFFFFF bg, 16px radius, left border 4px #D4A574
- Question: #FFFFFF bg, 16px radius, 1px #E0E0E0 border
- Feedback: #FFFFFF bg, 16px radius, subtle shadow

Inputs:
- Text: #FFFFFF bg, 16px radius, 1px #E0E0E0 border, focus: #D4A574 border
- Search: Text input +  left +  right
- Select/Pill: 999px radius, #D4A574 border or bg

Feedback:
- Correct Badge: "You sabi!" — #D4A574 bg pill, pops in with bounce
- Encouragement Bubble: Uncle Sabi avatar + speech bubble, slides up
- Progress Ring: SVG circle, #D4A574 stroke, animated
- Source Citation: 11px, #2D2D2D, opacity 0.35

---

MOOD: Warm, cozy, like sitting with a patient uncle who believes in you. Educational but never school-like. Friendly but never childish. For everyone who wants to learn — from WAEC to business skills, from Pidgin to Igbo.

CRITICAL: Only three colors. #F5F5F0 (background), #2D2D2D (text), #D4A574 (action). No exceptions. Warm and cozy throughout.
```

---

## 20. MONETIZATION (Pitch Only, Not Built)

| Tier | Price | Features |
|------|-------|----------|
| **Askilla Free** | ₦0 | 2 modules/day, text only, basic feedback |
| **Askilla Plus** | ₦500/month (~$0.30) | Unlimited modules, voice tutor, full progress tracking |
| **Askilla Family** | ₦1,500/month | Up to 5 users, parent dashboard, shared courses |
| **Askilla Pro** | ₦3,000/month | Work skills, certificate generation, priority support |
| **Askilla School** | ₦50,000/term | Institution license, teacher dashboard, analytics |

**Payment:** Airtime, USSD, mobile money.

---

## 21. DATASET VALUE (For Judges)

Every question attempt produces:
- What topic confused them
- Their language
- Their level (secondary, uni, working adult)
- Wrong answer pattern
- What feedback worked
- Time to correct

**"We're building the first dataset of how Nigerians learn across languages, levels, and topics — from WAEC math to business skills. What works. What doesn't. How to teach better."**

---

## 22. PITCH (3 Minutes)

**Hook (15s):**
> *"Every year, 1.5 million Nigerian students sit WAEC, NECO, JAMB. But learning doesn't stop there. Uni students need Excel and data analysis. Working adults want business writing and negotiation. And everyone — from 17 to 62 — faces the same problem: when they get stuck, nobody is there to say 'you're close, let's try again.'"*

**Problem (30s):**
> *"Tutorial centers cost ₦5,000–₦20,000/month. Online courses are expensive, generic, and English-only. YouTube videos don't answer YOUR specific confusion. And when you get it wrong — red X, confusion, give up."*

**Solution (30s):**
> *"Askilla is an AI tutor that speaks your language. Ask anything — 'quadratic equations,' 'Excel basics,' 'how to write a business proposal.' The AI builds a personalized course in 30 seconds. Asks questions. And when you get it wrong — explains patiently, in your language, until you get it. Never a red X. Always 'you're close, let's think about it differently.'"*

**Demo (60s):**
> *[Live demo: type "Excel basics" → select Pidgin → answer wrong → get encouraging explanation → retry → correct → "You sabi!" → shareable card with source citation]*

**Why Education (30s):**
> *"This is not content consumption. This is active learning with a patient tutor. Every wrong answer is a teaching moment. We track what works across languages, levels, and topics — building the first dataset of how Nigerians actually learn. Ask anything. Sabi everything."*

**Ask (15s):**
> *"We need your support to make Askilla the tutor every Nigerian deserves — one who speaks their language, never shames them, and helps them learn anything. Ask anything. Sabi everything."*

---

## 23. COMPETITIVE MOAT

| Competitor | What they do | Why Askilla wins |
|------------|--------------|-------------------|
| Oboe | AI courses, English-only, $15/month | Speaks Nigerian languages, ₦500/month, any topic |
| Coursera | Pre-recorded, English-only, expensive | On-demand, local language, interactive feedback |
| YouTube | Passive videos, no feedback | Active learning, instant feedback, personalized |
| Tutorial centers | Expensive, city-bound, one-size-fits-all | Affordable, anywhere, any topic, personalized |
| Past question books | Answers but no explanation | Explains why wrong, retries until correct |
| uLesson | Pre-recorded, limited interaction | AI-generated on demand, conversational feedback |

---

## APPENDIX: Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| State | Zustand |
| PWA | Next-PWA Plugin |
| Voice (Client) | Web SpeechRecognition + SpeechSynthesis API |
| Voice (Next Phase) | OpenAI Whisper (fine-tuned for Nigerian accents) |
| AI/LLM | OpenAI GPT-4o |
| Image API | Unsplash API (free tier) |
| Diagram Fallback | AI-generated SVG/text-based diagrams |
| Database | Neon (Serverless Postgres) |
| ORM | Prisma |
| Auth | Phone number, no OTP (simple JWT) |
| Deploy | Vercel |

---

## NEXT PHASE ROADMAP (Post-Hackathon)

| Feature | Timeline | Pitch Line |
|---------|----------|------------|
| Real OTP/SMS auth | Month 1 | *"OTP verification for security"* |
| Whisper STT | Month 2 | *"Fine-tuned speech recognition for Nigerian accents"* |
| Paystack billing | Month 2 | *"Monetization: ₦100 per module or ₦500/month unlimited"* |
| Full PWA offline | Month 3 | *"Offline mode for students without data"* |
| Clickable source links | Month 3 | *"Clickable citations to full resources"* |
| Custom image generation | Month 4 | *"AI-generated diagrams for technical topics"* |
| More languages | Month 4 | *"Expand to Fulfulde, Tiv, Ibibio, and more"* |

---

## FOOTER (Every Screen)

**"3MTT Knowledge Showcase 2.0"**
- Small, subtle, bottom of every screen
- Links to 3MTT initiative
- Shows this is part of a larger mission

---

*Ask anything. Sabi everything.*
