"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, Target, User, LogOut } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";

export const MobileHeader: React.FC = () => {
  const {
    screen,
    setScreen,
    language,
    user,
    logout,
  } = useAskillaStore();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  if (screen === "landing" || screen === "onboarding" || screen === "intro" || screen === "welcome") return null;

  return (
    <>
      {/* Mobile Top Header */}
      <header className="w-full px-4 py-4 flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 fixed top-0 left-0 right-0 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 backdrop-blur-md z-40 transition-colors md:hidden">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="p-2.5 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] hover:bg-[#F5F5F0] dark:hover:bg-[#121212] text-[#2D2D2D] dark:text-[#EAEAEA] active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="/icon.svg"
            alt="Askilla Logo"
            className="w-7 h-7 rounded-lg shadow-sm border border-[#BA7A3B]/40 shrink-0"
          />
          <h1 className="font-heading font-extrabold text-2xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight">
            Askilla
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setScreen("settings")}
          className="px-4 py-2 bg-[#FAFAD5] dark:bg-[#2D2D15] text-[#2D2D2D] dark:text-[#EAEAEA] font-bold text-xs rounded-full border border-[#BA7A3B]/40 capitalize hover:bg-[#BA7A3B]/20 dark:hover:bg-[#BA7A3B]/35 transition-colors"
        >
          {language} Mode
        </button>
      </header>

      {/* Dynamic Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 max-w-[80vw] bg-white dark:bg-[#1E1E1E] border-r border-[#E0E0E0] dark:border-[#2D2D2D] z-50 md:hidden p-6 flex flex-col justify-between shadow-2xl text-left"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pb-4">
                  <div className="text-left">
                    <h2 className="font-heading font-extrabold text-2xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight">Askilla</h2>
                    <p className="text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans mt-0.5">Ask anything. Sabi everything.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 rounded-full hover:bg-[#F5F5F0] dark:hover:bg-[#2D2D2D] text-[#2D2D2D] dark:text-[#EAEAEA]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-[#FAFAD5] dark:bg-[#2D2D15] rounded-2xl p-3.5 border-2 border-[#BA7A3B] dark:border-[#8E5724] flex items-center justify-start gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#2D2D2D] dark:border-white/20 bg-white dark:bg-[#1E1E1E] flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/uncle_sabi.png" alt="Uncle Sabi" className="w-full h-full object-cover scale-105" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-extrabold text-xs text-[#2D2D2D] dark:text-[#EAEAEA]">Uncle Sabi</h3>
                    <span className="inline-block px-2 py-0.5 bg-[#BA7A3B] text-[#2D2D2D] text-[9px] font-extrabold rounded-full capitalize">{language} Mode</span>
                  </div>
                </div>

                <nav className="space-y-1.5">
                  {[
                    { screen: "home" as const, label: "Home", icon: Home },
                    { screen: "progress" as const, label: "My Learning Progress", icon: BookOpen },
                    { screen: "module" as const, label: "Active Practice", icon: Target },
                    { screen: "settings" as const, label: "Profile Settings", icon: User }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.screen}
                        type="button"
                        onClick={() => {
                          setScreen(item.screen);
                          setMobileDrawerOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold text-sm text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 hover:bg-[#F5F5F0] dark:hover:bg-[#121212] transition-colors"
                      >
                        <Icon className="w-5 h-5 text-current" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full py-3 px-4 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Session</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
