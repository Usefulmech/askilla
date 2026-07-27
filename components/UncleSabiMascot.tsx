"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface UncleSabiMascotProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  emotion?: "happy" | "explaining" | "celebrating" | "thinking";
  showBubble?: boolean;
  isBadge?: boolean;
}

export const UncleSabiMascot: React.FC<UncleSabiMascotProps> = ({
  message,
  size = "md",
  emotion = "happy",
  showBubble = true,
  isBadge = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const avatarSizes = {
    sm: "w-10 h-10 min-w-10",
    md: "w-16 h-16 min-w-16",
    lg: "w-24 h-24 min-w-24",
    xl: "w-32 h-32 min-w-32",
  };

  const renderMascotGraphic = () => {
    if (!imgError) {
      return (
        <img
          src="/uncle_sabi.png"
          alt="Uncle Sabi Mascot"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover rounded-full scale-105"
        />
      );
    }

    // SVG Fallback
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="46" fill="#F5F0E8" />
        <path d="M 30 36 C 30 16, 70 16, 70 36 Z" fill="#D4A574" stroke="#7C572D" strokeWidth="2.5" />
        <circle cx="50" cy="52" r="22" fill="#A87B51" />
        <circle cx="41" cy="50" r="6.5" stroke="#2D2D2D" strokeWidth="2.5" fill="none" />
        <circle cx="59" cy="50" r="6.5" stroke="#2D2D2D" strokeWidth="2.5" fill="none" />
        <path d="M 41 62 Q 50 69 59 62" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 22 84 Q 50 70 78 84 L 84 100 L 16 100 Z" fill="#7C572D" />
      </svg>
    );
  };

  if (isBadge) {
    return (
      <div className="relative inline-block my-4">
        {/* Outer decorative shadow accent ring */}
        <div className="absolute -z-10 -top-2 -right-2 w-32 h-32 rounded-full bg-[#D4A574]/30 dark:bg-[#D4A574]/15 animate-pulse" />
        <motion.div
          className="w-32 h-32 rounded-full border-4 border-[#2D2D2D] dark:border-[#1E1E1E] bg-[#FAFAD5] dark:bg-[#2D2D15] flex items-center justify-center overflow-hidden shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {renderMascotGraphic()}
        </motion.div>
      </div>
    );
  }

  const avatarElement = (
    <motion.div
      className={`relative rounded-full border-2 border-[#D4A574] dark:border-[#B38352] bg-[#FAFAD5] dark:bg-[#2D2D15] flex items-center justify-center overflow-hidden shadow-sm shrink-0 ${avatarSizes[size]}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [-1, 2, -1] 
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {renderMascotGraphic()}
    </motion.div>
  );

  if (!showBubble) {
    return avatarElement;
  }

  return (
    <div className="flex items-start gap-3 my-2 w-full">
      {avatarElement}

      {/* Speech Bubble */}
      {showBubble && message && (
        <motion.div
          className="relative bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] text-[#2D2D2D] dark:text-[#EAEAEA] rounded-2xl p-4 shadow-sm max-w-lg flex-1 text-sm md:text-base leading-relaxed"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Arrow pointing to avatar */}
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white dark:border-r-[#1E1E1E] border-b-8 border-b-transparent drop-shadow-sm" />
          <p className="font-sans font-medium">{message}</p>
        </motion.div>
      )}
    </div>
  );
};
