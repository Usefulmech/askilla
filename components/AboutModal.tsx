"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Cpu, Database, Award } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<"overview" | "ml_schema">("overview");

  if (!isOpen) return null;

  const downloadTelemetrySample = () => {
    const sampleObj = {
      dataset_metadata: {
        platform: "Askilla AI Tutor Engine",
        showcase: "3MTT Knowledge Showcase 2.0 (AI/ML Track)",
        timestamp: new Date().toISOString(),
      },
      telemetry_record_sample: {
        student_id: "user_3mtt_learner",
        domain_topic: "Data Analysis & Spreadsheets",
        language_mode: "pidgin",
        concept_mastery_score: 0.95,
        analogy_mapping_pair: {
          term: "Data Cleaning",
          simplified: "Arranging messy files so formula no go crash"
        },
        attempt_latency_sec: 11.8,
        ml_dataset_tag: "3MTT_Vernacular_EdTech_v1"
      }
    };
    const blob = new Blob([JSON.stringify(sampleObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `askilla_ml_schema_sample.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-[#1E1E1E] border-2 border-[#C25B32]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-left text-[#1C1917] dark:text-[#F5F5F4] relative"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#FDEEE9] dark:bg-[#2D1F1A] text-[#1C1917] dark:text-[#F5F5F4] hover:bg-[#C25B32]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-8">
            <span className="text-[10px] font-heading font-extrabold text-[#C25B32] uppercase tracking-widest bg-[#C25B32]/10 px-3 py-1 rounded-full border border-[#C25B32]/30 inline-block">
              3MTT Knowledge Showcase 2.0 • AI/ML Track
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1C1917] dark:text-[#F5F5F4] tracking-tight">
              About Askilla
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#E0E0E0]/60 dark:border-white/5 gap-4 text-xs font-heading font-extrabold">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "overview"
                  ? "text-[#C25B32]"
                  : "text-[#1C1917]/50 dark:text-[#F5F5F4]/50 hover:text-[#1C1917] dark:hover:text-[#F5F5F4]"
              }`}
            >
              <span>Platform Overview</span>
              {activeTab === "overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25B32] rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ml_schema")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "ml_schema"
                  ? "text-[#C25B32]"
                  : "text-[#1C1917]/50 dark:text-[#F5F5F4]/50 hover:text-[#1C1917] dark:hover:text-[#F5F5F4]"
              }`}
            >
              <span>AI/ML Telemetry Schema (Judges)</span>
              {activeTab === "ml_schema" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25B32] rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#1C1917]/75 dark:text-[#F5F5F4]/75 font-sans leading-relaxed">
                Askilla is an AI-powered vernacular micro-learning engine built to democratize education across Nigeria. Powered by OpenAI GPT-4o and Web Speech API, it transforms complex STEM and digital skills into step-by-step lessons natively in standard English and Nigerian Pidgin.
              </p>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#FDEEE9]/40 dark:bg-[#2D1F1A]/20 border border-[#C25B32]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C25B32] font-extrabold text-xs uppercase tracking-wider">
                    <Brain className="w-4 h-4" />
                    <span>Adaptive AI Tutor</span>
                  </div>
                  <p className="text-xs text-[#1C1917]/80 dark:text-[#F5F5F4]/80 font-sans leading-relaxed">
                    Persona-driven instructor (Uncle Sabi) offering structured lessons, real-world analogies, and inline SVG visualizers.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDEEE9]/40 dark:bg-[#2D1F1A]/20 border border-[#C25B32]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C25B32] font-extrabold text-xs uppercase tracking-wider">
                    <Database className="w-4 h-4" />
                    <span>ML Interaction Pipeline</span>
                  </div>
                  <p className="text-xs text-[#1C1917]/80 dark:text-[#F5F5F4]/80 font-sans leading-relaxed">
                    Captures real-time learner interaction vectors, latency, and concept mastery curves for AI model fine-tuning.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDEEE9]/40 dark:bg-[#2D1F1A]/20 border border-[#C25B32]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C25B32] font-extrabold text-xs uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <span>Linguistic Isolation</span>
                  </div>
                  <p className="text-xs text-[#1C1917]/80 dark:text-[#F5F5F4]/80 font-sans leading-relaxed">
                    Strict boundary control between standard English and Nigerian Pidgin, preventing language drift while maintaining technical rigor.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDEEE9]/40 dark:bg-[#2D1F1A]/20 border border-[#C25B32]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C25B32] font-extrabold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Verified Sabi Certs</span>
                  </div>
                  <p className="text-xs text-[#1C1917]/80 dark:text-[#F5F5F4]/80 font-sans leading-relaxed">
                    Shareable win cards celebrating completed tracks with verified accuracy scores and web share sheet links.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: ML Schema (Judges) */}
          {activeTab === "ml_schema" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-heading font-extrabold text-sm text-[#1C1917] dark:text-[#F5F5F4]">
                  Why Askilla is an AI/ML Track Innovation
                </h4>
                <p className="text-xs text-[#1C1917]/75 dark:text-[#F5F5F4]/75 font-sans leading-relaxed">
                  Askilla functions as an active telemetry engine for low-resource West African NLP research. Every student interaction logs structured training pairs (domain concepts, vernacular analogies, latency, and mastery scores) to build fine-tuning datasets for African AI models.
                </p>
              </div>

              {/* AI/ML Dataset Schema Box */}
              <div className="bg-[#FDEEE9]/20 dark:bg-[#2D1F1A]/10 rounded-2xl p-4 border border-[#C25B32]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#C25B32]">
                    Askilla-Telemetry-v1 Schema
                  </h4>
                  <button
                    type="button"
                    onClick={downloadTelemetrySample}
                    className="text-[10px] font-extrabold text-[#C25B32] hover:underline"
                  >
                    Download Sample JSON
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-[#F5F5F0] dark:bg-[#121212] p-3 rounded-xl border border-[#E0E0E0]/60 dark:border-white/5 overflow-x-auto text-[#1C1917] dark:text-[#F5F5F4]">
{`{
  "dataset_metadata": {
    "platform": "Askilla AI Tutor Engine",
    "showcase": "3MTT Knowledge Showcase 2.0 (AI/ML Track)",
    "timestamp": "2026-07-26T18:04:00.000Z"
  },
  "telemetry_record_sample": {
    "student_id": "user_3mtt_learner",
    "domain_topic": "Data Analysis & Spreadsheets",
    "language_mode": "pidgin",
    "concept_mastery_score": 0.95,
    "analogy_mapping_pair": {
      "term": "Data Cleaning",
      "simplified": "Arranging messy files so formula no go crash"
    },
    "attempt_latency_sec": 11.8,
    "ml_dataset_tag": "3MTT_Vernacular_EdTech_v1"
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#C25B32] text-[#1C1917] font-heading font-extrabold text-sm rounded-full hover:bg-[#94401F] active:scale-95 transition-all shadow-sm"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
