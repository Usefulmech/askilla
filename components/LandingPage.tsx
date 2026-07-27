"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Sparkles, GraduationCap, Globe, Code2 } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { UncleSabiMascot } from "./UncleSabiMascot";
import { AboutModal } from "./AboutModal";

interface DemoLesson {
  level: "Beginner (Pidgin)" | "Intermediate" | "Expert";
  topic: string;
  badge: string;
  excerpt: string;
  mathFormula?: string;
  explanation: string;
}

const demoLessons: DemoLesson[] = [
  {
    level: "Beginner (Pidgin)",
    topic: "Excel Formulas",
    badge: "Intro to spreadsheets",
    excerpt: "Uncle Sabi break Excel down so you go fit clean data and arrange money files.",
    mathFormula: "SUM(A1:A10)",
    explanation: "Excel formula na instruction wey you dey give spreadsheet make e do math for you. If you put **=SUM(A1:A10)**, e go calculate all the numbers inside those cells automatically. Na so you go save time instead of using manual calculator!",
  },
  {
    level: "Intermediate",
    topic: "Quadratic Equations",
    badge: "WAEC & JAMB Math",
    excerpt: "Understand second-degree polynomial equations and their curves step-by-step.",
    mathFormula: "ax^2 + bx + c = 0",
    explanation: "A quadratic equation is a second-order polynomial. We solve it using the quadratic formula: \\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\). This formula lets us find the points where the curve touches the ground axis.",
  },
  {
    level: "Expert",
    topic: "Data Structures",
    badge: "Computer Science 301",
    excerpt: "Deep dive into binary search algorithms and time complexity analysis.",
    mathFormula: "O(\\log n)",
    explanation: "Binary search works by repeatedly dividing in half the portion of the list that could contain the item. This reduces the search space logarithmically, giving an optimal time complexity of \\( O(\\log n) \\) compared to linear search.",
  },
];

