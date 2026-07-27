"use client";

import React, { useState } from "react";
import { X, Copy, Check, MessageSquare, Twitter, Facebook, Share2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  topic: string;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  topic,
  shareUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `I Sabi ${topic} Now! Check out my learning achievements on Askilla:`;

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = `${shareText}\n${shareUrl}`;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToWhatsApp = () => {
    const text = `${shareText}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.warn("Native share closed:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-2xl relative space-y-6 text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAFAD5] dark:hover:bg-[#2D2D2D] text-[#2D2D2D] dark:text-[#EAEAEA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAFAD5] dark:bg-[#2D2D15] border border-[#BA7A3B] flex items-center justify-center mb-3">
            <Share2 className="w-6 h-6 text-[#BA7A3B]" />
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#2D2D2D] dark:text-[#EAEAEA]">
            Share Your Achievement
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans mt-1">
            Show your friends you sabi <span className="font-bold text-[#BA7A3B]">{topic}</span>!
          </p>
        </div>

        {/* Quick Link Copy Box */}
        <div className="p-3.5 bg-[#FAFAD5]/50 dark:bg-[#121212] rounded-2xl border border-[#BA7A3B]/40 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-xs font-mono text-[#2D2D2D] dark:text-[#EAEAEA] flex-1 outline-none truncate"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-[#BA7A3B] hover:bg-[#c39463] text-[#2D2D2D] text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2D2D2D]" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Link
              </>
            )}
          </button>
        </div>

        {/* Social Share Grid */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans">
            Or Share Directly To
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp */}
            <button
              type="button"
              onClick={shareToWhatsApp}
              className="p-3.5 rounded-2xl border border-[#E0E0E0] dark:border-[#2D2D2D] bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#2D2D2D] dark:text-[#EAEAEA] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              WhatsApp
            </button>

            {/* Twitter / X */}
            <button
              type="button"
              onClick={shareToTwitter}
              className="p-3.5 rounded-2xl border border-[#E0E0E0] dark:border-[#2D2D2D] bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#2D2D2D] dark:text-[#EAEAEA] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              Twitter / X
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={shareToFacebook}
              className="p-3.5 rounded-2xl border border-[#E0E0E0] dark:border-[#2D2D2D] bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#2D2D2D] dark:text-[#EAEAEA] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              Facebook
            </button>

            {/* Native Mobile Share (if available) */}
            {typeof navigator !== "undefined" && "share" in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="p-3.5 rounded-2xl border border-[#E0E0E0] dark:border-[#2D2D2D] bg-[#BA7A3B]/15 hover:bg-[#BA7A3B]/25 text-[#2D2D2D] dark:text-[#EAEAEA] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4 text-[#BA7A3B]" />
                More Options
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
