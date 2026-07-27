"use client";

import React from "react";
import { Home, BookOpen, Target, User as UserIcon, Award, LogOut } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { UncleSabiMascot } from "./UncleSabiMascot";
import { AppScreen } from "@/lib/types/askilla";

export const DesktopSidebar: React.FC = () => {
  const {
    screen,
    setScreen,
    language,
    user,
    completedModuleIds,
    logout,
  } = useAskillaStore();

  if (screen === "landing" || screen === "onboarding" || screen === "intro" || screen === "welcome") return null;

  const navItems: { screen: AppScreen; label: string; icon: React.FC<{ className?: string }> }[] = [
    { screen: "home", label: "Home", icon: Home },
    { screen: "module", label: "Active Learning", icon: BookOpen },
    { screen: "progress", label: "Learning Progress", icon: Target },
    { screen: "settings", label: "Profile Settings", icon: UserIcon },
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white dark:bg-[#1E1E1E] border-r border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm z-40 p-5 justify-between transition-colors duration-200">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pb-4 text-left flex items-center gap-3">
          <img
            src="/icon.svg"
            alt="Askilla Logo"
            className="w-9 h-9 rounded-xl shadow-sm border border-[#BA7A3B]/40 shrink-0"
          />
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight leading-none">
              Askilla
            </h1>
            <p className="text-[11px] text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans mt-1">
              Ask anything. Sabi everything.
            </p>
          </div>
        </div>

        {/* Uncle Sabi Mascot Card */}
        <div className="bg-[#FAFAD5] dark:bg-[#2D2D15] rounded-2xl p-3.5 border-2 border-[#BA7A3B] dark:border-[#8E5724] flex items-center justify-start gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#2D2D2D] dark:border-white/20 bg-white dark:bg-[#1E1E1E] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <img 
              src="/uncle_sabi.png" 
              alt="Uncle Sabi" 
              className="w-full h-full object-cover scale-105" 
            />
          </div>
          <div className="space-y-0.5 text-left">
            <h2 className="font-heading font-extrabold text-sm text-[#2D2D2D] dark:text-[#EAEAEA] whitespace-nowrap">
              Uncle Sabi
            </h2>
            <span className="inline-block px-2.5 py-0.5 bg-[#BA7A3B] text-[#2D2D2D] text-[10px] font-extrabold rounded-full capitalize whitespace-nowrap">
              {language} Mode
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 text-left">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50 px-3 mb-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = screen === item.screen;
            const Icon = item.icon;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={() => setScreen(item.screen)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-[#BA7A3B] text-[#2D2D2D] font-extrabold shadow-sm"
                    : "text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 hover:bg-[#F5F5F0] dark:hover:bg-[#121212]"
                }`}
              >
                <Icon className="w-4 h-4 text-current" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Language Mode Badge (read-only — change in Profile) */}
        <div className="bg-[#F5F5F0] dark:bg-[#121212] rounded-2xl p-3.5 border border-[#E0E0E0] dark:border-[#2D2D2D] text-left">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50 mb-1.5">
            Language Mode
          </p>
          <p className="text-sm font-bold text-[#2D2D2D] dark:text-[#EAEAEA] capitalize">
            {language}
          </p>
        </div>
      </div>

      {/* Footer Info & Log Out */}
      <div className="border-t border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pt-4 text-left space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-semibold">
          <Award className="w-4 h-4 text-[#BA7A3B]" />
          <span>{completedModuleIds.length} Modules Completed</span>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full py-2.5 px-3 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>

        <p className="text-[10px] text-[#2D2D2D]/40 dark:text-[#EAEAEA]/40 font-mono">
          3MTT Showcase 2.0
        </p>
      </div>
    </aside>
  );
};
