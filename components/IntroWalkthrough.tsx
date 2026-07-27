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
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex flex-col items-center justify-between p-6 text-[#2D2D2D] dark:text-[#EAEAEA] relative overflow-hidden transition-colors duration-200">
      {/* Top Header / Skip Button */}
      <div className="w-full max-w-md flex justify-between items-center pt-4">
        <span className="font-heading font-extrabold text-xl text-[#2D2D2D] dark:text-[#EAEAEA]">Askilla</span>
        <button
          type="button"
          onClick={() => setScreen("home")}
          className="text-sm font-bold text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 hover:text-[#2D2D2D] dark:hover:text-[#EAEAEA] px-5 py-2.5 rounded-full border-2 border-[#E0E0E0] dark:border-[#2D2D2D] hover:border-[#BA7A3B] transition-all active:scale-95 flex items-center gap-2"
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
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E0E0E0] dark:border-[#2D2D2D] space-y-6"
          >
            {/* Animated Step Visual */}
            {currentStep === 0 && (
              <div className="space-y-4 py-2">
                <h2 className="font-heading font-extrabold text-3xl text-[#2D2D2D] dark:text-[#EAEAEA] border-r-4 border-[#BA7A3B] inline-block pr-2.5">
                  Ask anything
                </h2>
                <p className="text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans leading-relaxed px-2">
                  {steps[0].subtext}
                </p>

                {/* Floating Pills */}
                <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-sm mx-auto">
                  {steps[0].pills?.map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-2 bg-[#BA7A3B] text-[#2D2D2D] text-xs sm:text-sm font-extrabold rounded-full shadow-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 py-2">
                <h2 className="font-heading font-extrabold text-3xl text-[#2D2D2D] dark:text-[#EAEAEA]">
                  Learn your way
                </h2>
                <p className="text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans leading-relaxed px-2">
                  {steps[1].subtext}
                </p>

                {/* Language Chips */}
                <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-sm mx-auto">
                  {steps[1].chips?.map((chip) => (
                    <span
                      key={chip}
                      className="px-3.5 py-2 border-2 border-[#BA7A3B] dark:border-[#8E5724] bg-[#FAFAD5]/50 dark:bg-[#2D2D15]/35 text-[#2D2D2D] dark:text-[#EAEAEA] text-xs sm:text-sm font-extrabold rounded-full"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 py-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#FAFAD5] dark:bg-[#2D2D15] border-3 border-[#BA7A3B] dark:border-[#8E5724] rounded-full flex items-center justify-center shadow-sm mb-2 animate-pulse">
                  <Check className="w-10 h-10 text-[#2D2D2D] dark:text-[#EAEAEA]" />
                </div>
                <h2 className="font-heading font-extrabold text-3xl text-[#2D2D2D] dark:text-[#EAEAEA]">
                  Sabi everything
                </h2>
                <p className="text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans leading-relaxed px-2">
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
                currentStep === idx ? "w-10 bg-[#BA7A3B]" : "w-2.5 bg-[#E0E0E0] dark:bg-[#2D2D2D]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full max-w-md pb-6">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3.5 px-6 bg-[#BA7A3B] text-[#2D2D2D] font-heading font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:bg-[#A66A30] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-3"
        >
          <span>{currentStep === steps.length - 1 ? "Start Sabi Now" : "Continue"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
