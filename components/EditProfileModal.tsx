"use client";

import React, { useState } from "react";
import { X, User, Phone, Globe, Check } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { LearningLanguage } from "@/lib/types/askilla";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, setLanguage, updateUserProfile } = useAskillaStore();

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [prefLang, setPrefLang] = useState<LearningLanguage>(
    user.preferredLanguage || "pidgin"
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const normalizePhone = (value: string) => {
    const trimmed = value.trim();
    const digits = trimmed.replace(/\D/g, "");

    if (trimmed.startsWith("+234") && digits.length === 13) return `+${digits}`;
    if (digits.startsWith("234") && digits.length === 13) return `+${digits}`;
    if (digits.startsWith("0") && digits.length === 11) return `+234${digits.slice(1)}`;
    if (digits.length === 10) return `+234${digits}`;

    return trimmed;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const savedProfile = await updateUserProfile({
      name: name.trim(),
      phone: normalizePhone(phone),
      preferredLanguage: prefLang,
    });

    if (!savedProfile) {
      setError("Could not save your profile. Please check the phone number and try again.");
      return;
    }

    setLanguage(prefLang);

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E0E0E0] dark:border-white/10 shadow-2xl relative space-y-6 text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FDEEE9] dark:hover:bg-[#2D1F1A] text-[#1C1917] dark:text-[#F5F5F4] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1C1917] dark:text-[#F5F5F4]">
            Edit Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#1C1917]/60 dark:text-[#F5F5F4]/60 font-sans mt-1">
            Update your account details and learning preferences.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#F5F5F4]/70 mb-1.5 font-sans">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C25B32]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-white/10 bg-[#FDEEE9]/30 dark:bg-[#121212] text-[#1C1917] dark:text-[#F5F5F4] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#C25B32]"
                required
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#F5F5F4]/70 mb-1.5 font-sans">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C25B32]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="8012345678"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-white/10 bg-[#FDEEE9]/30 dark:bg-[#121212] text-[#1C1917] dark:text-[#F5F5F4] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#C25B32]"
              />
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#F5F5F4]/70 mb-1.5 font-sans">
              Preferred Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPrefLang("pidgin")}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  prefLang === "pidgin"
                    ? "bg-[#C25B32] text-[#1C1917] border-[#C25B32] shadow-sm"
                    : "bg-[#FDEEE9]/40 dark:bg-[#121212] border-[#E0E0E0] dark:border-white/10 text-[#1C1917] dark:text-[#F5F5F4]"
                }`}
              >
                Nigerian Pidgin
              </button>
              <button
                type="button"
                onClick={() => setPrefLang("english")}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all border ${
                  prefLang === "english"
                    ? "bg-[#C25B32] text-[#1C1917] border-[#C25B32] shadow-sm"
                    : "bg-[#FDEEE9]/40 dark:bg-[#121212] border-[#E0E0E0] dark:border-white/10 text-[#1C1917] dark:text-[#F5F5F4]"
                }`}
              >
                Standard English
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="w-full sm:w-auto sm:px-12 mt-2 py-3.5 px-6 rounded-2xl bg-[#C25B32] hover:bg-[#c39463] text-white font-heading font-extrabold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
            >
            {saved ? (
              <>
                <Check className="w-5 h-5 text-[#1C1917]" />
                Profile Saved!
              </>
            ) : (
              "Save Changes"
            )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
