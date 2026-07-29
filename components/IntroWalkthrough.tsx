"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { Check, ArrowRight, SkipForward } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Ask anything",
    subtext: "Type or speak any subject, exam topic, or practical work skill.",
    pills: ["Excel Basics", "WAEC Math", "Business Writing", "Data Analysis", "JAMB English"],
  },
  {
    step: 2,
    title: "Learn your way",
    subtext: "In your preferred language. At your pace. Learn in Pidgin or Standard English.",
    chips: ["Pidgin", "English"],
  },
  {
    step: 3,
    title: "Sabi everything",
    subtext: "Wrong answers? Uncle Sabi explains patiently. Never a red X. Always growth.",
  },
];

export const IntroWalkthrough: React.FC = () => {
  const { setScreen } = useAskillaStore();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setScreen("home");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex flex-col items-center justify-between p-6 text-[#1C1917] dark:text-[#F5F5F4] relative overflow-hidden transition-colors duration-200">
      {/* Top Header / Skip Button */}
      <div className="w-full max-w-md flex justify-between items-center pt-4">
        <span className="font-heading font-extrabold text-xl text-[#1C1917] dark:text-[#F5F5F4]">Askilla</span>
        <button
          type="button"
          onClick={() => setScreen("home")}
          className="text-sm font-bold text-[#1C1917]/70 dark:text-[#F5F5F4]/70 hover:text-[#1C1917] dark:hover:text-[#F5F5F4] px-5 py-2.5 rounded-full border-2 border-[#E0E0E0] dark:border-white/10 hover:border-[#C25B32] transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Skip</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Main Slide Card Container */}
      <div className="w-full max-w-md my-auto flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E0E0E0] dark:border-white/10 space-y-6"
          >
            {/* Animated Step Visual */}
            {currentStep === 0 && (
              <div className="space-y-4 py-2">
                <h2 className="font-heading font-extrabold text-3xl text-[#1C1917] dark:text-[#F5F5F4] border-r-4 border-[#C25B32] inline-block pr-2.5">
                  Ask anything
                </h2>
                <p className="text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans leading-relaxed px-2">
                  {steps[0].subtext}
                </p>

                {/* Floating Pills */}
                <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-sm mx-auto">
                  {steps[0].pills?.map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-2 bg-[#C25B32] text-[#1C1917] text-xs sm:text-sm font-extrabold rounded-full shadow-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 py-2">
                <h2 className="font-heading font-extrabold text-3xl text-[#1C1917] dark:text-[#F5F5F4]">
                  Learn your way
                </h2>
                <p className="text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans leading-relaxed px-2">
                  {steps[1].subtext}
                </p>

                {/* Language Chips */}
                <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-sm mx-auto">
                  {steps[1].chips?.map((chip) => (
                    <span
                      key={chip}
                      className="px-3.5 py-2 border-2 border-[#C25B32] dark:border-[#94401F] bg-[#FDEEE9]/50 dark:bg-[#2D1F1A]/35 text-[#1C1917] dark:text-[#F5F5F4] text-xs sm:text-sm font-extrabold rounded-full"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 py-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#FDEEE9] dark:bg-[#2D1F1A] border-3 border-[#C25B32] dark:border-[#94401F] rounded-full flex items-center justify-center shadow-sm mb-2 animate-pulse">
                  <Check className="w-10 h-10 text-[#1C1917] dark:text-[#F5F5F4]" />
                </div>
                <h2 className="font-heading font-extrabold text-3xl text-[#1C1917] dark:text-[#F5F5F4]">
                  Sabi everything
                </h2>
                <p className="text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans leading-relaxed px-2">
                  {steps[2].subtext}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex gap-2.5 mt-8">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentStep === idx ? "w-10 bg-[#C25B32]" : "w-2.5 bg-[#E0E0E0] dark:bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full max-w-md pb-6 flex justify-center">
        <button
          type="button"
          onClick={handleNext}
          className="w-full sm:w-auto sm:px-12 py-3.5 px-6 bg-[#C25B32] text-white font-heading font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:bg-[#94401F] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-3"
        >
          <span>{currentStep === steps.length - 1 ? "Start Sabi Now" : "Continue"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
