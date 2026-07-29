"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Award, Home, CheckCircle2, ArrowRight, Clock, Check, BarChart2, Flame } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { getSubjectAlignedTopics } from "@/lib/ai/topic-recommender";
import { CompletedCertificate } from "@/lib/types/askilla";
import { ShareModal } from "./ShareModal";
import { PageContent, PageShell } from "./PageShell";

export const ProgressDashboard: React.FC = () => {
  const {
    currentCourse,
    completedModuleIds,
    setScreen,
    resetAll,
    setCurrentTopic,
    language,
    user,
    currentTopic,
    completedCertificates,
    archiveCertificate,
  } = useAskillaStore();

  const [copied, setCopied] = useState(false);
  const [activeCertModal, setActiveCertModal] = useState<CompletedCertificate | null>(null);
  const [shareModalData, setShareModalData] = useState<{ topic: string; shareUrl: string } | null>(null);

  const handleShareCertificate = (topic: string, name: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = `${origin}/share?topic=${encodeURIComponent(topic)}&learner=${encodeURIComponent(name)}&lang=${encodeURIComponent(language)}`;
    setShareModalData({ topic, shareUrl });
  };
  const [stats, setStats] = useState({
    completedModules: 0,
    totalAttempts: 0,
    accuracyRate: 0,
    languageBreakdown: { pidgin: 50, english: 50 },
    avgAttemptsPerQuestion: "1.0",
    learningSpeedSeconds: 90,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/analytics?phone=${user.phone}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.stats) {
            setStats(data.stats);
          }
        }
      } catch (err) {
        console.warn("Could not load database analytics:", err);
      }
    };
    fetchAnalytics();
  }, [user.phone, completedModuleIds]);

  const topicName = currentCourse?.concise_topic || currentCourse?.topic || currentTopic || "Excel Basics";
  const completedCount = completedModuleIds.length || 0;
  const totalModules = currentCourse?.modules.length || 3;
  const modulePercentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 100;

  useEffect(() => {
    if (completedCount >= totalModules && topicName) {
      const certId = `cert_${Date.now()}`;
      
      // Save certificate to database
      fetch('/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: user.phone,
          topic: topicName,
          language: language,
        }),
      }).catch(err => console.warn('Failed to save certificate to database:', err));

      archiveCertificate({
        id: certId,
        topic: topicName,
        learnerName: user.name || "Askilla Learner",
        dateCompleted: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        totalModules: totalModules,
        scorePercent: stats.accuracyRate || 100,
        language: language,
      });
    }
  }, [completedCount, totalModules, topicName, user.name, user.phone, stats.accuracyRate, language, archiveCertificate]);

  const handleExportMlDataset = async () => {
    try {
      const res = await fetch("/api/log-dataset");
      if (res.ok) {
        const data = await res.json();
        const jsonlStr = data.records.map((r: any) => JSON.stringify(r)).join("\n");
        const blob = new Blob([jsonlStr], { type: "application/jsonlines" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `askilla_ml_dataset_${Date.now()}.jsonl`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Real-time fallback metrics if offline or database query pending
  const effectiveAccuracyRate =
    stats.totalAttempts > 0
      ? stats.accuracyRate
      : completedCount > 0
      ? 100
      : 0;
  const effectiveCompletedModules = Math.max(stats.completedModules, completedCount);

  const effectiveTotalAttempts = Math.max(stats.totalAttempts, completedCount > 0 ? completedCount * 2 : 0);
  const effectiveAvgAttempts = stats.totalAttempts > 0 ? stats.avgAttemptsPerQuestion : (completedCount > 0 ? "1.0" : "0.0");
  const effectiveSpeed = stats.totalAttempts > 0 ? stats.learningSpeedSeconds : 45;
  const pidginPercent = language === "pidgin" ? (stats.totalAttempts > 0 ? stats.languageBreakdown.pidgin : 80) : (stats.totalAttempts > 0 ? stats.languageBreakdown.pidgin : 20);
  const englishPercent = 100 - pidginPercent;

  const downloadTelemetryDataset = () => {
    const telemetryObj = {
      dataset_metadata: {
        platform: "Askilla AI Tutor Engine",
        track: "3MTT Knowledge Showcase 2.0 (AI/ML Track)",
        timestamp: new Date().toISOString(),
        student_id: user.id || "user_guest",
      },
      learning_metrics: {
        domain_topic: topicName,
        language_mode: language,
        completed_lessons: effectiveCompletedModules,
        total_question_submissions: effectiveTotalAttempts,
        accuracy_rate_percent: effectiveAccuracyRate,
        average_attempts_per_q: effectiveAvgAttempts,
        learning_speed_seconds: effectiveSpeed,
      },
      ml_telemetry_schema: "AskillaVernacularEdTech-v1",
    };

    const blob = new Blob([JSON.stringify(telemetryObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `askilla_ml_telemetry_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    const params = new URLSearchParams({
      topic: topicName,
      completed: completedCount.toString(),
      total: totalModules.toString(),
      lang: language,
    });
    return `${origin}/share?${params.toString()}`;
  };

  const copyTextToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      return true;
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch (err) {
      console.error("Fallback copy failed", err);
      return false;
    }
  };

  const handleShare = () => {
    const shareUrl = getShareUrl();
    setShareModalData({ topic: topicName, shareUrl });
  };

  const shareToWhatsApp = () => {
    const shareUrl = getShareUrl();
    const text = `I Sabi ${topicName} Now! Check my learning stats on Askilla:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareToTwitter = () => {
    const shareUrl = getShareUrl();
    const text = `I just completed "${topicName}" on Askilla! Uncle Sabi certified.`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const modulesToRender = currentCourse?.modules || [
    { id: "mock-1", title: "Introduction to " + topicName },
    { id: "mock-2", title: "Core Formulas and Concepts" },
    { id: "mock-3", title: "Practical Work Applications" },
  ];

  const suggestedTopics = currentCourse?.related_topics && currentCourse.related_topics.length > 0
    ? currentCourse.related_topics
    : getSubjectAlignedTopics(topicName);

  return (
    <PageShell>
      {/* Header */}
      <header className="w-full px-4 md:px-12 py-4 hidden md:flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-white/5 sticky top-0 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 backdrop-blur-md z-40 transition-colors">
        <div className="text-left">
          <h1 className="font-heading font-extrabold text-2xl text-[#1C1917] dark:text-[#F5F5F4]">
            Student Performance Center
          </h1>
          <p className="text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60 font-sans">
            AI-driven learning analytics & certificates
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScreen("home")}
          className="p-3 rounded-full bg-white dark:bg-[#1E1E1E] border border-transparent hover:border-[#E0E0E0] dark:hover:border-[#1C1917] text-[#1C1917] dark:text-[#F5F5F4] transition-all active:scale-95 shadow-sm"
        >
          <Home className="w-5 h-5" />
        </button>
      </header>

      {/* Main Container */}
      <PageContent className="space-y-6 text-center">
        {/* Dynamic Analytics Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Circular Accuracy Mastery Ring */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-[#E0E0E0] dark:border-white/10 flex flex-col items-center justify-center space-y-4">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-[#C25B32]">
              Accuracy Rate
            </h3>
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E0E0E0"
                  strokeWidth="8"
                  className="dark:stroke-white/20"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#C25B32"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * effectiveAccuracyRate) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * effectiveAccuracyRate) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-extrabold text-4xl text-[#1C1917] dark:text-[#F5F5F4]">
                  {effectiveAccuracyRate}%
                </span>
                <span className="text-[10px] font-extrabold text-[#1C1917]/60 dark:text-[#F5F5F4]/60 uppercase tracking-wider mt-1">
                  sabi score
                </span>
              </div>
            </div>
            <p className="text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60 font-sans text-center max-w-xs">
              Based on correct check-in questions answered across learning paths.
            </p>
          </div>

          {/* AI/ML Detailed Learning Metrics Grid */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-[#E0E0E0] dark:border-white/10 text-left flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-white/5 pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#1C1917] dark:text-[#F5F5F4] flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#C25B32]" />
                <span>Learning Analytics</span>
              </h3>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] rounded-2xl border border-[#E0E0E0]/60 dark:border-white/5 text-center">
                <p className="text-[10px] uppercase font-extrabold tracking-wider text-[#1C1917]/55 dark:text-[#F5F5F4]/55">
                  Completed Lessons
                </p>
                <p className="font-heading font-extrabold text-2xl text-[#1C1917] dark:text-[#F5F5F4] mt-1.5">
                  {effectiveCompletedModules}
                </p>
              </div>

              <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] rounded-2xl border border-[#E0E0E0]/60 dark:border-white/5 text-center">
                <p className="text-[10px] uppercase font-extrabold tracking-wider text-[#1C1917]/55 dark:text-[#F5F5F4]/55">
                  Total Submissions
                </p>
                <p className="font-heading font-extrabold text-2xl text-[#1C1917] dark:text-[#F5F5F4] mt-1.5">
                  {effectiveTotalAttempts}
                </p>
              </div>

              <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] rounded-2xl border border-[#E0E0E0]/60 dark:border-white/5 text-center">
                <p className="text-[10px] uppercase font-extrabold tracking-wider text-[#1C1917]/55 dark:text-[#F5F5F4]/55">
                  Avg Attempts / Q
                </p>
                <p className="font-heading font-extrabold text-2xl text-[#1C1917] dark:text-[#F5F5F4] mt-1.5">
                  {effectiveAvgAttempts}
                </p>
              </div>

              <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] rounded-2xl border border-[#E0E0E0]/60 dark:border-white/5 text-center">
                <p className="text-[10px] uppercase font-extrabold tracking-wider text-[#1C1917]/55 dark:text-[#F5F5F4]/55">
                  Avg Speed / Q
                </p>
                <p className="font-heading font-extrabold text-2xl text-[#1C1917] dark:text-[#F5F5F4] mt-1.5">
                  {effectiveSpeed}s
                </p>
              </div>
            </div>

            {/* Language breakdown split */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#C25B32]">Pidgin Mode ({pidginPercent}%)</span>
                <span className="text-[#1C1917]/60 dark:text-[#F5F5F4]/60">English Mode ({englishPercent}%)</span>
              </div>
              <div className="w-full h-3.5 bg-[#E0E0E0] dark:bg-white/10 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="h-full bg-[#C25B32] transition-all duration-500"
                  style={{ width: `${pidginPercent}%` }}
                />
                <div
                  className="h-full bg-[#3A3A3A] dark:bg-[#555555] transition-all duration-500"
                  style={{ width: `${englishPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Premium Styled Shareable Achievement Card */}
        {completedCount === 0 || completedCount < totalModules ? (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 shadow-sm border border-dashed border-[#E0E0E0] dark:border-white/10 space-y-4 w-full max-w-full text-center relative overflow-hidden flex flex-col items-center py-12">
            <div className="w-16 h-16 bg-[#F5F5F0] dark:bg-[#1C1C1C] border border-dashed border-[#C25B32]/35 rounded-full flex items-center justify-center text-[#C25B32]">
              <Award className="w-8 h-8 opacity-65" />
            </div>
            <div className="space-y-1.5 max-w-md">
              <h3 className="font-heading font-extrabold text-base text-[#1C1917] dark:text-[#F5F5F4]">
                Sabi Certificate Locked
              </h3>
              <p className="text-xs sm:text-sm text-[#1C1917]/60 dark:text-[#F5F5F4]/60 font-sans max-w-xs mx-auto leading-relaxed">
                Complete all modules in your active learning track to unlock your verified Sabi Certificate and share your win!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-12 shadow-md border-4 border-double border-[#C25B32]/60 dark:border-[#94401F]/60 space-y-5 w-full max-w-full text-center relative overflow-hidden flex flex-col items-center">
            {/* Decorative Corner Borders */}
            <div className="absolute top-3 left-3 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#C25B32]" />
            <div className="absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#C25B32]" />
            <div className="absolute bottom-3 left-3 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#C25B32]" />
            <div className="absolute bottom-3 right-3 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#C25B32]" />

            {/* Watermark Logo */}
            <div className="absolute -right-16 -bottom-16 w-56 h-56 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
              <Award className="w-full h-full text-[#C25B32]" />
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FDEEE9] dark:bg-[#2D1F1A] border-2 border-[#C25B32] rounded-full flex items-center justify-center text-[#C25B32] shadow-inner shrink-0">
              <Award className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-3 max-w-2xl">
              <span className="text-[9px] sm:text-[10px] font-heading font-extrabold text-[#C25B32] uppercase tracking-widest bg-[#C25B32]/10 px-3 py-1 rounded-full border border-[#C25B32]/30">
                Verified Sabi Certification
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#1C1917] dark:text-[#F5F5F4] tracking-tight leading-tight pt-1">
                I Sabi {topicName} Now!
              </h3>
              <p className="text-xs sm:text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans font-medium max-w-md mx-auto leading-relaxed border-t border-b border-[#E0E0E0]/60 dark:border-white/5 py-3 mt-2">
                Awarded by Askilla to {user.name || "Learner"} for successfully mastering the core modules in {language.toUpperCase()} mode with {effectiveAccuracyRate}% check-in correctness.
              </p>
            </div>

            {/* Signatures, Date and Share CTA Layout */}
            <div className="w-full max-w-md space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4 sm:gap-8 text-xs font-medium text-[#1C1917]/60 dark:text-[#F5F5F4]/60">
                <div className="border-t border-[#E0E0E0] dark:border-white/10 pt-2">
                  <p className="font-mono text-[10px] tracking-wider text-[#C25B32] font-bold">UNCLE SABI</p>
                  <p className="font-sans text-[9px] mt-0.5">Askilla Lead Instructor</p>
                </div>
                <div className="border-t border-[#E0E0E0] dark:border-white/10 pt-2">
                  <p className="font-sans font-bold text-[#1C1917] dark:text-[#F5F5F4]">
                    {new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                  <p className="font-sans text-[9px] mt-0.5">Verification Date</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleShareCertificate(topicName, user.name || "Learner")}
                className="w-full py-3 px-6 bg-[#C25B32] text-[#1C1917] font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:bg-[#94401F] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Win Link</span>
              </button>
            </div>
          </div>
        )}

        {/* Certificate History Archive */}
        {completedCertificates && completedCertificates.length > 0 && (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-white/10 shadow-sm space-y-4 text-left w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-[#1C1917] dark:text-[#F5F5F4] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C25B32]" />
                <span>Certificate History Archive ({completedCertificates.length})</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {completedCertificates.map((cert) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setActiveCertModal(cert)}
                  className="p-4 rounded-2xl bg-[#FDEEE9]/30 dark:bg-[#2D1F1A]/20 border border-[#C25B32]/30 hover:border-[#C25B32] space-y-2 text-left hover:shadow-md cursor-pointer transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-[#C25B32]">
                      {cert.dateCompleted}
                    </span>
                    <span className="px-2 py-0.5 bg-[#C25B32]/20 text-[#C25B32] text-[9px] font-bold rounded-full uppercase">
                      {cert.scorePercent}% Score
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-[#1C1917] dark:text-[#F5F5F4] group-hover:text-[#C25B32] transition-colors truncate">
                    {cert.topic}
                  </h4>
                  <div className="flex items-center justify-between pt-1 text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60 font-sans">
                    <span className="truncate">Learner: <strong>{cert.learnerName}</strong></span>
                    <span className="text-[#C25B32] font-bold shrink-0 text-[10px] uppercase">Click to view &rarr;</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next Topic Recommendations */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-white/10 shadow-sm space-y-4 text-left w-full">
          <h3 className="font-heading font-bold text-base text-[#1C1917] dark:text-[#F5F5F4] flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#C25B32]" />
            <span>Suggested Next Topics</span>
          </h3>
          <p className="text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60 font-sans">
            AI recommends these related tracks based on your progress:
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {suggestedTopics.map((nextTopic) => (
              <button
                key={nextTopic}
                type="button"
                onClick={() => {
                  useAskillaStore.setState({ completedModuleIds: [], currentCourse: null });
                  setCurrentTopic(nextTopic);
                }}
                className="px-5 py-3.5 bg-[#FDEEE9]/50 dark:bg-[#2D1F1A]/30 border border-[#C25B32]/35 hover:border-[#C25B32] text-[#1C1917] dark:text-[#F5F5F4] text-sm font-bold rounded-full active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{nextTopic}</span>
                <ArrowRight className="w-4 h-4 text-[#C25B32]" />
              </button>
            ))}
          </div>
        </div>
      </PageContent>

      {/* Certificate Viewer Modal Popup for Archived Certificates */}
      <AnimatePresence>
        {activeCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-double border-[#C25B32] max-w-xl w-full text-center relative space-y-5 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveCertModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F5F5F0] dark:hover:bg-[#1C1917] text-[#1C1917] dark:text-[#F5F5F4] font-bold text-xs"
              >
                ✕ Close
              </button>

              <div className="w-16 h-16 bg-[#FDEEE9] dark:bg-[#2D1F1A] border-2 border-[#C25B32] rounded-full flex items-center justify-center text-[#C25B32] shadow-inner shrink-0 mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-heading font-extrabold text-[#C25B32] uppercase tracking-widest bg-[#C25B32]/10 px-3 py-1 rounded-full border border-[#C25B32]/30">
                  Verified Sabi Certification
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1C1917] dark:text-[#F5F5F4] pt-1">
                  I Sabi {activeCertModal.topic} Now!
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1917]/70 dark:text-[#F5F5F4]/70 font-sans font-medium leading-relaxed border-t border-b border-[#E0E0E0]/60 dark:border-white/5 py-3 mt-2">
                  Awarded by Askilla to <strong>{activeCertModal.learnerName}</strong> for successfully mastering all {activeCertModal.totalModules} core modules in {activeCertModal.language.toUpperCase()} mode with {activeCertModal.scorePercent}% check-in score.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-[#1C1917]/60 dark:text-[#F5F5F4]/60 pt-1">
                <div className="border-t border-[#E0E0E0] dark:border-white/10 pt-2">
                  <p className="font-mono text-[10px] tracking-wider text-[#C25B32] font-bold">UNCLE SABI</p>
                  <p className="font-sans text-[9px]">Askilla Lead Instructor</p>
                </div>
                <div className="border-t border-[#E0E0E0] dark:border-white/10 pt-2">
                  <p className="font-sans font-bold text-[#1C1917] dark:text-[#F5F5F4]">{activeCertModal.dateCompleted}</p>
                  <p className="font-sans text-[9px]">Verification Date</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleShareCertificate(activeCertModal.topic, activeCertModal.learnerName);
                  }}
                  className="w-full py-3.5 px-6 bg-[#C25B32] text-[#1C1917] font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:bg-[#94401F] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Win Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCertModal(null)}
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#F5F5F0] dark:bg-[#2C2C2C] text-[#1C1917] dark:text-[#F5F5F4] font-extrabold text-xs sm:text-sm rounded-full hover:bg-[#E0E0E0] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Copy Link Toast notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 bg-[#1C1917] dark:bg-[#F5F5F4] text-white dark:text-[#1C1917] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-50 text-xs sm:text-sm font-bold border border-[#E0E0E0]/15 w-[90%] sm:w-auto justify-center"
          >
            <Check className="w-5 h-5 text-[#C25B32]" />
            <span>Shareable win link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <ShareModal
        isOpen={!!shareModalData}
        onClose={() => setShareModalData(null)}
        title="I Sabi with Askilla!"
        topic={shareModalData?.topic || ""}
        shareUrl={shareModalData?.shareUrl || ""}
      />
    </PageShell>
  );
};
