"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Flame, ArrowRight, Menu, X, Home, Target, User, LogOut, Globe, Sparkles, GraduationCap, Briefcase, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { VoiceInput } from "./VoiceInput";

// Custom premium SVG Pen component
const PremiumPen: React.FC<{ state: "writing" | "erasing" | "idle"; className?: string }> = ({ state, className = "" }) => {
  const animationClass =
    state === "writing"
      ? "animate-pen-write"
      : state === "erasing"
      ? "animate-pen-erase"
      : "animate-pen-idle";

  return (
    <div className={`inline-block origin-bottom-left transition-transform duration-300 ${animationClass} ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="penBody" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3A3A3A" className="pen-body-stop-0" />
            <stop offset="50%" stopColor="#1C1C1C" className="pen-body-stop-50" />
            <stop offset="100%" stopColor="#444444" className="pen-body-stop-100" />
          </linearGradient>
          <linearGradient id="penGold" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#A66A30" />
            <stop offset="50%" stopColor="#E9C496" />
            <stop offset="100%" stopColor="#8E5724" />
          </linearGradient>
          <linearGradient id="penSilver" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#D1D5DB" />
            <stop offset="50%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
        </defs>
        {/* Pen Shaft / Cap */}
        <path
          d="M28 36L48 16C50.5 13.5 54.5 13.5 57 16C59.5 18.5 59.5 22.5 57 25L37 45L28 36Z"
          fill="url(#penBody)"
          stroke="#1E1E1E"
          className="pen-stroke-dark"
          strokeWidth="1"
        />
        {/* Gold Ring Band */}
        <path
          d="M26 38L30 34L33 37L29 41L26 38Z"
          fill="url(#penGold)"
          stroke="#8E5724"
          strokeWidth="0.5"
        />
        {/* Silver Grip Section */}
        <path
          d="M19 45L27 37L30 40L22 48L19 45Z"
          fill="url(#penSilver)"
          stroke="#9CA3AF"
          strokeWidth="0.5"
        />
        {/* Gold Nib Base */}
        <path
          d="M12 52L20 44L23 47L15 55L12 52Z"
          fill="url(#penGold)"
          stroke="#8E5724"
          strokeWidth="0.5"
        />
        {/* Gold Nib Tip */}
        <path
          d="M6 58L14 50L16 52L8 60L6 58Z"
          fill="url(#penGold)"
          stroke="#8E5724"
          strokeWidth="0.5"
        />
        {/* Breather hole */}
        <circle cx="15" cy="49" r="1.2" fill="#1E1E1E" className="pen-fill-dark" />
        {/* Slit line */}
        <line
          x1="7"
          y1="57"
          x2="15"
          y2="49"
          stroke="#1E1E1E"
          className="pen-stroke-dark"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pen-write {
          0%, 100% {
            transform: rotate(15deg) translate(0, 0);
          }
          25% {
            transform: rotate(20deg) translate(1.5px, -1.5px);
          }
          50% {
            transform: rotate(10deg) translate(-1px, 1px);
          }
          75% {
            transform: rotate(18deg) translate(1px, -1px);
          }
        }
        @keyframes pen-erase {
          0%, 100% {
            transform: rotate(-10deg) translate(0, 0);
          }
          50% {
            transform: rotate(5deg) translate(-5px, 0.5px);
          }
        }
        @keyframes pen-idle {
          0%, 100% {
            transform: translateY(0) rotate(15deg);
          }
          50% {
            transform: translateY(-4px) rotate(15deg);
          }
        }
        .animate-pen-write {
          animation: pen-write 0.35s ease-in-out infinite;
        }
        .animate-pen-erase {
          animation: pen-erase 0.3s ease-in-out infinite;
        }
        .animate-pen-idle {
          animation: pen-idle 2s ease-in-out infinite;
        }
        /* Dark mode overrides for titanium/steel body & visible strokes */
        .dark .pen-body-stop-0 {
          stop-color: #8A8A8A;
        }
        .dark .pen-body-stop-50 {
          stop-color: #555555;
        }
        .dark .pen-body-stop-100 {
          stop-color: #B2B2B2;
        }
        .dark .pen-stroke-dark {
          stroke: #333333;
        }
        .dark .pen-fill-dark {
          fill: #333333;
        }
      `}} />
    </div>
  );
};


const trendingTopics = [
  "Excel Basics",
  "WAEC Math",
  "JAMB English",
  "Business Writing",
  "Data Analysis",
  "Negotiation Skills",
];

