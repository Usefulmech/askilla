"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";

function ShareContent() {
  const searchParams = useSearchParams();
  const learner = searchParams?.get("learner") ?? searchParams?.get("name") ?? "";
  const topic = searchParams?.get("topic") ?? "Excel Basics";
  const completed = searchParams?.get("completed") ?? "3";
  const total = searchParams?.get("total") ?? "5";
  const lang = searchParams?.get("lang") ?? "pidgin";

  const getLanguageLabel = (l: string) => {
    switch (l.toLowerCase()) {
      case "pidgin": return "Pidgin";
      case "yoruba": return "Yorùbá";
      case "hausa": return "Hausa";
      case "igbo": return "Igbo";
      default: return "English";
    }
  };

  const getSabiText = (l: string) => {
    switch (l.toLowerCase()) {
      case "pidgin": return "I Sabi Dis Topic Well Well!";
      case "yoruba": return "Mo ti mọ̀ ọ́n dunjú!";
      case "hausa": return "Na san wannan sosai!";
      case "igbo": return "A ghọtawo m ya nke ọma!";
      default: return "I Have Mastered This Topic!";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex flex-col items-center justify-center p-4 sm:p-8 text-[#1C1917] dark:text-[#F5F5F4] transition-colors duration-200">
      <motion.div
        className="w-full max-w-xl bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#E0E0E0] dark:border-[#1C1917] text-center space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Certificate Accent Border */}
        <div className="absolute inset-2 border border-dashed border-[#C25B32]/40 rounded-2xl pointer-events-none" />

        {/* Certificate Badge */}
        <div className="relative inline-block my-2 z-10">
          <div className="absolute -z-10 -top-2 -right-2 w-28 h-28 rounded-full bg-[#C25B32]/20 animate-pulse" />
          <div className="w-24 h-24 rounded-full border-4 border-[#1C1917] dark:border-[#C25B32]/40 bg-[#FDEEE9] dark:bg-[#2D1F1A] flex items-center justify-center overflow-hidden shadow-lg mx-auto">
            <Award className="w-12 h-12 text-[#C25B32]" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2 flex flex-col items-center">
          <img
            src="/icon.svg"
            alt="Askilla Logo"
            className="w-10 h-10 rounded-xl shadow-sm border border-[#C25B32]/40"
          />
          <span className="text-[10px] font-heading font-extrabold text-[#C25B32] tracking-widest uppercase">Askilla AI Tutor</span>
          <h2 className="font-heading font-extrabold text-3xl text-[#1C1917] dark:text-[#F5F5F4] tracking-tight">
            Sabi Certificate
          </h2>
        </div>

        {/* Certificate Statement */}
        <div className="space-y-4 py-2 border-y border-[#E0E0E0]/60 dark:border-[#1C1917]/60 relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#1C1917]/55 dark:text-[#F5F5F4]/55 font-extrabold">
            This is to show that {learner ? <span className="text-[#C25B32] font-black">{learner}</span> : "a smart learner"} completed
          </p>
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-2xl text-[#C25B32] leading-snug">
              {topic}
            </h3>
            <p className="text-sm font-semibold text-[#1C1917]/80 dark:text-[#F5F5F4]/80">
              Completed {completed} of {total} Learning Modules
            </p>
          </div>
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-full inline-block">
            Verified Natively in {getLanguageLabel(lang)} Mode
          </p>
        </div>

        {/* Sabi Quote bubble */}
        <div className="bg-[#FDEEE9] dark:bg-[#2D1F1A] p-5 rounded-2xl border border-[#C25B32]/40 text-left flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1C1C1C] border-2 border-[#C25B32] flex-shrink-0 flex items-center justify-center font-heading font-extrabold text-lg">
            US
          </div>
          <div>
            <span className="text-[9px] font-extrabold text-[#C25B32] uppercase tracking-wider block mb-0.5">Uncle Sabi says:</span>
            <p className="text-base font-heading font-extrabold text-[#1C1917] dark:text-[#F5F5F4]">
              &quot;{getSabiText(lang)}&quot;
            </p>
            <p className="text-xs text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans mt-1">
              Smart learning in local languages. No more complex book grammars.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-2 relative z-10">
          <a
            href="/"
            className="w-full py-4.5 px-8 bg-gradient-to-r from-[#C25B32] to-[#94401F] text-[#1C1917] font-heading font-extrabold text-base rounded-full shadow-lg hover:shadow-xl hover:from-[#94401F] hover:to-[#94401F] active:scale-[0.97] transition-all flex items-center justify-center gap-3 decoration-none"
          >
            <span>Learn with Askilla Today</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-[#1C1917]/50 dark:text-[#F5F5F4]/50">
        3MTT Showcase 2.0 • Powered by Askilla
      </footer>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex items-center justify-center">
        <span className="font-bold text-[#1C1917] dark:text-[#F5F5F4]">Loading Sabi Certificate...</span>
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}
