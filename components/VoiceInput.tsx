"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  label?: string;
  iconOnly?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  label = "Or speak your answer",
  iconOnly = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSupported(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!supported) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge!");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-NG";

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        onTranscript(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={
        iconOnly
          ? `p-2 rounded-full border transition-all duration-200 flex items-center justify-center active:scale-[0.97] ${
              isListening
                ? "bg-[#D4A574] border-[#D4A574] text-[#2D2D2D] animate-pulse shadow-md ring-4 ring-[#D4A574]/25"
                : "bg-transparent border-transparent text-[#D4A574] hover:bg-[#FAFAD5]/50 dark:hover:bg-[#2D2D15]/25"
            }`
          : `w-full py-4 px-6 rounded-full border-2 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.97] shadow-sm ${
              isListening
                ? "bg-[#D4A574] border-[#D4A574] text-[#2D2D2D] dark:bg-[#D4A574] dark:border-[#D4A574] dark:text-[#2D2D2D] animate-pulse shadow-md ring-4 ring-[#D4A574]/25"
                : "bg-white dark:bg-[#1C1C1C] border-[#D4A574] dark:border-[#B38352] text-[#2D2D2D] dark:text-[#EAEAEA] hover:bg-[#FAFAD5]/50 dark:hover:bg-[#2D2D15]/25"
            }`
      }
      title={label}
    >
      {isListening ? (
        <>
          {iconOnly ? (
            <Mic className="w-5 h-5 text-[#2D2D2D] animate-pulse" />
          ) : (
            <>
              <span className="w-3 h-3 rounded-full bg-[#2D2D2D] animate-ping" />
              <Mic className="w-5 h-5 text-[#2D2D2D]" />
              <span>Listening... Speak now</span>
            </>
          )}
        </>
      ) : (
        <>
          <Mic className="w-5 h-5" />
          {!iconOnly && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