export const HomeDashboard: React.FC = () => {
  const {
    language,
    setCurrentTopic,
    setCourse,
    setIsLoadingModule,
    isLoadingModule,
    completedModuleIds,
    setScreen,
    logout,
    currentCourse,
  } = useAskillaStore();

  const [inputTopic, setInputTopic] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);
  const [animationState, setAnimationState] = useState<"writing" | "erasing" | "idle">("writing");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [activeDomain, setActiveDomain] = useState<"all" | "highschool" | "university" | "career">("all");
  const [trendingItems, setTrendingItems] = useState<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`/api/trending?domain=${activeDomain}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.trending) {
            setTrendingItems(data.trending);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch trending topics:", err);
      }
    };
    fetchTrending();
  }, [activeDomain]);

  const scrollCarousel = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const amount = dir === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const fullHeroText =
    language === "pidgin"
      ? "Wetin you wan learn?"
      : "What do you want to learn?";

  // Looping Typewriter and Deleting Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleType = () => {
      if (!isDeleting) {
        setAnimationState("writing");
        setTypedText((prev) => {
          const nextLength = prev.length + 1;
          if (nextLength > fullHeroText.length) {
            setAnimationState("idle");
            setTypingSpeed(2500); // Pause on full text for 2.5s
            setIsDeleting(true);
            return prev;
          }
          setTypingSpeed(65); // Standard typing speed
          return fullHeroText.slice(0, nextLength);
        });
      } else {
        setAnimationState("erasing");
        setTypedText((prev) => {
          const nextLength = prev.length - 1;
          if (nextLength < 0) {
            setAnimationState("idle");
            setTypingSpeed(600); // Pause on empty text for 0.6s
            setIsDeleting(false);
            return "";
          }
          setTypingSpeed(30); // Faster delete speed
          return fullHeroText.slice(0, nextLength);
        });
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typingSpeed, fullHeroText]);

  const handleSearch = (topicToSearch: string) => {
    if (!topicToSearch.trim()) return;
    const cleanTopic = topicToSearch.trim();
    setCurrentTopic(cleanTopic);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#2D2D2D] dark:text-[#EAEAEA] flex flex-col justify-between pb-24 md:pb-12 md:pl-64 transition-colors duration-200">
      {/* Sticky Header (Hidden on mobile, sticky on desktop) */}
      <header className="w-full px-4 md:px-12 py-4 hidden md:flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 sticky top-0 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 backdrop-blur-md z-40 transition-colors">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="p-2.5 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] hover:bg-[#F5F5F0] dark:hover:bg-[#121212] text-[#2D2D2D] dark:text-[#EAEAEA] md:hidden active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="font-heading font-extrabold text-2xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight md:hidden">
          Askilla
        </h1>

        {/* Desktop Title Header */}
        <div className="hidden md:block text-left">
          <h2 className="font-heading font-extrabold text-lg text-[#2D2D2D] dark:text-[#EAEAEA]">
            Learning Dashboard
          </h2>
          <p className="text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans">
            AI Micro-learning modules in {language.toUpperCase()}
          </p>
        </div>

        {/* Language badge (read-only, directs to Profile to change) */}
        <button
          type="button"
          onClick={() => setScreen("settings")}
          className="px-4 py-2 bg-[#FAFAD5] dark:bg-[#2D2D15] text-[#2D2D2D] dark:text-[#EAEAEA] font-bold text-xs rounded-full border border-[#BA7A3B]/40 capitalize hover:bg-[#BA7A3B]/20 dark:hover:bg-[#BA7A3B]/35 transition-colors"
        >
          {language} Mode
        </button>
      </header>

      {/* Main Hero & Search Section */}
      <main className="w-full px-4 md:px-12 pt-16 sm:pt-20 md:pt-8 space-y-6 sm:space-y-8 flex-1">
        {/* Dynamic Typing Greeting with Pen Cursor */}
        <motion.div
          className="text-center space-y-3 py-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2D2D2D] dark:text-[#EAEAEA] leading-tight min-h-[60px] text-center">
            <span>
              {typedText}
              <span className="inline-block w-1.5 h-7 sm:h-10 ml-1.5 bg-[#BA7A3B] animate-pulse align-middle rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#2D2D2D]/75 dark:text-[#EAEAEA]/75 font-sans leading-relaxed font-medium max-w-xl mx-auto">
            {language === "pidgin"
              ? "Search any topic for WAEC/JAMB exams, university courses, or career skills. Uncle Sabi go break down complex concepts into step-by-step micro-lessons for you."
              : "Search any topic across high school exams, university STEM courses, or career digital skills. Uncle Sabi transforms complex concepts into structured micro-lessons instantly."}
          </p>
        </motion.div>

        {/* Search Bar & Voice Input */}
        <motion.div
          className="max-w-3xl mx-auto space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(inputTopic);
            }}
            className="relative flex items-center w-full"
          >
            <Search className="absolute left-4 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 text-[#2D2D2D]/55 dark:text-[#EAEAEA]/55 shrink-0" />
            <input
              type="text"
              placeholder="Type a topic, subject, or skill..."
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              className="w-full pl-12 pr-28 sm:pl-16 sm:pr-40 py-4 sm:py-5 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] text-[#2D2D2D] dark:text-[#EAEAEA] placeholder-[#2D2D2D]/40 dark:placeholder-[#EAEAEA]/40 focus:outline-none focus:border-[#BA7A3B] text-sm sm:text-lg rounded-full shadow-sm font-sans transition-all duration-200"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
              <button
                type="submit"
                disabled={isLoadingModule || !inputTopic.trim()}
                className="px-5 py-2.5 sm:px-8 sm:py-3.5 bg-[#BA7A3B] text-[#2D2D2D] text-xs sm:text-base font-extrabold rounded-full hover:bg-[#A66A30] active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 shadow-sm animate-breathing"
              >
                <span>{isLoadingModule ? "Building..." : "Learn"}</span>
                {!isLoadingModule && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {/* Voice Search Button */}
          <VoiceInput
            onTranscript={(transcript) => {
              setInputTopic(transcript);
              handleSearch(transcript);
            }}
            label="Speak what you want to learn"
          />
        </motion.div>

        {/* Full Width Layout for Trending Carousel & Recent Learning */}
        <div className="space-y-6 pt-4">
        {/* Real-Time Domain-Categorized Trending Carousel */}
        <motion.div
          className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-4 sm:p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm space-y-4 text-left w-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Header & Category Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#BA7A3B] shrink-0" />
              <h2 className="text-xs sm:text-sm font-extrabold text-[#2D2D2D] dark:text-[#EAEAEA] uppercase tracking-wider">
                Trending Learning Tracks
              </h2>
            </div>

            {/* Domain Filter Tabs (Mobile Scrollable) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 w-full sm:w-auto">
              {[
                { id: "all" as const, label: "All Domains", icon: BookOpen },
                { id: "highschool" as const, label: "WAEC / JAMB", icon: GraduationCap },
                { id: "university" as const, label: "University & STEM", icon: Sparkles },
                { id: "career" as const, label: "Digital & Career", icon: Briefcase },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeDomain === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveDomain(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold shrink-0 whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      active
                        ? "bg-[#BA7A3B] text-[#2D2D2D] shadow-sm"
                        : "bg-[#F5F5F0] dark:bg-[#2C2C2C] text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 hover:bg-[#FAFAD5]/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Wrapper with Touch Controls */}
          <div className="relative group">
            {/* Scroll Left Button (Desktop) */}
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#1E1E1E] border-2 border-[#BA7A3B] shadow-xl items-center justify-center text-[#2D2D2D] dark:text-[#EAEAEA] hover:bg-[#FAFAD5] dark:hover:bg-[#2D2D15] hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6 text-[#BA7A3B]" />
            </button>

            {/* Horizontal Touch Scrollable Slider (Mobile Peek & Snap Center) */}
            <div
              ref={carouselRef}
              className="flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-0.5"
            >
              {(trendingItems.length > 0 ? trendingItems : trendingTopics.map((t, i) => ({
                id: `fallback_${i}`,
                topic: t,
                domainLabel: "Curriculum Track",
                learnerCount: "Verified Track",
                tag: "High Demand",
                description: `Master key concepts and formulas for ${t} with step-by-step guidance.`,
              }))).map((item) => (
                <button
                  key={item.id || item.topic}
                  type="button"
                  onClick={() => {
                    setInputTopic(item.topic);
                    handleSearch(item.topic);
                  }}
                  className="snap-center sm:snap-start shrink-0 w-[88vw] max-w-[340px] sm:w-[350px] md:w-[380px] p-5 sm:p-7 rounded-3xl bg-[#FAFAD5]/45 dark:bg-[#2D2D15]/25 border-2 border-[#BA7A3B]/40 hover:border-[#BA7A3B] text-left transition-all active:scale-[0.98] flex flex-col justify-between space-y-3.5 group hover:shadow-xl shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-[#BA7A3B]/20 border border-[#BA7A3B]/40 text-[#BA7A3B] text-[9px] sm:text-[10px] font-extrabold rounded-full uppercase tracking-wider truncate max-w-[65%]">
                        {item.domainLabel}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-extrabold uppercase truncate">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-sm sm:text-lg text-[#2D2D2D] dark:text-[#EAEAEA] group-hover:text-[#BA7A3B] transition-colors line-clamp-1">
                      {item.topic}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#2D2D2D]/75 dark:text-[#EAEAEA]/75 font-sans font-medium line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#BA7A3B]/25 text-[11px] sm:text-xs font-bold text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70">
                    <span className="truncate">{item.learnerCount}</span>
                    <div className="flex items-center gap-1 text-[#BA7A3B] font-extrabold shrink-0 group-hover:translate-x-1 transition-transform">
                      <span>Start Track</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Scroll Right Button (Desktop) */}
            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#1E1E1E] border-2 border-[#BA7A3B] shadow-xl items-center justify-center text-[#2D2D2D] dark:text-[#EAEAEA] hover:bg-[#FAFAD5] dark:hover:bg-[#2D2D15] hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6 text-[#BA7A3B]" />
            </button>
          </div>
        </motion.div>

        {/* Recent / Continue Learning */}
          <motion.div
            className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-sm space-y-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#2D2D2D] dark:text-[#EAEAEA] uppercase tracking-wider">
                <BookOpen className="w-5 h-5 text-[#BA7A3B]" />
                <span>Active Track &amp; Continue Learning</span>
              </div>

              {currentCourse && completedModuleIds.length >= currentCourse.modules.length && (
                <span className="px-2.5 py-1 bg-[#BA7A3B]/20 border border-[#BA7A3B]/40 text-[#BA7A3B] text-[10px] font-extrabold rounded-full uppercase">
                  100% Completed
                </span>
              )}
            </div>

            {currentCourse ? (
              <button
                type="button"
                onClick={() => {
                  if (completedModuleIds.length >= currentCourse.modules.length) {
                    setScreen("progress");
                  } else {
                    const resumeIdx = completedModuleIds.length;
                    useAskillaStore.setState({ activeModuleIndex: Math.min(resumeIdx, currentCourse.modules.length - 1) });
                    setScreen("module");
                  }
                }}
                className="w-full bg-[#FAFAD5]/50 dark:bg-[#1E1E1E]/60 border border-[#BA7A3B]/40 hover:border-[#BA7A3B] rounded-3xl p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md group active:scale-[0.98]"
              >
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BA7A3B] animate-pulse" />
                    <span className="text-[10px] font-extrabold uppercase text-[#BA7A3B]">
                      {completedModuleIds.length >= currentCourse.modules.length
                        ? "Course Completed"
                        : `Module ${Math.min(completedModuleIds.length + 1, currentCourse.modules.length)} of ${currentCourse.modules.length}`}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#2D2D2D] dark:text-[#EAEAEA] truncate">
                    {currentCourse.topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans font-medium mt-1 line-clamp-2">
                    {completedModuleIds.length >= currentCourse.modules.length
                      ? "All modules mastered! Click to view your verified certificate."
                      : `${currentCourse.modules[Math.min(completedModuleIds.length, currentCourse.modules.length - 1)]?.title || "Active Module"}`}
                  </p>
                  <div className="w-full h-2.5 bg-[#E0E0E0] dark:bg-[#2D2D2D] rounded-full overflow-hidden mt-3 shadow-inner">
                    <div 
                      className="h-full bg-[#BA7A3B] rounded-full transition-all duration-300" 
                      style={{ width: `${currentCourse.modules.length > 0 ? Math.min(100, Math.round((completedModuleIds.length / currentCourse.modules.length) * 100)) : 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end sm:justify-start gap-2 text-[11px] sm:text-sm font-extrabold text-[#BA7A3B] transition-all sm:group-hover:translate-x-1 shrink-0 w-full sm:w-auto uppercase sm:capitalize pt-2 sm:pt-0 border-t sm:border-t-0 border-[#BA7A3B]/10 sm:border-transparent mt-2 sm:mt-0">
                  <span>
                    {completedModuleIds.length >= currentCourse.modules.length ? "View Win Card" : "Continue"}
                  </span>
                  <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#BA7A3B] text-[#2D2D2D] dark:text-[#1E1E1E] shadow-sm shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </button>
            ) : (
              <div className="p-5 rounded-2xl bg-[#F5F5F0]/65 dark:bg-[#1E1E1E]/40 border border-dashed border-[#E0E0E0] dark:border-[#2D2D2D] text-center space-y-2 py-8">
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#2D2D2D]/55 dark:text-[#EAEAEA]/55">
                  No active tracks yet.
                </p>
                <p className="text-[11px] font-sans text-[#2D2D2D]/45 dark:text-[#EAEAEA]/45">
                  Type a topic in the search bar above to start.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 md:px-12 py-4 text-center text-[11px] text-[#2D2D2D]/40 dark:text-[#EAEAEA]/40 border-t border-[#E0E0E0]/40 dark:border-[#2D2D2D]/40 mt-12">
        3MTT Knowledge Showcase 2.0 — Askilla AI Tutor
      </footer>

      {/* Dynamic Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 max-w-[80vw] bg-white dark:bg-[#1E1E1E] border-r border-[#E0E0E0] dark:border-[#2D2D2D] z-50 md:hidden p-6 flex flex-col justify-between shadow-2xl text-left"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pb-4">
                  <div className="text-left">
                    <h2 className="font-heading font-extrabold text-2xl text-[#2D2D2D] dark:text-[#EAEAEA] tracking-tight">Askilla</h2>
                    <p className="text-xs text-[#2D2D2D]/60 dark:text-[#EAEAEA]/60 font-sans mt-0.5">Ask anything. Sabi everything.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 rounded-full hover:bg-[#F5F5F0] dark:hover:bg-[#2D2D2D] text-[#2D2D2D] dark:text-[#EAEAEA]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-[#FAFAD5] dark:bg-[#2D2D15] rounded-2xl p-3.5 border-2 border-[#BA7A3B] dark:border-[#8E5724] flex items-center justify-start gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#2D2D2D] dark:border-white/20 bg-white dark:bg-[#1E1E1E] flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/uncle_sabi.png" alt="Uncle Sabi" className="w-full h-full object-cover scale-105" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-extrabold text-xs text-[#2D2D2D] dark:text-[#EAEAEA]">Uncle Sabi</h3>
                    <span className="inline-block px-2 py-0.5 bg-[#BA7A3B] text-[#2D2D2D] text-[9px] font-extrabold rounded-full capitalize">{language} Mode</span>
                  </div>
                </div>

                <nav className="space-y-1.5">
                  {[
                    { screen: "home" as const, label: "Home", icon: Home },
                    { screen: "progress" as const, label: "My Learning Progress", icon: BookOpen },
                    { screen: "module" as const, label: "Active Practice", icon: Target },
                    { screen: "settings" as const, label: "Profile Settings", icon: User }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.screen}
                        type="button"
                        onClick={() => {
                          setScreen(item.screen);
                          setMobileDrawerOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold text-sm text-[#2D2D2D]/80 dark:text-[#EAEAEA]/80 hover:bg-[#F5F5F0] dark:hover:bg-[#121212] transition-colors"
                      >
                        <Icon className="w-5 h-5 text-current" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-[#E0E0E0]/60 dark:border-[#2D2D2D]/60 pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full py-3 px-4 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Session</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cooking/Building Popup Simulator overlay to hook the user */}
      <AnimatePresence>
        {isLoadingModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 max-w-sm w-full border-2 border-[#BA7A3B] dark:border-[#8E5724] shadow-2xl space-y-6"
            >
              {/* Learning / Course Building Animation */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#BA7A3B]/40 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 rounded-full border-4 border-[#BA7A3B]/10 border-t-[#BA7A3B] animate-spin" style={{ animationDuration: '1.5s' }} />
                
                <div className="relative flex items-center justify-center z-10">
                  <BookOpen className="w-10 h-10 text-[#BA7A3B] animate-pulse" />
                  <Sparkles className="w-4 h-4 text-[#BA7A3B] absolute -top-3 -right-2 animate-bounce" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-heading font-extrabold text-xl text-[#2D2D2D] dark:text-[#EAEAEA] flex items-center justify-center gap-1.5">
                  <span>Uncle Sabi is generating...</span>
                </h3>
                <p className="text-sm text-[#2D2D2D]/70 dark:text-[#EAEAEA]/70 font-sans font-semibold">
                  Compiling your custom learning modules. Sabi power takes 15 seconds!
                </p>
              </div>

              {/* Progress bar animation */}
              <div className="w-full h-2 bg-[#E0E0E0] dark:bg-[#2D2D2D] rounded-full overflow-hidden">
                <div className="h-full bg-[#BA7A3B] rounded-full animate-pulse" style={{ width: '80%' }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
