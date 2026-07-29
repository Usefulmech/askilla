"use client";

import React, { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  label?: string;
  iconOnly?: boolean;
  appLanguage?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  label = "Or speak your answer",
  iconOnly = false,
  appLanguage = "english",
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setIsProcessing(true);

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
        formData.append("appLanguage", appLanguage);

        try {
          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            if (data.text) {
              onTranscript(data.text);
            }
          } else {
            console.error("Transcription failed", await res.text());
            alert("Failed to transcribe audio. Please try again.");
          }
        } catch (err) {
          console.error("Error during transcription", err);
        } finally {
          setIsProcessing(false);
          // Cleanup tracks
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isProcessing) return;
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={isProcessing}
      className={
        iconOnly
          ? `p-2 rounded-full border transition-all duration-200 flex items-center justify-center active:scale-[0.97] ${
              isListening
                ? "bg-[#C25B32] border-[#C25B32] text-[#1C1917] animate-pulse shadow-md ring-4 ring-[#C25B32]/25"
                : isProcessing
                ? "bg-transparent border-transparent text-[#C25B32]/50 cursor-not-allowed"
                : "bg-transparent border-transparent text-[#C25B32] hover:bg-[#FDEEE9]/50 dark:hover:bg-[#2D1F1A]/25"
            }`
          : `w-full py-4 px-6 rounded-full border-2 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-3 shadow-sm ${
              isListening
                ? "bg-[#C25B32] border-[#C25B32] text-[#1C1917] dark:bg-[#C25B32] dark:border-[#C25B32] dark:text-[#1C1917] animate-pulse shadow-md ring-4 ring-[#C25B32]/25 active:scale-[0.97]"
                : isProcessing
                ? "bg-white dark:bg-[#1C1C1C] border-[#C25B32]/50 text-[#1C1917]/50 dark:text-[#F5F5F4]/50 cursor-not-allowed"
                : "bg-white dark:bg-[#1C1C1C] border-[#C25B32] dark:border-[#94401F] text-[#1C1917] dark:text-[#F5F5F4] hover:bg-[#FDEEE9]/50 dark:hover:bg-[#2D1F1A]/25 active:scale-[0.97]"
            }`
      }
      aria-label={isListening ? "Stop listening" : isProcessing ? "Processing audio" : label}
    >
      {isProcessing ? (
        <Loader2 className={`animate-spin ${iconOnly ? "w-5 h-5" : "w-5 h-5"}`} />
      ) : isListening ? (
        <MicOff className={`${iconOnly ? "w-5 h-5" : "w-5 h-5"}`} />
      ) : (
        <Mic className={`${iconOnly ? "w-5 h-5" : "w-5 h-5"}`} />
      )}
      {!iconOnly && (
        <span>
          {isProcessing ? "Transcribing..." : isListening ? "Listening... (Tap to stop)" : label}
        </span>
      )}
    </button>
  );
};
