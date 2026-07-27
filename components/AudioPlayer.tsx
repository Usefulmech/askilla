"use client";

import React, { useState, useRef } from "react";
import { Volume2, Pause, Loader2 } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  label?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  text,
  label = "Listen to Uncle Sabi",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cleanTextForSpeech = (rawText: string) => {
    return rawText
      .replace(/###?\s*/g, "")
      .replace(/\*\*/g, "")
      .replace(/\\frac{([^}]+)}{([^}]+)}/g, "$1 over $2")
      .replace(/\\sqrt{([^}]+)}/g, "square root of $1")
      .replace(/\\sum_?{?([^}]+)}?\^?{?([^}]+)}?/g, "sum of")
      .replace(/\\log_?([0-9a-zA-Z]+)?/g, "logarithm")
      .replace(/\\\(|\\\)|\\\[|\\\]|\$\$|\$/g, " ")
      .replace(/<[^>]*>?/gm, "")
      .replace(/\\/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handlePlayTTS = async () => {
    const textToSpeak = cleanTextForSpeech(text);

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak, voice: "echo" }),
      });

      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("audio/mpeg")) {
          const blob = await res.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);

          audioRef.current = audio;

          audio.onended = () => {
            setIsPlaying(false);
            setIsLoading(false);
          };
          audio.onerror = () => {
            playBrowserFallback(textToSpeak);
          };

          setIsLoading(false);
          setIsPlaying(true);
          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.warn("Neural TTS fetch error, switching to browser TTS:", e);
    }

    playBrowserFallback(textToSpeak);
  };

  const playBrowserFallback = (textToSpeak: string) => {
    setIsLoading(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes("en-ng") ||
          v.name.toLowerCase().includes("nigerian") ||
          v.name.toLowerCase().includes("africa") ||
          v.lang.toLowerCase().includes("en-gb") ||
          v.lang.toLowerCase().includes("en-za")
      ) || voices.find((v) => v.lang.startsWith("en"));

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePlayTTS}
      disabled={isLoading}
      className={`px-3 py-2 sm:px-5 sm:py-3 rounded-full border-2 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 sm:gap-2.5 active:scale-95 shadow-sm whitespace-nowrap dark:bg-[#1E1E1E] dark:border-[#2D2D2D] dark:text-[#EAEAEA] ${
        isPlaying
          ? "bg-[#D4A574] border-[#D4A574] text-[#2D2D2D] dark:bg-[#D4A574] dark:text-[#2D2D2D] ring-4 ring-[#D4A574]/30 animate-pulse"
          : "bg-[#FAFAD5]/70 border-[#D4A574] text-[#2D2D2D] hover:bg-[#D4A574]/20"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-[#D4A574]" />
          <span>Loading...</span>
        </>
      ) : isPlaying ? (
        <>
          <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#2D2D2D]" />
          <span>Pause</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] shrink-0" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">Listen</span>
        </>
      )}
    </button>
  );
};