export const LandingPage: React.FC = () => {
  const { setScreen, user } = useAskillaStore();
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleStartLearning = () => {
    if (user.name) {
      setScreen("home");
    } else {
      setScreen("onboarding");
    }
  };

  // Auto-rotate levels demo every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLevelIdx((prev) => (prev + 1) % demoLessons.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeLesson = demoLessons[activeLevelIdx];

  // Quick math & markdown formatter helper for landing page demo
  const renderDemoMath = (formula: string) => {
    if (!formula) return null;
    let clean = formula;
    clean = clean.replace(/\\frac{([^}]+)}{([^}]+)}/g, '<span class="inline-flex flex-col align-middle text-center text-xs mx-0.5"><span class="border-b border-current pb-0.5">$1</span><span class="pt-0.5">$2</span></span>');
    clean = clean.replace(/\\pm/g, "±").replace(/\\sqrt{([^}]+)}/g, '<span class="font-sans mr-0.5">√</span><span class="border-t border-current px-0.5">$1</span>');
    clean = clean.replace(/\\log/g, "log").replace(/\\/g, "");
    return <span dangerouslySetInnerHTML={{ __html: clean }} />;
  };

  const renderDemoText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\\\([\s\S]*?\\\))|(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith("\\(") && part.endsWith("\\)")) {
        return (
          <span key={i} className="font-serif italic mx-0.5 px-1 bg-[#FAFAD5]/60 dark:bg-[#2D2D15]/40 rounded text-[#2D2D2D] dark:text-[#EAEAEA]">
            {renderDemoMath(part.slice(2, -2).trim())}
          </span>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-extrabold text-[#2D2D2D] dark:text-[#FFFFFF] bg-[#BA7A3B]/20 dark:bg-[#BA7A3B]/30 px-1 rounded-md">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#2D2D2D] dark:text-[#EAEAEA] transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">
      {/* Fixed Upper Header Navbar (Stays pinned at top when scrolling) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-16 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 backdrop-blur-md transition-colors">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Askilla Brand Icon Logo */}
          <img
            src="/icon.svg"
            alt="Askilla Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-sm border border-[#BA7A3B]/40 shrink-0"
          />
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#2D2D2D] dark:text-[#EAEAEA]">
            Askilla
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="px-3 sm:px-4 py-1.5 sm:py-2.5 bg-white dark:bg-[#1E1E1E] text-[#2D2D2D] dark:text-[#EAEAEA] border border-[#E0E0E0] dark:border-[#2D2D2D] font-heading font-extrabold text-[11px] sm:text-sm rounded-full hover:border-[#BA7A3B] active:scale-95 transition-all shadow-sm whitespace-nowrap"
          >
            About
          </button>
          <button
            type="button"
            onClick={handleStartLearning}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2.5 bg-[#BA7A3B] text-[#2D2D2D] font-heading font-extrabold text-[11px] sm:text-sm rounded-full hover:bg-[#A66A30] active:scale-95 transition-all shadow-sm flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-32 pb-12 space-y-12 sm:space-y-16 flex-1 text-center">
        
        {/* Winning 2-Column Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 w-full items-center text-left pt-0 md:pt-1">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <motion.h2 
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#2D2D2D] dark:text-[#EAEAEA] leading-[1.25] sm:leading-[1.28] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ask Anything.
              <span className="block mt-1.5 sm:mt-2.5 bg-gradient-to-r from-[#BA7A3B] via-[#A66A30] to-[#8E5724] bg-clip-text text-transparent">
                Sabi Everything.
              </span>
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#2D2D2D]/75 dark:text-[#EAEAEA]/75 font-sans leading-relaxed font-medium max-w-xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ask questions, explore course tracks, and learn at your own speed with Askilla. Uncle Sabi breaks down difficult subjects step-by-step using plain Standard English or authentic Nigerian Pidgin, helping you build real understanding without feeling overwhelmed.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-3 items-start justify-start w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                type="button"
                onClick={handleStartLearning}
                className="py-2.5 px-5 sm:py-3.5 sm:px-7 bg-gradient-to-r from-[#BA7A3B] to-[#A66A30] text-[#2D2D2D] font-heading font-extrabold text-xs sm:text-base rounded-full shadow-md hover:shadow-lg hover:from-[#A66A30] hover:to-[#8E5724] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 ring-2 sm:ring-4 ring-[#BA7A3B]/20 max-w-full"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Expanded & Enlarged Uncle Sabi Mascot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] bg-gradient-to-tr from-[#FAFAD5]/60 via-[#BA7A3B]/25 to-[#FAFAD5]/40 dark:from-[#2D2D15]/50 dark:to-[#BA7A3B]/25 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-[#BA7A3B]/40 p-2.5 sm:p-4"
            >
              {/* Floating Speech Bubble */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-7 -right-1 sm:-right-2 bg-white dark:bg-[#1E1E1E] border-2 border-[#BA7A3B]/40 p-3 sm:p-4 rounded-3xl shadow-xl max-w-[200px] sm:max-w-[240px] text-left text-[11px] sm:text-xs font-medium font-sans leading-snug z-20"
              >
                <span className="text-[#BA7A3B] font-extrabold block text-[9px] uppercase tracking-widest mb-0.5">Uncle Sabi say:</span>
                &quot;Bring any hard topic come, I go break am down for you step-by-step!&quot;
              </motion.div>

              {/* Expanded Mascot Image fitting external circle */}
              <div className="w-[84%] h-[84%] rounded-full overflow-hidden border-4 border-[#BA7A3B]/40 shadow-inner bg-white dark:bg-[#1E1E1E] flex items-center justify-center relative">
                <motion.img
                  src="/uncle_sabi.png"
                  alt="Uncle Sabi Mascot"
                  className="w-full h-full object-cover scale-110"
                  animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Floating Live AI RAG Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-2 left-1 sm:left-2 bg-[#FAFAD5] dark:bg-[#2D2D15] border-2 border-[#BA7A3B] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md text-[9px] sm:text-[10px] font-extrabold text-[#2D2D2D] dark:text-[#EAEAEA] flex items-center gap-1.5 sm:gap-2 uppercase tracking-wider z-20"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BA7A3B] animate-pulse" />
                <span>100% Real-Time AI Engine</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Learning Levels Showcase Animation */}
        <section className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
          <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
            <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-[#2D2D2D] dark:text-[#EAEAEA]">
              Experience Learning at Any Level
            </h3>
            <p className="text-[11px] sm:text-sm font-sans text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60">
              Select a depth profile to preview how Uncle Sabi formats micro-lessons.
            </p>
          </div>

          {/* Level Switcher Tabs */}
          <div className="inline-flex p-1 sm:p-1.5 bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-full shadow-sm gap-1 max-w-full overflow-x-auto">
            {demoLessons.map((lesson, idx) => {
              const active = idx === activeLevelIdx;
              return (
                <button
                  key={lesson.level}
                  type="button"
                  onClick={() => setActiveLevelIdx(idx)}
                  className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-heading font-extrabold transition-all duration-200 whitespace-nowrap ${
                    active
                      ? "bg-[#BA7A3B] text-[#2D2D2D] shadow-sm"
                      : "text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 hover:text-[#2D2D2D] dark:hover:text-[#EAEAEA]"
                  }`}
                >
                  {lesson.level}
                </button>
              );
            })}
          </div>

          {/* Interactive Lesson Card Preview */}
          <div className="max-w-3xl mx-auto pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson.level}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#FAFAD5] dark:bg-[#2D2D15] border-l border-b border-[#E0E0E0]/40 dark:border-[#2D2D2D]/40 px-4 py-2 rounded-bl-2xl text-[9px] font-extrabold uppercase tracking-widest text-[#BA7A3B]">
                  Interactive Preview
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#BA7A3B] uppercase block">
                    {activeLesson.badge}
                  </span>
                  <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-[#2D2D2D] dark:text-[#EAEAEA]">
                    Topic: {activeLesson.topic}
                  </h4>
                </div>

                {activeLesson.mathFormula && (
                  <div className="w-full py-4 px-6 rounded-2xl bg-[#FAFAD5]/30 dark:bg-[#2D2D15]/10 border border-[#BA7A3B]/20 text-center font-serif text-base sm:text-lg whitespace-nowrap shadow-inner text-[#2D2D2D] dark:text-[#EAEAEA] tracking-wide">
                    {renderDemoMath(activeLesson.mathFormula)}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pb-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2D2D2D]/55 dark:text-[#EAEAEA]/55">
                      Uncle Sabi Explanation
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-sans font-medium text-[#2D2D2D]/90 dark:text-[#EAEAEA]/90 whitespace-pre-line">
                    {renderDemoText(activeLesson.explanation)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-6">
          <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-[#2D2D2D] space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#BA7A3B]/15 dark:bg-[#BA7A3B]/20 flex items-center justify-center text-[#BA7A3B]">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#2D2D2D] dark:text-[#EAEAEA]">Bilingual Support</h4>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans font-medium leading-relaxed">
              Toggle naturally between standard English and authentic Nigerian Pidgin. We enforce strict linguistic isolation depending on your settings.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-[#2D2D2D] space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#BA7A3B]/15 dark:bg-[#BA7A3B]/20 flex items-center justify-center text-[#BA7A3B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#2D2D2D] dark:text-[#EAEAEA]">Intelligent Topic Inference</h4>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans font-medium leading-relaxed">
              Don't worry about typos or long sentences. Our engine corrects spelling (e.g. "exel" to "Excel") and extracts clean course topics automatically.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-[#2D2D2D] space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#BA7A3B]/15 dark:bg-[#BA7A3B]/20 flex items-center justify-center text-[#BA7A3B]">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#2D2D2D] dark:text-[#EAEAEA]">Professional LaTeX Equations</h4>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans font-medium leading-relaxed">
              Render advanced math, physics, or algorithmic notations in clean HTML. Complete with vertical fractions, square roots, integrals, and Greek letters.
            </p>
          </div>
        </section>
        
      </main>

      {/* Landing page footer */}
      <footer className="w-full px-6 md:px-16 py-6 border-t border-[#E0E0E0]/20 dark:border-[#2D2D2D]/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 text-center sm:text-left font-sans font-medium">
        <span>Askilla AI Tutor — Built for 3MTT Knowledge Showcase 2.0</span>
        <span>Standard English &amp; Nigerian Pidgin Learning Engine</span>
      </footer>

      {/* About Askilla Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};
