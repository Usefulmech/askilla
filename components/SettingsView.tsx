"use client";

import React from "react";
import { ArrowLeft, Globe, Volume2, Moon, Info, User as UserIcon, LogOut } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { LanguageSelector } from "./LanguageSelector";
import { LearningLanguage } from "@/lib/types/askilla";

import { AboutModal } from "./AboutModal";

export const SettingsView: React.FC = () => {
  const {
    language,
    setLanguage,
    setScreen,
    voiceFeedbackEnabled,
    toggleVoiceFeedback,
    darkModeEnabled,
    toggleDarkMode,
    user,
    logout,
  } = useAskillaStore();

  const [aboutOpen, setAboutOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#2D2D2D] dark:text-[#EAEAEA] pb-24 md:pb-12 md:pl-64 transition-colors duration-200">
      {/* Header (Hidden on mobile, sticky on desktop) */}
      <header className="w-full px-4 md:px-12 py-4 hidden md:flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 sticky top-0 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 backdrop-blur-md z-40 transition-colors">
        <button
          type="button"
          onClick={() => setScreen("home")}
          className="p-2 rounded-full hover:bg-white dark:hover:bg-[#1E1E1E] text-[#2D2D2D] dark:text-[#EAEAEA] md:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-extrabold text-2xl text-[#2D2D2D] dark:text-[#EAEAEA]">
          Profile
        </h1>
        <div className="w-8" />
      </header>

      <div className="w-full px-4 md:px-12 pt-24 md:pt-8 pb-8 space-y-6 text-left">

        {/* User Info Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAFAD5] dark:bg-[#2D2D15] border-2 border-[#D4A574] dark:border-[#B38352] flex items-center justify-center font-heading font-extrabold text-xl text-[#2D2D2D] dark:text-[#EAEAEA]">
              {user.name ? user.name[0].toUpperCase() : <UserIcon className="w-6 h-6 text-[#2D2D2D] dark:text-[#EAEAEA]" />}
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#2D2D2D] dark:text-[#EAEAEA]">
                {user.name || "Learner"}
              </h2>
              <p className="text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans">
                {user.phone ? `+234 ${user.phone}` : "No phone linked"}
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Selection */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#D4A574]" />
              <h2 className="font-heading font-bold text-base text-[#2D2D2D] dark:text-[#EAEAEA]">
                Your Learning Language
              </h2>
            </div>
            <p className="text-xs text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans">
              Askilla will generate lessons and explanations natively in this language.
            </p>
            <LanguageSelector
              selectedLanguage={language}
              onSelect={(lang: LearningLanguage) => setLanguage(lang)}
            />
          </div>

          {/* Preferences Toggles */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-[#2D2D2D] dark:text-[#EAEAEA] mb-2">
              Preferences &amp; Controls
            </h2>

            <div className="flex items-center justify-between py-2 border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#D4A574]" />
                <div>
                  <p className="text-sm font-semibold text-[#2D2D2D] dark:text-[#EAEAEA]">Voice Feedback</p>
                  <p className="text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60">Read Uncle Sabi explanations aloud</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleVoiceFeedback}
                className={`w-14 h-7 rounded-full transition-colors p-1 ${
                  voiceFeedbackEnabled ? "bg-[#D4A574]" : "bg-[#E0E0E0] dark:bg-[#333333]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    voiceFeedbackEnabled ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#D4A574]" />
                <div>
                  <p className="text-sm font-semibold text-[#2D2D2D] dark:text-[#EAEAEA]">Dark Mode</p>
                  <p className="text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60">Soft low-strain dark notebook contrast</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`w-14 h-7 rounded-full transition-colors p-1 ${
                  darkModeEnabled ? "bg-[#D4A574]" : "bg-[#E0E0E0] dark:bg-[#333333]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    darkModeEnabled ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Log Out Action Section */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={logout}
            className="w-full py-5 bg-white dark:bg-[#1E1E1E] border-2 border-red-300 dark:border-red-900/50 text-red-600 dark:text-red-400 font-heading font-extrabold text-base rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of Session</span>
          </button>
        </div>

        {/* About Section (Static) */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#D4A574]" />
            <h2 className="font-heading font-bold text-base text-[#2D2D2D] dark:text-[#EAEAEA]">
              About Askilla
            </h2>
          </div>
          <p className="text-xs text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans leading-relaxed">
            Askilla is an AI-powered vernacular micro-learning platform built for the <strong>3MTT Knowledge Showcase 2.0</strong>. Powered by OpenAI GPT-4o and Web Speech API, it delivers native language learning across Nigeria.
          </p>
          <p className="text-xs text-[#D4A574] font-extrabold pt-1">
            Ask anything. Sabi everything.
          </p>
        </div>
      </div>
    </div>
  );
};
