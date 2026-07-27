"use client";

import React from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { LearningLanguage } from "@/lib/types/askilla";

interface LanguageOption {
  key: LearningLanguage;
  label: string;
}

const languages: LanguageOption[] = [
  { key: "pidgin", label: "Pidgin" },
  { key: "english", label: "English" },
];

interface LanguageSelectorProps {
  selectedLanguage: LearningLanguage;
  onSelect: (lang: LearningLanguage) => void;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelect,
  compact = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedOption = languages.find((lang) => lang.key === selectedLanguage) || languages[0];

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-full text-[#2D2D2D] dark:text-[#EAEAEA] text-sm font-bold hover:border-[#D4A574] focus:outline-none focus:border-[#D4A574] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-[#D4A574]" />
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-2xl shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.key;
            return (
              <button
                key={lang.key}
                type="button"
                onClick={() => {
                  onSelect(lang.key);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-[#D4A574]/15 dark:bg-[#D4A574]/20 text-[#2D2D2D] dark:text-[#EAEAEA] font-bold"
                    : "text-[#2D2D2D] dark:text-[#EAEAEA] hover:bg-[#F5F5F0] dark:hover:bg-[#252525]"
                }`}
              >
                <span>{lang.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#D4A574]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
