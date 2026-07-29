"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Sparkles, GraduationCap, Globe, Code2 } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import Image from "next/image";
import { UncleSabiMascot } from "./UncleSabiMascot";
import { AboutModal } from "./AboutModal";
import LogoIcon from './LogoIcon';

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
          <span key={i} className="font-serif italic mx-0.5 px-1 bg-[#FDEEE9]/60 dark:bg-[#2D1F1A]/40 rounded text-[#1C1917] dark:text-[#F5F5F4]">
            {renderDemoMath(part.slice(2, -2).trim())}
          </span>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-extrabold text-[#1C1917] dark:text-[#FFFFFF] bg-[#C25B32]/20 dark:bg-[#C25B32]/30 px-1 rounded-md">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#1C1917] dark:text-[#F5F5F4] transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">
      {/* Fixed Upper Header Navbar (Stays pinned at top when scrolling) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-16 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-white/5 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 backdrop-blur-md transition-colors">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Askilla Brand Icon Logo */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 relative -[#C25B32]/40 shrink-0">
            <LogoIcon className="w-full h-full text-[#1C1917] dark:text-[#F5F5F4]" />
          </div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#1C1917] dark:text-[#F5F5F4]">
            Askilla
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="px-3 sm:px-4 py-1.5 sm:py-2.5 bg-white dark:bg-[#1E1E1E] text-[#1C1917] dark:text-[#F5F5F4] border border-[#E0E0E0] dark:border-white/10 font-heading font-extrabold text-[11px] sm:text-sm rounded-full hover:border-[#C25B32] active:scale-95 transition-all shadow-sm whitespace-nowrap"
          >
            About
          </button>
          <button
            type="button"
            onClick={handleStartLearning}
            className="px-5 sm:px-7 py-2 sm:py-2.5 bg-gradient-to-r from-[#C25B32] to-[#A94A26] text-white font-heading font-extrabold text-[11px] sm:text-sm rounded-full hover:shadow-lg hover:from-[#A94A26] hover:to-[#94401F] active:scale-95 transition-all shadow-md flex items-center justify-center whitespace-nowrap shrink-0 ring-2 ring-transparent hover:ring-[#C25B32]/30"
          >
            Start Learning
          </button>
        </div>
      </header>

      {/* Real Education Banner Background (Nigerian Context) */}
      <div className="absolute top-0 left-0 w-full h-[600px] sm:h-[800px] z-0 pointer-events-none overflow-hidden">
        {/* Smooth fading blur at the top for maximum text legibility */}
        <div 
          className="absolute inset-0 z-[15] backdrop-blur-md"
          style={{ 
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)' 
          }}
        />
        {/* Softer color overlay to let the image pop more */}
        <div className="absolute inset-0 bg-[#F5F5F0]/65 dark:bg-[#121212]/75 z-10 mix-blend-normal" />
        {/* Gradient fade out at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F5F0] dark:to-[#121212] z-20" />
        <img 
          src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=2000&q=80" 
          alt="Minimalist study desk with notebook and pens" 
          className="w-full h-full object-cover object-center opacity-80 dark:opacity-70"
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 pb-12 space-y-8 sm:space-y-10 flex-1 text-center">
        
        {/* Winning 2-Column Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 w-full items-center text-left pt-0 md:pt-1">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <motion.h2 
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.25] sm:leading-[1.28] tracking-tight drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-[#1C1917] dark:text-white">Ask</span> <span className="text-white">Anything.</span>
              <span className="block mt-1.5 sm:mt-2.5 pb-2 drop-shadow-md">
                <span className="text-white">Sabi</span> <span className="text-[#1C1917] dark:text-white">Everything.</span>
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-[#1C1917]/800 dark:text-[#F5F5F4]/80 font-sans leading-tight font-medium max-w-xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Learn any topic step-by-step in English or Pidgin with Uncle Sabi.
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
                className="py-3 px-8 sm:py-4 sm:px-10 bg-gradient-to-r from-[#C25B32] to-[#A94A26] text-white font-heading font-extrabold text-sm sm:text-lg rounded-full shadow-lg hover:shadow-xl hover:from-[#A94A26] hover:to-[#94401F] active:scale-[0.98] transition-all inline-flex items-center justify-center ring-2 sm:ring-4 ring-transparent hover:ring-[#C25B32]/30 max-w-full"
              >
                Explore Now
              </button>
            </motion.div>
          </div>

          {/* Right Column: Expanded & Enlarged Uncle Sabi Mascot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] bg-gradient-to-tr from-[#FDEEE9]/60 via-[#C25B32]/25 to-[#FDEEE9]/40 dark:from-[#2D1F1A]/50 dark:to-[#C25B32]/25 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-[#C25B32]/40 p-2.5 sm:p-4"
            >
              {/* Floating Speech Bubble */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-7 -right-1 sm:-right-2 bg-white dark:bg-[#1E1E1E] border-2 border-[#C25B32]/40 p-3 sm:p-4 rounded-3xl shadow-xl max-w-[200px] sm:max-w-[240px] text-left text-[11px] sm:text-xs font-medium font-sans leading-snug z-20"
              >
                <span className="text-[#C25B32] font-extrabold block text-[9px] uppercase tracking-widest mb-0.5">Uncle Sabi say:</span>
                &quot;Bring any hard topic come, I go break am down for you step-by-step!&quot;
              </motion.div>

              {/* Expanded Mascot Image fitting external circle */}
              <div className="w-[84%] h-[84%] rounded-full overflow-hidden border-4 border-[#C25B32]/40 shadow-inner bg-white dark:bg-[#1E1E1E] flex items-center justify-center relative">
                <motion.div
                  className="w-full h-full scale-110 relative"
                  animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/uncle_sabi.png"
                    alt="Uncle Sabi Mascot"
                    fill
                    priority
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 350px, 420px"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Floating Live AI RAG Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-2 left-1 sm:left-2 bg-[#FDEEE9] dark:bg-[#2D1F1A] border-2 border-[#C25B32] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md text-[9px] sm:text-[10px] font-extrabold text-[#1C1917] dark:text-[#F5F5F4] flex items-center gap-1.5 sm:gap-2 uppercase tracking-wider z-20"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C25B32] animate-pulse" />
                <span>100% Real-Time AI Engine</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Learning Levels Showcase Animation */}
        <section className="space-y-4 sm:space-y-6 pt-2">
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] dark:text-[#F5F5F4]">
              Experience Learning at Any Level
            </h3>
            <p className="text-sm sm:text-base font-sans text-[#1C1917]/70 dark:text-[#F5F5F4]/70 max-w-2xl">
              Select a depth profile to preview how Uncle Sabi formats micro-lessons.
            </p>
          </div>

          {/* Level Switcher Tabs */}
          <div className="inline-flex p-1 sm:p-1.5 bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-white/10 rounded-full shadow-sm gap-1 max-w-full overflow-x-auto">
            {demoLessons.map((lesson, idx) => {
              const active = idx === activeLevelIdx;
              return (
                <button
                  key={lesson.level}
                  type="button"
                  onClick={() => setActiveLevelIdx(idx)}
                  className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-heading font-extrabold transition-all duration-200 whitespace-nowrap ${
                    active
                      ? "bg-[#C25B32] text-[#1C1917] shadow-sm"
                      : "text-[#1C1917]/60 dark:text-[#F5F5F4]/60 hover:text-[#1C1917] dark:hover:text-[#F5F5F4]"
                  }`}
                >
                  {lesson.level}
                </button>
              );
            })}
          </div>

          {/* Interactive Lesson Card Preview */}
          <div className="max-w-4xl mx-auto pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson.level}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-md space-y-6 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#FDEEE9] dark:bg-[#2D1F1A] border-l border-b border-[#E0E0E0]/40 dark:border-white/10/40 px-4 py-2 rounded-bl-2xl text-[9px] font-extrabold uppercase tracking-widest text-[#C25B32]">
                  Interactive Preview
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#C25B32] uppercase block">
                    {activeLesson.badge}
                  </span>
                  <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1C1917] dark:text-[#F5F5F4]">
                    Topic: {activeLesson.topic}
                  </h4>
                </div>

                {activeLesson.mathFormula && (
                  <div className="w-full py-4 px-6 rounded-2xl bg-[#FDEEE9]/30 dark:bg-[#2D1F1A]/10 border border-[#C25B32]/20 text-center font-serif text-base sm:text-lg whitespace-nowrap shadow-inner text-[#1C1917] dark:text-[#F5F5F4] tracking-wide">
                    {renderDemoMath(activeLesson.mathFormula)}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-white/5 pb-2 sm:pb-3">
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#1C1917]/55 dark:text-[#F5F5F4]/55">
                      Uncle Sabi Explanation
                    </span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed font-sans font-medium text-[#1C1917]/90 dark:text-[#F5F5F4]/90 whitespace-pre-line">
                    {renderDemoText(activeLesson.explanation)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-white/10 space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#C25B32]/15 dark:bg-[#C25B32]/20 flex items-center justify-center text-[#C25B32]">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#1C1917] dark:text-[#F5F5F4]">Bilingual Support</h4>
            <p className="text-xs sm:text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans font-medium leading-relaxed">
              Toggle naturally between standard English and authentic Nigerian Pidgin. We enforce strict linguistic isolation depending on your settings.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-white/10 space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#C25B32]/15 dark:bg-[#C25B32]/20 flex items-center justify-center text-[#C25B32]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#1C1917] dark:text-[#F5F5F4]">Intelligent Topic Inference</h4>
            <p className="text-xs sm:text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans font-medium leading-relaxed">
              Don't worry about typos or long sentences. Our engine corrects spelling (e.g. "exel" to "Excel") and extracts clean course topics automatically.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-white/10 space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#C25B32]/15 dark:bg-[#C25B32]/20 flex items-center justify-center text-[#C25B32]">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#1C1917] dark:text-[#F5F5F4]">Professional LaTeX Equations</h4>
            <p className="text-xs sm:text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans font-medium leading-relaxed">
              Render advanced math, physics, or algorithmic notations in clean HTML. Complete with vertical fractions, square roots, integrals, and Greek letters.
            </p>
          </div>
        </section>
        
      </main>

      {/* Landing page footer */}
      <footer className="w-full px-6 md:px-16 py-6 border-t border-[#E0E0E0]/20 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60 text-center sm:text-left font-sans font-medium">
        <span>Askilla AI Tutor — Built for 3MTT Knowledge Showcase 2.0</span>
        <span>Standard English &amp; Nigerian Pidgin Learning Engine</span>
      </footer>

      {/* About Askilla Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};
