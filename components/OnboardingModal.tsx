"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, User, ChevronDown, Check, Globe } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { UncleSabiMascot } from "./UncleSabiMascot";
import { LearningLanguage } from "@/lib/types/askilla";

const languageOptions: { key: LearningLanguage; label: string }[] = [
  { key: "pidgin", label: "Pidgin" },
  { key: "english", label: "English" },
];

export const OnboardingModal: React.FC = () => {
  const { language, setLanguage, setUser, setScreen } = useAskillaStore();
  const [selectedLang, setSelectedLang] = useState<LearningLanguage>(language);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const [nameError, setNameError] = useState("");

  const handleStart = () => {
    if (!name.trim()) {
      setNameError("Please enter your name so Uncle Sabi can address you!");
      return;
    }
    setNameError("");
    const userPhone = phone.trim() ? phone.trim() : `guest_${Date.now()}`;
    setUser({
      id: userPhone,
      phone: userPhone,
      name: name.trim(),
      preferredLanguage: selectedLang,
    });
    setLanguage(selectedLang);
    setScreen("intro");
  };

  const selectedLabel = languageOptions.find((l) => l.key === selectedLang)?.label || "Pidgin";

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex flex-col items-center justify-center p-4 sm:p-8 text-[#2D2D2D] dark:text-[#EAEAEA] transition-colors duration-200">
      <motion.div
        className="w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E0E0E0] dark:border-[#2D2D2D] space-y-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Brand Header */}
        <div className="space-y-2 flex flex-col items-center">
          <img
            src="/icon.svg"
            alt="Askilla Logo"
            className="w-14 h-14 rounded-2xl shadow-md border-2 border-[#BA7A3B]"
          />
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight">
            Askilla
          </h1>
          <p className="text-sm sm:text-base text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans">
            Ask anything. Sabi everything.
          </p>
        </div>

        {/* Uncle Sabi Mascot Logo Artifact */}
        <div className="flex flex-col items-center justify-center py-1">
          <UncleSabiMascot isBadge size="xl" />
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#2D2D2D] dark:text-[#EAEAEA] mt-3">
            Welcome to Askilla
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 mt-1 max-w-xs leading-relaxed">
            Uncle Sabi is ready to teach you any topic natively in your language.
          </p>
        </div>

        {/* Input Fields & Compact Language Dropdown */}
        <div className="space-y-4 text-left pt-1">
          {/* Language Dropdown (Compact) */}
          <div>
            <label className="block text-xs font-extrabold text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 uppercase tracking-wider mb-2 px-1">
              Learning Language
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-full text-[#2D2D2D] dark:text-[#EAEAEA] text-sm font-bold hover:border-[#BA7A3B] focus:outline-none focus:border-[#BA7A3B] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-[#BA7A3B]" />
                  <span>{selectedLabel}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-2xl shadow-xl z-50 overflow-hidden">
                  {languageOptions.map((lang) => {
                    const isActive = selectedLang === lang.key;
                    return (
                      <button
                        key={lang.key}
                        type="button"
                        onClick={() => {
                          setSelectedLang(lang.key);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-[#BA7A3B]/15 dark:bg-[#BA7A3B]/20 text-[#2D2D2D] dark:text-[#EAEAEA] font-bold"
                            : "text-[#2D2D2D] dark:text-[#EAEAEA] hover:bg-[#F5F5F0] dark:hover:bg-[#252525]"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {isActive && <Check className="w-4 h-4 text-[#BA7A3B]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-extrabold text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 uppercase tracking-wider mb-2 px-1">
              Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-4 w-4 h-4 text-[#BA7A3B]" />
              <span className="absolute left-11 text-xs font-bold text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 border-r border-[#E0E0E0] dark:border-[#2D2D2D] pr-3">
                +234
              </span>
              <input
                type="tel"
                placeholder="803 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-24 pr-5 py-4 bg-[#FFFFFF] dark:bg-[#1C1C1C] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-full text-[#2D2D2D] dark:text-[#EAEAEA] placeholder-[#2D2D2D]/40 dark:placeholder-[#EAEAEA]/40 focus:outline-none focus:border-[#BA7A3B] text-sm font-sans transition-colors"
              />
            </div>
          </div>

          {/* Name (Required) */}
          <div>
            <label className="block text-xs font-extrabold text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 uppercase tracking-wider mb-2 px-1">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-[#BA7A3B]" />
              <input
                type="text"
                placeholder="Enter your name (e.g. Tunde Johnson)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim()) setNameError("");
                }}
                className={`w-full pl-11 pr-5 py-4 bg-[#FFFFFF] dark:bg-[#1C1C1C] border-2 ${
                  nameError ? "border-red-500" : "border-[#E0E0E0] dark:border-[#2D2D2D]"
                } rounded-full text-[#2D2D2D] dark:text-[#EAEAEA] placeholder-[#2D2D2D]/40 dark:placeholder-[#EAEAEA]/40 focus:outline-none focus:border-[#BA7A3B] text-sm font-sans transition-colors`}
              />
            </div>
            {nameError && (
              <p className="text-xs text-red-500 font-semibold mt-1.5 px-3">
                {nameError}
              </p>
            )}
          </div>
        </div>

        {/* Start Learning CTA — Premium styled */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#BA7A3B] to-[#A66A30] text-[#2D2D2D] font-heading font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl hover:from-[#A66A30] hover:to-[#8E5724] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 ring-2 ring-[#BA7A3B]/30"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Hint */}
        <p className="text-xs text-[#2D2D2D]/50 dark:text-[#EAEAEA]/55 pt-1">
          You can change your language preference anytime in Profile.
        </p>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50">
        3MTT Knowledge Showcase 2.0
      </footer>
    </div>
  );
};
