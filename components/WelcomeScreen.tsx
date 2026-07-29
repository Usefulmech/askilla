"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { UncleSabiMascot } from "./UncleSabiMascot";
import LogoIcon from './LogoIcon';

export const WelcomeScreen: React.FC = () => {
  const { user, setScreen, language } = useAskillaStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen("home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [setScreen]);

  const welcomeMessage =
    language === "pidgin"
      ? `Aah, welcome back ${user.name || "my friend"}! Make we continue our learning sharp-sharp!`
      : `Welcome back, ${user.name || "my friend"}! Let's continue our learning journey!`;

  console.log('Welcome screen user:', user);

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] flex flex-col items-center justify-center p-4 sm:p-8 text-[#1C1917] dark:text-[#F5F5F4] transition-colors duration-200">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#E0E0E0] dark:border-white/10 text-center space-y-6 flex flex-col items-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Askilla Logo Icon Accent */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 opacity-55">
          <div className="w-5 h-5 relative shrink-0">
            <LogoIcon className="w-full h-full text-[#1C1917] dark:text-[#F5F5F4]" />
          </div>
          <span className="text-[10px] font-heading font-extrabold tracking-wider uppercase">Askilla</span>
        </div>

        {/* Uncle Sabi Mascot badge */}
        <div className="relative pt-4">
          <UncleSabiMascot isBadge />
        </div>

        {/* Welcome Back Header */}
        <div className="space-y-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-heading font-extrabold text-[#C25B32] uppercase tracking-widest block"
          >
            Sabi Portal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1C1917] dark:text-[#F5F5F4] tracking-tight"
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-sans font-medium text-[#1C1917]/75 dark:text-[#F5F5F4]/75 leading-relaxed max-w-sm mt-2"
          >
            {welcomeMessage}
          </motion.p>
        </div>

        {/* Premium Progress Loader */}
        <div className="w-full max-w-[200px] h-1 bg-[#FDEEE9] dark:bg-[#2D1F1A] rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C25B32] to-[#94401F] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};
