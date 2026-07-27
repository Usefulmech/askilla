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
          className="bg-white dark:bg-[#1E1E1E] border-2 border-[#BA7A3B]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-left text-[#2D2D2D] dark:text-[#EAEAEA] relative"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAD5] dark:bg-[#2D2D15] text-[#2D2D2D] dark:text-[#EAEAEA] hover:bg-[#BA7A3B]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-8">
            <span className="text-[10px] font-heading font-extrabold text-[#BA7A3B] uppercase tracking-widest bg-[#BA7A3B]/10 px-3 py-1 rounded-full border border-[#BA7A3B]/30 inline-block">
              3MTT Knowledge Showcase 2.0 • AI/ML Track
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight">
              About Askilla
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 gap-4 text-xs font-heading font-extrabold">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "overview"
                  ? "text-[#BA7A3B]"
                  : "text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50 hover:text-[#2D2D2D] dark:hover:text-[#EAEAEA]"
              }`}
            >
              <span>Platform Overview</span>
              {activeTab === "overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BA7A3B] rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ml_schema")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "ml_schema"
                  ? "text-[#BA7A3B]"
                  : "text-[#2D2D2D]/50 dark:text-[#EAEAEA]/50 hover:text-[#2D2D2D] dark:hover:text-[#EAEAEA]"
              }`}
            >
              <span>AI/ML Telemetry Schema (Judges)</span>
              {activeTab === "ml_schema" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BA7A3B] rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#2D2D2D]/75 dark:text-[#EAEAEA]/75 font-sans leading-relaxed">
                Askilla is an AI-powered vernacular micro-learning engine built to democratize education across Nigeria. Powered by OpenAI GPT-4o and Web Speech API, it transforms complex STEM and digital skills into step-by-step lessons natively in standard English and Nigerian Pidgin.
              </p>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#FAFAD5]/40 dark:bg-[#2D2D15]/20 border border-[#BA7A3B]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#BA7A3B] font-extrabold text-xs uppercase tracking-wider">
                    <Brain className="w-4 h-4" />
                    <span>Adaptive AI Tutor</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 font-sans leading-relaxed">
                    Persona-driven instructor (Uncle Sabi) offering structured lessons, real-world analogies, and inline SVG visualizers.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAD5]/40 dark:bg-[#2D2D15]/20 border border-[#BA7A3B]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#BA7A3B] font-extrabold text-xs uppercase tracking-wider">
                    <Database className="w-4 h-4" />
                    <span>ML Interaction Pipeline</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 font-sans leading-relaxed">
                    Captures real-time learner interaction vectors, latency, and concept mastery curves for AI model fine-tuning.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAD5]/40 dark:bg-[#2D2D15]/20 border border-[#BA7A3B]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#BA7A3B] font-extrabold text-xs uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <span>Linguistic Isolation</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 font-sans leading-relaxed">
                    Strict boundary control between standard English and Nigerian Pidgin, preventing language drift while maintaining technical rigor.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAD5]/40 dark:bg-[#2D2D15]/20 border border-[#BA7A3B]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#BA7A3B] font-extrabold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Verified Sabi Certs</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 font-sans leading-relaxed">
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
                <h4 className="font-heading font-extrabold text-sm text-[#2D2D2D] dark:text-[#EAEAEA]">
                  Why Askilla is an AI/ML Track Innovation
                </h4>
                <p className="text-xs text-[#2D2D2D]/75 dark:text-[#EAEAEA]/75 font-sans leading-relaxed">
                  Askilla functions as an active telemetry engine for low-resource West African NLP research. Every student interaction logs structured training pairs (domain concepts, vernacular analogies, latency, and mastery scores) to build fine-tuning datasets for African AI models.
                </p>
              </div>

              {/* AI/ML Dataset Schema Box */}
              <div className="bg-[#FAFAD5]/20 dark:bg-[#2D2D15]/10 rounded-2xl p-4 border border-[#BA7A3B]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#BA7A3B]">
                    Askilla-Telemetry-v1 Schema
                  </h4>
                  <button
                    type="button"
                    onClick={downloadTelemetrySample}
                    className="text-[10px] font-extrabold text-[#BA7A3B] hover:underline"
                  >
                    Download Sample JSON
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-[#F5F5F0] dark:bg-[#121212] p-3 rounded-xl border border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 overflow-x-auto text-[#2D2D2D] dark:text-[#EAEAEA]">
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
              className="px-6 py-3 bg-[#BA7A3B] text-[#2D2D2D] font-heading font-extrabold text-sm rounded-full hover:bg-[#A66A30] active:scale-95 transition-all shadow-sm"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
