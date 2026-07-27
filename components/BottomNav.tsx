"use client";

import React from "react";
import { Home, BookOpen, Target, User } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { AppScreen } from "@/lib/types/askilla";

export const BottomNav: React.FC = () => {
  const { screen, setScreen } = useAskillaStore();

  if (screen === "landing" || screen === "onboarding" || screen === "intro" || screen === "module") return null;

  const navItems: { screen: AppScreen; label: string; icon: React.FC<{ className?: string }> }[] = [
    { screen: "home", label: "Home", icon: Home },
    { screen: "module", label: "Learning", icon: BookOpen },
    { screen: "progress", label: "Progress", icon: Target },
    { screen: "settings", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] border-t border-[#E0E0E0] dark:border-[#2D2D2D] shadow-md z-40 md:hidden transition-colors duration-200">
      <div className="max-w-xl mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = screen === item.screen;
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              type="button"
              onClick={() => setScreen(item.screen)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-[#D4A574] font-bold"
                  : "text-[#2D2D2D]/50 dark:text-[#EAEAEA]/55 hover:text-[#2D2D2D] dark:hover:text-[#EAEAEA]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#D4A574]" : ""}`} />
              <span className="text-[10px] font-semibold font-sans tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
