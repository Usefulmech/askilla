"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Phone, User, ChevronDown, Check, Globe } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { UncleSabiMascot } from "./UncleSabiMascot";
import { LearningLanguage } from "@/lib/types/askilla";
import LogoIcon from './LogoIcon';

const languageOptions: { key: LearningLanguage; label: string }[] = [
  { key: "pidgin", label: "Pidgin" },
  { key: "english", label: "English" },
];

export const OnboardingModal: React.FC = () => {
  const { language, setLanguage, setScreen, loginWithPhone, createUser } = useAskillaStore();
  const [selectedLang, setSelectedLang] = useState<LearningLanguage>(language);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFullSignup, setShowFullSignup] = useState(false);

  const normalizePhone = (value: string) => {
    const trimmed = value.trim();
    const digits = trimmed.replace(/\D/g, "");

    if (trimmed.startsWith("+234") && digits.length === 13) return `+${digits}`;
    if (digits.startsWith("234") && digits.length === 13) return `+${digits}`;
    if (digits.startsWith("0") && digits.length === 11) return `+234${digits.slice(1)}`;
    if (digits.length === 10) return `+234${digits}`;

    return trimmed;
  };

  const handlePhoneCheck = async () => {
    if (!phone.trim()) {
      setPhoneError("Please enter your phone number");
      return;
    }
    // Basic phone validation (Nigeria format: +234 followed by 10 digits)
    const phoneRegex = /^\+234[0-9]{10}$/;
    const formattedPhone = normalizePhone(phone);
    
    if (!phoneRegex.test(formattedPhone)) {
      setPhoneError("Please enter a valid phone number (e.g., 803 000 0000)");
      return;
    }

    setPhoneError("");
    setIsLoading(true);

    try {
      // loginWithPhone checks if the user exists in the DB, and if so, fetches achievements and logs them in
      const isLoggedIn = await loginWithPhone(formattedPhone);
      
      if (isLoggedIn) {
        // User exists and achievements are loaded. Now ensure they have a complete profile.
        const currentUser = useAskillaStore.getState().user;
        if (currentUser.name && currentUser.name.trim().length > 0) {
          setLanguage(currentUser.preferredLanguage || selectedLang);
          setScreen("welcome");
        } else {
          // Returning user but no name (incomplete signup)
          setPhone(formattedPhone);
          setShowFullSignup(true);
        }
      } else {
        // New user
        setPhone(formattedPhone);
        setShowFullSignup(true);
      }
    } catch (error) {
      console.error('Phone check error:', error);
      setPhoneError("Failed to check phone number. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async () => {
    if (!name.trim()) {
      setNameError("Please enter your name so Uncle Sabi can address you!");
      return;
    }

    setNameError("");
    setIsLoading(true);

    const formattedPhone = normalizePhone(phone);

    try {
      const created = await createUser({
        phone: formattedPhone,
        name: name.trim(),
        preferredLanguage: selectedLang,
      });

      if (!created) {
        setPhoneError("Failed to create your profile. Please try again.");
        return;
      }

      setLanguage(selectedLang);

      setScreen("intro");
    } catch (error) {
      console.error('Authentication error:', error);
      setPhoneError("Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLabel = languageOptions.find((l) => l.key === selectedLang)?.label || "Pidgin";

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex flex-col items-center justify-center p-4 sm:p-8 text-[#1C1917] dark:text-[#F5F5F4] transition-colors duration-200">
      <motion.div
        className="w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E0E0E0] dark:border-white/10 space-y-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Brand Header */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 relative mx-auto -[#C25B32]/40 shrink-0">
            <LogoIcon className="w-full h-full text-[#1C1917] dark:text-[#F5F5F4]" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1C1917] dark:text-[#F5F5F4] tracking-tight">
            Askilla
          </h1>
          <p className="text-sm sm:text-base text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans">
            Ask anything. Sabi everything.
          </p>
        </div>

        {/* Uncle Sabi Mascot Logo Artifact */}
        <div className="flex flex-col items-center justify-center py-1">
          <UncleSabiMascot isBadge size="xl" />
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1C1917] dark:text-[#F5F5F4] mt-3">
            Welcome to Askilla
          </h2>
          <p className="text-xs sm:text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 mt-1 max-w-xs leading-relaxed">
            Uncle Sabi is ready to teach you any topic natively in your language.
          </p>
        </div>

        {/* Input Fields & Compact Language Dropdown */}
        <div className="space-y-4 text-left pt-1">
          {!showFullSignup ? (
            <>
              {/* Phone Number Only for Initial Check */}
              <div>
                <label className="block text-xs font-extrabold text-[#1C1917]/80 dark:text-[#F5F5F4]/80 uppercase tracking-wider mb-2 px-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 w-4 h-4 text-[#C25B32]" />
                  <span className="absolute left-11 text-xs font-bold text-[#1C1917]/60 dark:text-[#F5F5F4]/60 border-r border-[#E0E0E0] dark:border-white/10 pr-3">
                    +234
                  </span>
                  <input
                    type="tel"
                    placeholder="803 000 0000"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value.trim()) setPhoneError("");
                    }}
                    className={`w-full pl-24 pr-5 py-4 bg-[#FFFFFF] dark:bg-[#1C1C1C] border-2 ${
                      phoneError ? "border-red-500" : "border-[#E0E0E0] dark:border-white/10"
                    } rounded-full text-[#1C1917] dark:text-[#F5F5F4] placeholder-[#1C1917]/40 dark:placeholder-[#F5F5F4]/40 focus:outline-none focus:border-[#C25B32] text-sm font-sans transition-colors`}
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500 font-semibold mt-1.5 px-3">
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Continue Button */}
              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handlePhoneCheck}
                  disabled={isLoading}
                  className="w-full sm:w-auto sm:px-12 py-3.5 px-6 bg-gradient-to-r from-[#C25B32] to-[#94401F] text-white font-heading font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl hover:from-[#94401F] hover:to-[#94401F] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 ring-2 ring-[#C25B32]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isLoading ? "Checking..." : "Continue"}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Language Dropdown (Compact) */}
              <div>
                <label className="block text-xs font-extrabold text-[#1C1917]/80 dark:text-[#F5F5F4]/80 uppercase tracking-wider mb-2 px-1">
                  Learning Language
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-white/10 rounded-full text-[#1C1917] dark:text-[#F5F5F4] text-sm font-bold hover:border-[#C25B32] focus:outline-none focus:border-[#C25B32] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-5 h-5 text-[#C25B32]" />
                      <span>{selectedLabel}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#1C1917]/50 dark:text-[#F5F5F4]/50 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {langDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden">
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
                                ? "bg-[#C25B32]/15 dark:bg-[#C25B32]/20 text-[#1C1917] dark:text-[#F5F5F4] font-bold"
                                : "text-[#1C1917] dark:text-[#F5F5F4] hover:bg-[#F5F5F0] dark:hover:bg-[#252525]"
                            }`}
                          >
                            <span>{lang.label}</span>
                            {isActive && <Check className="w-4 h-4 text-[#C25B32]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Name (Required) */}
              <div>
                <label className="block text-xs font-extrabold text-[#1C1917]/80 dark:text-[#F5F5F4]/80 uppercase tracking-wider mb-2 px-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-4 h-4 text-[#C25B32]" />
                  <input
                    type="text"
                    placeholder="Enter your name (e.g. Tunde Johnson)"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setNameError("");
                    }}
                    className={`w-full pl-11 pr-5 py-4 bg-[#FFFFFF] dark:bg-[#1C1C1C] border-2 ${
                    nameError ? "border-red-500" : "border-[#E0E0E0] dark:border-white/10"
                    } rounded-full text-[#1C1917] dark:text-[#F5F5F4] placeholder-[#1C1917]/40 dark:placeholder-[#F5F5F4]/40 focus:outline-none focus:border-[#C25B32] text-sm font-sans transition-colors`}
                  />
                </div>
                {nameError && (
                  <p className="text-xs text-red-500 font-semibold mt-1.5 px-3">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Start Learning CTA — Premium styled */}
              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={isLoading}
                  className="w-full sm:w-auto sm:px-12 py-3.5 px-6 bg-gradient-to-r from-[#C25B32] to-[#94401F] text-white font-heading font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl hover:from-[#94401F] hover:to-[#94401F] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 ring-2 ring-[#C25B32]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isLoading ? "Creating Account..." : "Start Learning"}</span>
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer Hint */}
        <p className="text-xs text-[#1C1917]/50 dark:text-[#F5F5F4]/55 pt-1">
          You can change your language preference anytime in Profile.
        </p>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-[#1C1917]/50 dark:text-[#F5F5F4]/50">
        3MTT Knowledge Showcase 2.0
      </footer>
    </div>
  );
};
