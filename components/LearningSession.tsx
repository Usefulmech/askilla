"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Home, RotateCcw, Eye, Lightbulb, Check, ChevronRight } from "lucide-react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { AudioPlayer } from "./AudioPlayer";
import { VoiceInput } from "./VoiceInput";
import { PageShell } from "./PageShell";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ChatMessage {
  id: string;
  sender: "uncle_sabi" | "student";
  type: "text" | "level_select" | "explanation" | "visualization" | "question" | "feedback" | "next_module_cta";
  content: string;
  options?: string[];
  data?: any;
}

export const LearningSession: React.FC = () => {
  const {
    currentTopic,
    currentCourse,
    setCourse,
    setScreen,
    user,
    language,
    completedModuleIds,
  } = useAskillaStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hintText, setHintText] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];

    if (lastMsg.sender === "student" || isLoading || hintText || showAnswer) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (lastMsg.sender === "uncle_sabi") {
      const msgElement = document.getElementById(lastMsg.id);
      if (msgElement) {
        msgElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isLoading, hintText, showAnswer]);

  // Initial Welcome, Resume Session, or Finished Track Options
  useEffect(() => {
    if (messages.length === 0) {
      if (currentCourse) {
        // Check if user has already earned a certificate for this topic
        const hasCertificate = useAskillaStore.getState().completedCertificates.some(cert => cert.topic === currentCourse.topic);
        const isFinished = hasCertificate || (completedModuleIds.length >= currentCourse.modules.length);

        if (isFinished) {
          const finishedMsg =
            language === "pidgin"
              ? `Uncle Sabi dey proud of you well well! You don already master **${currentCourse.topic}**! Wetin you wan do next?`
              : `Uncle Sabi is super proud of your dedication! You have already mastered **${currentCourse.topic}**! What would you like to do next?`;

          const nextTopicSuggestion = currentCourse.related_topics?.[0] || `${currentCourse.topic} Advanced`;

          setMessages([
            {
              id: "finished_prompt",
              sender: "uncle_sabi",
              type: "level_select",
              content: finishedMsg,
              options: ["View My Win Card", `Start Next Track: ${nextTopicSuggestion}`, "Start Over"],
            },
          ]);
        } else {
          // Active ongoing session
          const resumeMsg =
            language === "pidgin"
              ? `Uncle Sabi see say you get ongoing learning track on **${currentCourse.topic}** (${completedModuleIds.length} of ${currentCourse.modules.length} modules completed). Wetin you wan do today?`
              : `I see you have an ongoing course on **${currentCourse.topic}** (${completedModuleIds.length} of ${currentCourse.modules.length} modules completed). What would you like to do?`;

          setMessages([
            {
              id: "resume_prompt",
              sender: "uncle_sabi",
              type: "level_select",
              content: resumeMsg,
              options: ["Continue Learning", "Start Over"],
            },
          ]);
        }
      } else if (currentTopic) {
        const levelPrompt =
          language === "pidgin"
            ? `Oya! Make we start to dey learn **${currentTopic}**. Wetin be your level for this topic?`
            : `Let's start learning **${currentTopic}**! What is your current level?`;
            
        setMessages([
          {
            id: "level_prompt",
            sender: "uncle_sabi",
            type: "level_select",
            content: levelPrompt,
            options: ["Complete Beginner", "Know a little"],
          },
        ]);
      } else {
        // New user - show empty state, no prefilled content
        setMessages([]);
      }
    }
  }, [currentTopic, language, currentCourse, completedModuleIds]);

  // Clean markdown xml block wrappers from AI SVG output
  const cleanSvg = (svgStr: string) => {
    if (!svgStr) return "";
    let clean = svgStr
      .replace(/```(xml|svg|html)?/gi, "")
      .replace(/```/g, "")
      .trim();
    return clean;
  };

  // Extract a friendly, human-readable site name from a URL or source string
  const friendlySiteName = (urlStr: string) => {
    if (!urlStr) return "";
    try {
      // Strip protocol and www
      let clean = urlStr.replace(/^(https?:\/\/)?(www\.)?/i, "").replace(/^—?\s*source:\s*/i, "");
      const slashIdx = clean.indexOf("/");
      if (slashIdx !== -1) clean = clean.substring(0, slashIdx);
      // Map common domains to friendly names
      const nameMap: Record<string, string> = {
        "khanacademy.org": "Khan Academy",
        "coursera.org": "Coursera",
        "w3schools.com": "W3Schools",
        "geeksforgeeks.org": "GeeksforGeeks",
        "google.com": "Google Digital Skills",
        "asana.com": "Asana",
        "hubspot.com": "HubSpot",
        "udemy.com": "Udemy",
        "edx.org": "edX",
        "freecodecamp.org": "freeCodeCamp",
        "microsoft.com": "Microsoft Learn",
        "developer.mozilla.org": "MDN Web Docs",
        "digitalskills.withgoogle.com": "Google Digital Skills",
      };
      return nameMap[clean.toLowerCase()] || clean.replace(/\.\w+$/, "").replace(/[-_]/g, " ").replace(/^./, s => s.toUpperCase());
    } catch {
      return urlStr;
    }
  };

  // Handles custom user query submission in chat box
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_chat_${Date.now()}`,
      sender: "student",
      type: "text",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        sender: m.sender,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatHistory: history,
          topic: currentTopic,
          language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyMsg: ChatMessage = {
          id: `reply_${Date.now()}`,
          sender: "uncle_sabi",
          type: "text",
          content: data.reply,
        };
        setMessages((prev) => [...prev, replyMsg]);
      } else {
        const failMsg: ChatMessage = {
          id: `fail_${Date.now()}`,
          sender: "uncle_sabi",
          type: "text",
          content:
            language === "pidgin"
              ? "Ah, I get network issue to process this. Abeg try again."
              : "Apologies, I encountered an issue replying to you. Please try again.",
        };
        setMessages((prev) => [...prev, failMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles Level Selection and calls generate API
  const handleSelectLevel = async (lvl: string) => {
    if (lvl === "View My Win Card") {
      setScreen("progress");
      return;
    }

    if (lvl.startsWith("Start Next Track: ")) {
      const nextTopicName = lvl.replace("Start Next Track: ", "").trim();
      useAskillaStore.setState({ currentTopic: nextTopicName, completedModuleIds: [], currentCourse: null });

      const nextMsg: ChatMessage = {
        id: `next_track_${Date.now()}`,
        sender: "uncle_sabi",
        type: "text",
        content:
          language === "pidgin"
            ? `Oya! Make we enter progressive topic: **${nextTopicName}**!`
            : `Great choice! Let me prepare your lessons for **${nextTopicName}**!`,
      };

      const levelPrompt =
        language === "pidgin"
          ? "Wetin be your level for this new topic?"
          : "What is your level in this topic?";

      setMessages([
        nextMsg,
        {
          id: "level_prompt",
          sender: "uncle_sabi",
          type: "level_select",
          content: levelPrompt,
          options: ["Complete Beginner", "Know a little"],
        },
      ]);
      return;
    }

    if (lvl === "Continue Learning") {
      const resumeIdx = completedModuleIds.length;
      if (currentCourse) {
        loadSubModule(currentCourse, Math.min(resumeIdx, currentCourse.modules.length - 1));
      }
      return;
    }

    if (lvl === "Start Over") {
      useAskillaStore.setState({ completedModuleIds: [] });
      useAskillaStore.setState({ currentCourse: null });

      const resetMsg: ChatMessage = {
        id: `reset_${Date.now()}`,
        sender: "uncle_sabi",
        type: "text",
        content:
          language === "pidgin"
            ? "Oya, make we clear the old files and start over fresh!"
            : "Perfect, let's clear the old progress and start fresh!",
      };

      const levelPrompt =
        language === "pidgin"
          ? "Wetin be your level for this topic now?"
          : "What is your level in this topic?";

      setMessages([
        resetMsg,
        {
          id: "level_prompt",
          sender: "uncle_sabi",
          type: "level_select",
          content: levelPrompt,
          options: ["Complete Beginner", "Know a little"],
        },
      ]);
      return;
    }

    const levelStr = lvl === "Complete Beginner" ? "Complete Beginner" : "Know a little";

    const userMsg: ChatMessage = {
      id: `user_level_${Date.now()}`,
      sender: "student",
      type: "text",
      content: levelStr,
    };

    const waitMsg: ChatMessage = {
      id: `loading_${Date.now()}`,
      sender: "uncle_sabi",
      type: "text",
      content:
        language === "pidgin"
          ? "Alright. Make Uncle Sabi compile the syllabus and prepare your lessons now. Small time..."
          : "Perfect. Let me formulate a custom syllabus and organize your lessons. One moment...",
    };

    setMessages((prev) => {
      const filtered = prev.filter((m) => m.type !== "level_select");
      return [...filtered, userMsg, waitMsg];
    });
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentTopic,
          language,
          level: lvl === "Complete Beginner" ? "beginner" : "intermediate",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCourse(data.module);
        if (data.module.concise_topic) {
          useAskillaStore.setState({ currentTopic: data.module.concise_topic });
        }
        loadSubModule(data.module, 0);
      } else {
        const failMsg: ChatMessage = {
          id: `fail_${Date.now()}`,
          sender: "uncle_sabi",
          type: "text",
          content:
            language === "pidgin"
              ? "Ah, I get network issue to build module. Abeg try again."
              : "Apologies, I encountered an issue generating your course. Please try again.",
        };
        setMessages((prev) => [...prev, failMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Loads a lesson module progressively
  const loadSubModule = (course: any, modIdx: number) => {
    const mod = course.modules[modIdx];
    if (!mod) return;

    setCurrentModuleIndex(modIdx);
    setHintText(null);
    setShowAnswer(null);

    const titleMsg: ChatMessage = {
      id: `title_${mod.id}_${Date.now()}`,
      sender: "uncle_sabi",
      type: "text",
      content: `Lesson ${modIdx + 1}: ${mod.title}`,
    };

    const explanationMsg: ChatMessage = {
      id: `exp_${mod.id}_${Date.now()}`,
      sender: "uncle_sabi",
      type: "explanation",
      content: mod.explanation.local,
      data: {
        title: mod.title,
        english_terms: mod.explanation.english_terms,
        native_equivalents: mod.explanation.native_equivalents,
        source: mod.source,
      },
    };

    const visualMsg: ChatMessage = {
      id: `vis_${mod.id}_${Date.now()}`,
      sender: "uncle_sabi",
      type: "visualization",
      content: mod.image_search || "",
      data: {
        diagram: mod.diagram,
      },
    };

    const readyMsg: ChatMessage = {
      id: `ready_${mod.id}_${Date.now()}`,
      sender: "uncle_sabi",
      type: "next_module_cta",
      content:
        language === "pidgin"
          ? "If you don understand this concept, make we try check-in question?"
          : "Ready to test your understanding with a quick check-in question?",
      options: ["Ready, ask question!"],
      data: {
        action: "ask_question",
        modIdx,
        qIdx: 0,
      },
    };

    setMessages((prev) => {
      const filtered = prev.filter((m) => !m.id.startsWith("loading_"));
      return [...filtered, titleMsg, explanationMsg, visualMsg, readyMsg];
    });
  };

  // Triggers check-in question inline
  const handleAskQuestion = (modIdx: number, qIdx: number) => {
    if (!currentCourse) return;
    const mod = currentCourse.modules[modIdx];
    const q = mod.questions[qIdx];
    if (!q) return;

    const userReadyMsg: ChatMessage = {
      id: `user_ready_${Date.now()}`,
      sender: "student",
      type: "text",
      content: language === "pidgin" ? "Oya, ask question." : "Ready, ask question.",
    };

    const questionMsg: ChatMessage = {
      id: `q_${q.id}_${Date.now()}`,
      sender: "uncle_sabi",
      type: "question",
      content: q.question,
      options: q.options,
      data: {
        modIdx,
        qIdx,
        questionObj: q,
      },
    };

    setMessages((prev) => {
      const filtered = prev.filter((m) => m.type !== "next_module_cta");
      return [...filtered, userReadyMsg, questionMsg];
    });
  };

  // Handles inline answers submission
  const handleAnswerQuestion = async (
    modIdx: number,
    qIdx: number,
    selectedAns: string,
    questionObj: any
  ) => {
    if (!currentCourse) return;
    const mod = currentCourse.modules[modIdx];
    const isCorrect =
      selectedAns.trim().toLowerCase() === questionObj.correct_answer.trim().toLowerCase();
    const willCompleteLesson = isCorrect && qIdx + 1 >= mod.questions.length;

    const userAnsMsg: ChatMessage = {
      id: `user_ans_${Date.now()}`,
      sender: "student",
      type: "text",
      content: selectedAns,
    };

    // Log progress/attempt to API database cache
    try {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: user.phone,
          moduleId: currentCourse.id,
          moduleIndex: modIdx,
          questionIndex: qIdx,
          userAnswer: selectedAns,
          isCorrect,
          completed: willCompleteLesson,
          language,
        }),
      });
    } catch (e) {
      console.warn(e);
    }

    // Log to ML dataset for training
    try {
      const mod = currentCourse.modules[modIdx];
      fetch("/api/log-dataset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "question_attempt",
          topic: currentTopic,
          language,
          level: "beginner",
          prompt: questionObj.question,
          explanation: mod?.explanation?.local || "",
          user_answer: selectedAns,
          is_correct: isCorrect,
          feedback: isCorrect ? questionObj.correct_feedback : questionObj.wrong_feedback,
          metadata: {
            module_id: currentCourse.id,
            question_id: questionObj.id,
            module_index: modIdx,
            question_index: qIdx,
          },
        }),
      }).catch((e) => console.warn("Dataset log error:", e));
    } catch (e) {
      console.warn(e);
    }

    if (isCorrect) {
      setHintText(null);
      setShowAnswer(null);

      const correctMsg: ChatMessage = {
        id: `correct_${Date.now()}`,
        sender: "uncle_sabi",
        type: "feedback",
        content: questionObj.correct_feedback || "You sabi. That's exactly correct.",
      };

      confetti({
        particleCount: 60,
        spread: 60,
        colors: ["#C25B32", "#1C1917", "#FDEEE9"],
      });

      const hasNextQuestion = qIdx + 1 < mod.questions.length;
      const hasNextModule = modIdx + 1 < currentCourse.modules.length;

      // Update completed modules list in Zustand store!
      if (!hasNextQuestion) {
        useAskillaStore.setState((state) => ({
          completedModuleIds: Array.from(new Set([...state.completedModuleIds, mod.id])),
        }));
      }

      let nextCtaMsg: ChatMessage;

      if (hasNextQuestion) {
        nextCtaMsg = {
          id: `ready_${modIdx}_${qIdx + 1}_${Date.now()}`,
          sender: "uncle_sabi",
          type: "next_module_cta",
          content: "Let's do another check-in question in this module?",
          options: ["Ready, ask question!"],
          data: {
            action: "ask_question",
            modIdx,
            qIdx: qIdx + 1,
          },
        };
      } else if (hasNextModule) {
        nextCtaMsg = {
          id: `ready_next_mod_${modIdx + 1}_${Date.now()}`,
          sender: "uncle_sabi",
          type: "next_module_cta",
          content:
            language === "pidgin"
              ? `You don complete this lesson. Make we enter Lesson ${modIdx + 2}: ${
                  currentCourse.modules[modIdx + 1].title
                }?`
              : `Great job completing this module. Let's proceed to Lesson ${modIdx + 2}: ${
                  currentCourse.modules[modIdx + 1].title
                }?`,
          options: ["Proceed to Next Lesson"],
          data: {
            action: "next_module",
            modIdx: modIdx + 1,
          },
        };
      } else {
        nextCtaMsg = {
          id: `finish_${Date.now()}`,
          sender: "uncle_sabi",
          type: "next_module_cta",
          content:
            language === "pidgin"
              ? "Correct. You don finish all the lessons for this course track. Uncle Sabi is very proud of you."
              : "Excellent work. You have finished all modules in this course track. Uncle Sabi is proud of your dedication.",
          options: ["Check My Win Card"],
          data: {
            action: "finish_course",
          },
        };
      }

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.type !== "question");
        return [...filtered, userAnsMsg, correctMsg, nextCtaMsg];
      });
    } else {
      // Wrong answer
      const wrongMsg: ChatMessage = {
        id: `wrong_${Date.now()}`,
        sender: "uncle_sabi",
        type: "feedback",
        content:
          questionObj.wrong_feedback ||
          "Hmm, you're close. Let's think about it differently. Read the explanation and try again.",
      };

      const options = ["Try Again", "Show Hint", "Show Answer"];

      const retryCta: ChatMessage = {
        id: `ready_retry_${Date.now()}`,
        sender: "uncle_sabi",
        type: "next_module_cta",
        content: language === "pidgin" ? "Wetin you wan do?" : "What would you like to do?",
        options,
        data: {
          action: "retry_options",
          modIdx,
          qIdx,
          questionObj,
        },
      };

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.type !== "question");
        return [...filtered, userAnsMsg, wrongMsg, retryCta];
      });
    }
  };

  // Handles retry options inside chat
  const handleRetryAction = (action: string, data: any) => {
    const { modIdx, qIdx, questionObj } = data;

    if (action === "Try Again") {
      const questionMsg: ChatMessage = {
        id: `q_${questionObj.id}_${Date.now()}`,
        sender: "uncle_sabi",
        type: "question",
        content: questionObj.question,
        options: questionObj.options,
        data,
      };

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.type !== "next_module_cta" && m.type !== "feedback");
        return [...filtered, questionMsg];
      });
    } else if (action === "Show Hint") {
      setHintText(questionObj.hint || "Try looking closely at the bold words in the explanation.");
    } else if (action === "Show Answer") {
      setShowAnswer(questionObj.correct_answer);
      // Give the proceed option directly
      const correctMsg: ChatMessage = {
        id: `show_ans_msg_${Date.now()}`,
        sender: "uncle_sabi",
        type: "feedback",
        content: `The correct answer is: **${questionObj.correct_answer}**.\n\n${
          questionObj.correct_feedback || "Let's carry on learning."
        }`,
      };

      const hasNextQuestion = qIdx + 1 < currentCourse!.modules[modIdx].questions.length;
      const hasNextModule = modIdx + 1 < currentCourse!.modules.length;

      // Update completed modules list in Zustand store!
      if (!hasNextQuestion) {
        useAskillaStore.setState((state) => ({
          completedModuleIds: Array.from(new Set([...state.completedModuleIds, currentCourse!.modules[modIdx].id])),
        }));
      }

      let nextCtaMsg: ChatMessage;

      if (hasNextQuestion) {
        nextCtaMsg = {
          id: `ready_${modIdx}_${qIdx + 1}_${Date.now()}`,
          sender: "uncle_sabi",
          type: "next_module_cta",
          content: "Let's try the next check-in question?",
          options: ["Ready, ask question!"],
          data: {
            action: "ask_question",
            modIdx,
            qIdx: qIdx + 1,
          },
        };
      } else if (hasNextModule) {
        nextCtaMsg = {
          id: `ready_next_mod_${modIdx + 1}_${Date.now()}`,
          sender: "uncle_sabi",
          type: "next_module_cta",
          content: `Let's proceed to Lesson ${modIdx + 2}: ${currentCourse!.modules[modIdx + 1].title}?`,
          options: ["Proceed to Next Lesson"],
          data: {
            action: "next_module",
            modIdx: modIdx + 1,
          },
        };
      } else {
        nextCtaMsg = {
          id: `finish_${Date.now()}`,
          sender: "uncle_sabi",
          type: "next_module_cta",
          content: "You have completed all lessons for this track.",
          options: ["Check My Win Card"],
          data: {
            action: "finish_course",
          },
        };
      }

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.type !== "next_module_cta" && m.type !== "feedback");
        return [...filtered, correctMsg, nextCtaMsg];
      });
    }
  };

  const handleCtaClick = (option: string, msg: ChatMessage) => {
    const action = msg.data?.action;
    if (action === "ask_question") {
      handleAskQuestion(msg.data.modIdx, msg.data.qIdx);
    } else if (action === "next_module") {
      loadSubModule(currentCourse, msg.data.modIdx);
    } else if (action === "finish_course") {
      setScreen("progress");
    } else if (action === "retry_options") {
      handleRetryAction(option, msg.data);
    }
  };



  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;

    // Pre-normalize carriage return escape artifacts, arrows, double dollar signs $$...$$ into \[...\] and single dollar signs $$ into \(...\)
    let processedText = rawText
      .replace(/[\r\n\s]*ightarrow|\\(?:rightarrow|to|longrightarrow)|rightarrow/gi, " → ")
      .replace(/[\r\n\s]*eftarrow|\\(?:leftarrow|longleftarrow)|leftarrow/gi, " ← ")
      .replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, "\\[ $1 \\]")
      .replace(/\$([^\$\n]+)\$/g, "\\( $1 \\)");

    // 1. Split by block math first: \[ ... \] so multi-line math isn't broken by newline splits
    const blockMathParts = processedText.split(/(\\\[[\s\S]*?\\\])/g);

    return (
      <div className="space-y-2.5 text-left font-sans leading-relaxed">
        {blockMathParts.map((blockPart, blockIdx) => {
          if (!blockPart) return null;

          // Render Block Math
          if (blockPart.startsWith("\\[") && blockPart.endsWith("\\]")) {
            const mathContent = blockPart.slice(2, -2).trim();
            return (
              <div
                key={`block-math-${blockIdx}`}
                className="my-3 p-4 rounded-2xl bg-[#FDEEE9]/50 dark:bg-[#2D1F1A]/30 border-2 border-[#C25B32]/40 text-center font-serif text-base sm:text-xl overflow-x-auto whitespace-nowrap shadow-md text-[#1C1917] dark:text-[#F5F5F4] tracking-wide"
              >
                <BlockMath math={mathContent} />
              </div>
            );
          }

          // Process normal text line-by-line to parse Markdown headers (###, ##, #) and lists cleanly
          const lines = blockPart.split("\n");
          return lines.map((line, lineIdx) => {
            const trimmed = line.trim();
            if (!trimmed) {
              return <div key={`empty-${blockIdx}-${lineIdx}`} className="h-1" />;
            }

            // Render Markdown Headers: ### Header Name
            if (trimmed.startsWith("### ") || trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
              const headerTitle = trimmed.replace(/^#{1,3}\s+/, "");
              return (
                <h3
                  key={`header-${blockIdx}-${lineIdx}`}
                  className="font-heading font-extrabold text-xs sm:text-sm md:text-base text-[#C25B32] mt-4 mb-2 uppercase tracking-wider flex items-center gap-2 border-b border-[#C25B32]/25 pb-1 text-left"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C25B32] shrink-0" />
                  <span>{headerTitle}</span>
                </h3>
              );
            }

            // Check if line is a bullet item (- or * or 1.)
            const isBullet = /^(?:[\-\*]|\d+\.)\s+/.test(trimmed);
            const cleanLineText = isBullet ? trimmed.replace(/^(?:[\-\*]|\d+\.)\s+/, "") : line;

            // Split by inline math \( ... \) and bold ** ... **
            const inlineParts = cleanLineText.split(/(\\\([\s\S]*?\\\))|(\*\*.*?\*\*)/g);

            const renderedContent = inlineParts.map((part, i) => {
              if (!part) return null;

              if (part.startsWith("\\(") && part.endsWith("\\)")) {
                const mathContent = part.slice(2, -2).trim();
                return (
                  <span
                    key={`inline-math-${blockIdx}-${lineIdx}-${i}`}
                    className="font-serif italic mx-0.5 px-1 py-0.5 bg-[#FDEEE9]/60 dark:bg-[#2D1F1A]/40 rounded-md text-[#1C1917] dark:text-[#F5F5F4] border border-[#C25B32]/30"
                  >
                    <InlineMath math={mathContent} />
                  </span>
                );
              }

              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong
                    key={`bold-${blockIdx}-${lineIdx}-${i}`}
                    className="font-extrabold text-[#1C1917] dark:text-[#FFFFFF] bg-[#C25B32]/20 dark:bg-[#C25B32]/30 px-1.5 py-0.5 rounded-md border border-[#C25B32]/35 mx-0.5 inline-block my-0.5"
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }

              return <span key={`text-${blockIdx}-${lineIdx}-${i}`}>{part}</span>;
            });

            if (isBullet) {
              return (
                <div key={`bullet-${blockIdx}-${lineIdx}`} className="flex items-start gap-2.5 my-1 pl-1 text-left text-xs sm:text-sm md:text-base font-sans font-medium text-[#1C1917]/90 dark:text-[#F5F5F4]/90 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25B32] shrink-0 mt-2" />
                  <div className="flex-1">{renderedContent}</div>
                </div>
              );
            }

            return (
              <p key={`p-${blockIdx}-${lineIdx}`} className="my-1.5 text-left text-xs sm:text-sm md:text-base font-sans font-medium text-[#1C1917]/90 dark:text-[#F5F5F4]/90 leading-relaxed">
                {renderedContent}
              </p>
            );
          });
        })}
      </div>
    );
  };

  return (
    <PageShell bottomInset="chat" className="flex flex-col justify-between pt-16 md:pt-0">
      {/* Sticky Header & Progress Wrapper */}
      <div className="sticky top-16 md:top-0 z-30 w-full bg-[#F5F5F0]/95 dark:bg-[#121212]/95 border-b border-[#E0E0E0]/20 dark:border-white/5 backdrop-blur-md transition-colors">
        {/* Sticky Header */}
        <header className="hidden md:block w-full">
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setScreen("home")}
                className="p-2.5 rounded-full hover:bg-white dark:hover:bg-[#1E1E1E] border border-transparent hover:border-[#E0E0E0] dark:hover:border-[#1C1917] text-[#1C1917] dark:text-[#F5F5F4] transition-all active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-heading font-extrabold text-[#C25B32] tracking-widest uppercase">
                  Askilla Inline Chat
                </span>
                <h1 className="font-heading font-extrabold text-sm sm:text-base md:text-lg text-[#1C1917] dark:text-[#F5F5F4] line-clamp-1">
                  {currentTopic}
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScreen("home")}
              className="p-2.5 bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-white/10 hover:bg-[#F5F5F0] dark:hover:bg-[#121212] rounded-full text-xs font-bold font-heading active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-[#C25B32]" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </header>

        {/* Sticky Overhead Module Progress Bar */}
        {currentCourse && currentCourse.modules.length > 0 && (() => {
          const totalMods = currentCourse.modules.length;
          const completedCount = completedModuleIds.length;
          const isAllFinished = completedCount >= totalMods;
          const activeIndex = isAllFinished
            ? totalMods - 1
            : Math.min(Math.max(currentModuleIndex, completedCount), totalMods - 1);
          const currentModTitle = currentCourse.modules[activeIndex]?.title || "Introduction";
          const progressPercent = isAllFinished
            ? 100
            : Math.round((completedCount / totalMods) * 100);

          return (
            <div className="w-full bg-[#FDEEE9]/80 dark:bg-[#2D1F1A]/60 border-t border-[#E0E0E0]/10 dark:border-white/10/10 py-2.5 px-4 shadow-sm transition-all">
              <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between text-xs font-sans font-medium text-[#1C1917]/60 dark:text-[#F5F5F4]/60">
                <div className="flex items-center gap-2 max-w-[60%]">
                  <span className="w-2 h-2 rounded-full bg-[#C25B32] shrink-0" />
                  <span className="truncate">
                    Topic: <strong className="font-extrabold text-[#1C1917] dark:text-[#F5F5F4]">{currentModTitle}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline">
                    {isAllFinished ? `Completed (${totalMods} of ${totalMods})` : `Lesson ${activeIndex + 1} of ${totalMods}`}
                  </span>
                  <span className="sm:hidden">
                    {activeIndex + 1}/{totalMods}
                  </span>
                  <div className="w-16 sm:w-28 h-2 bg-[#E0E0E0] dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-[#C25B32] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Chat Thread Container */}
      <main className="w-full max-w-4xl lg:max-w-5xl xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 flex-1 flex flex-col justify-start">
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#C25B32]/30 bg-[#FDEEE9]/30 dark:bg-[#2D1F1A]/20 flex items-center justify-center mb-6">
                <Lightbulb className="w-10 h-10 text-[#C25B32]/60" />
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1C1917] dark:text-[#F5F5F4] mb-3">
                Start Your Learning Journey
              </h3>
              <p className="text-sm sm:text-base text-[#1C1917]/60 dark:text-[#F5F5F4]/60 max-w-md leading-relaxed">
                Select a topic from the home screen to begin learning with Uncle Sabi. He'll guide you through step-by-step lessons in your preferred language.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
              const isSabi = msg.sender === "uncle_sabi";

              return (
                <motion.div
                  id={msg.id}
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`flex items-start gap-2.5 sm:gap-3.5 w-full min-w-0 scroll-mt-40 ${isSabi ? "justify-start" : "justify-end"}`}
                >
                  {/* Sabi Avatar */}
                  {isSabi && (
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 border-[#C25B32] bg-[#FDEEE9] dark:bg-[#2D1F1A] overflow-hidden flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <img src="/uncle_sabi.png" alt="Uncle Sabi" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Message bubble content */}
                  <div className={`min-w-0 ${isSabi ? "w-full max-w-full lg:max-w-[84%] xl:max-w-[80%]" : "w-auto max-w-[85%] sm:max-w-[65%] lg:max-w-[55%] xl:max-w-[50%] ml-auto"}`}>
                    {/* Chat Bubble card */}
                    <div
                      className={`p-3.5 sm:p-5 md:p-6 lg:p-6 rounded-2xl sm:rounded-3xl border shadow-sm text-left min-w-0 overflow-hidden ${
                        isSabi
                          ? "bg-white dark:bg-[#1E1E1E] border-[#E0E0E0] dark:border-white/10 text-[#1C1917] dark:text-[#F5F5F4]"
                          : "bg-[#C25B32] border-[#C25B32] text-[#1C1917] font-extrabold rounded-tr-none rounded-br-2xl inline-block shadow-md"
                      }`}
                    >
                      {/* Submodule layout inside chat */}
                      {msg.type === "explanation" && msg.data ? (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between gap-2 border-b border-[#E0E0E0]/60 dark:border-white/5 pb-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C25B32]">
                              Uncle Sabi Explanation
                            </span>
                            {language === 'english' && <AudioPlayer text={msg.content} appLanguage={language} />}
                          </div>
                          <div className="text-xs sm:text-base leading-relaxed font-sans font-medium whitespace-pre-line text-[#1C1917]/90 dark:text-[#F5F5F4]/90 break-words">
                            {renderFormattedText(msg.content)}
                          </div>
                          {msg.data.diagram && (
                            <div className="my-3.5 p-3 sm:p-5 overflow-hidden rounded-2xl border border-[#C25B32]/40 bg-[#FDEEE9]/45 dark:bg-[#2D1F1A]/20 shadow-inner text-[#1C1917] dark:text-[#F5F5F4] flex flex-col items-center gap-2">
                              {msg.data.diagram.includes("<svg") ? (
                                <div
                                  className="w-full flex justify-center items-center overflow-x-auto"
                                  dangerouslySetInnerHTML={{ __html: cleanSvg(msg.data.diagram) }}
                                />
                              ) : (
                                <div className="w-full">
                                  {renderFormattedText(msg.data.diagram)}
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 text-[10px] font-sans font-extrabold uppercase tracking-wider text-[#C25B32]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C25B32] shrink-0" />
                                Uncle Sabi Concept Visualizer
                              </div>
                            </div>
                          )}
                          {msg.data.native_equivalents &&
                            Object.keys(msg.data.native_equivalents).length > 0 && (
                              <div className="pt-2.5 border-t border-[#E0E0E0]/60 dark:border-white/5 text-xs text-[#1C1917]/65 dark:text-[#F5F5F4]/65 font-sans space-y-1">
                              <p className="font-extrabold text-[#1C1917] dark:text-[#F5F5F4] uppercase tracking-wider">
                                  Key Terms Simplified:
                                </p>
                                {Object.entries(msg.data.native_equivalents).map(([t, eq]: any) => (
                                  <p key={t}>
                                    • <strong>{t}</strong> = {eq}
                                  </p>
                                ))}
                              </div>
                            )}
                          {msg.data.source && (
                            <p className="text-[10px] text-[#1C1917]/40 dark:text-[#F5F5F4]/40 font-sans flex items-center gap-1 pt-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C25B32]/50" />
                              Sourced from <span className="font-bold text-[#1C1917]/60 dark:text-[#F5F5F4]/60">{friendlySiteName(msg.data.source)}</span>
                            </p>
                          )}
                        </div>
                      ) : msg.type === "visualization" && msg.data ? (
                        <div className="space-y-3">
                          {/* Primary high-precision SVG vector diagram */}
                          {msg.data.diagram ? (
                            <div className="p-4 sm:p-6 overflow-hidden rounded-2xl border border-[#C25B32]/40 bg-[#FDEEE9]/45 dark:bg-[#2D1F1A]/20 shadow-inner text-[#1C1917] dark:text-[#F5F5F4] flex justify-center items-center flex-col gap-2">
                              {msg.data.diagram.includes("<svg") ? (
                                <div
                                  className="w-full flex justify-center items-center overflow-x-auto"
                                  dangerouslySetInnerHTML={{ __html: cleanSvg(msg.data.diagram) }}
                                />
                              ) : (
                                <div className="w-full">
                                  {renderFormattedText(msg.data.diagram)}
                                </div>
                              )}
                            </div>
                          ) : msg.content ? (
                            <div className="overflow-hidden rounded-2xl border border-[#E0E0E0]/60 dark:border-white/5 bg-white dark:bg-[#1A1A1A] p-2 shadow-sm">
                              <img
                                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(
                                  `${msg.content} clean educational diagram textbook illustration vector style white background high contrast`
                                )}?width=800&height=400&nologo=true`}
                                alt={msg.content}
                                className="w-full h-auto max-h-[320px] object-contain rounded-xl mx-auto"
                                loading="lazy"
                                onError={(e) => {
                                  if (e.currentTarget.parentElement) {
                                    e.currentTarget.parentElement.style.display = "none";
                                  }
                                }}
                              />
                            </div>
                          ) : null}
                          <p className="text-[10px] font-sans italic text-[#1C1917]/60 dark:text-[#F5F5F4]/60">
                            Uncle Sabi concept visualizer.
                          </p>
                        </div>
                      ) : msg.type === "question" ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2 border-b border-[#E0E0E0]/60 dark:border-white/5 pb-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C25B32]">
                              Check-in Question
                            </span>
                            {language === 'english' && <AudioPlayer text={msg.content} appLanguage={language} />}
                          </div>
                          <h4 className="font-heading font-extrabold text-sm sm:text-base leading-snug text-[#1C1917] dark:text-[#F5F5F4]">
                            {renderFormattedText(msg.content)}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                            {msg.options?.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() =>
                                  handleAnswerQuestion(msg.data.modIdx, msg.data.qIdx, opt, msg.data.questionObj)
                                }
                                className="w-full text-left p-3.5 rounded-2xl border-2 border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-[#C25B32] text-xs sm:text-sm font-semibold transition-all duration-200 bg-white dark:bg-[#1E1E1E] text-[#1C1917] dark:text-[#F5F5F4] hover:bg-[#FDEEE9]/40 dark:hover:bg-[#2D1F1A]/30 flex items-center justify-between active:scale-[0.98]"
                              >
                                <span>{opt}</span>
                                <ChevronRight className="w-4 h-4 text-[#C25B32]" />
                              </button>
                            ))}
                          </div>
                          <VoiceInput
                            onTranscript={(spokenText) => {
                              const matched = msg.options?.find(
                                (o) =>
                                  o.toLowerCase().includes(spokenText.toLowerCase()) ||
                                  spokenText.toLowerCase().includes(o.toLowerCase())
                              );
                              if (matched) {
                                handleAnswerQuestion(msg.data.modIdx, msg.data.qIdx, matched, msg.data.questionObj);
                              }
                            }}
                            label="Speak your answer"
                          />
                        </div>
                      ) : (
                        // Standard Text Bubble
                        <div className="space-y-3.5">
                          {isSabi && (
                            <div className="flex items-center justify-between gap-2 border-b border-[#E0E0E0]/60 dark:border-white/5 pb-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C25B32]">
                                Uncle Sabi Says
                              </span>
                              {language === 'english' && <AudioPlayer text={msg.content} appLanguage={language} />}
                            </div>
                          )}
                          <div className="text-xs sm:text-sm font-sans font-medium whitespace-pre-line leading-relaxed">
                            {renderFormattedText(msg.content)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Inline level selector or buttons thread */}
                    {((msg.type === "level_select" || msg.type === "next_module_cta") && msg.options) && (
                      <div className="flex flex-wrap gap-2 pt-1 justify-start">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              if (msg.type === "level_select") {
                                handleSelectLevel(opt);
                              } else {
                                handleCtaClick(opt, msg);
                              }
                            }}
                            className="px-4 py-1.5 bg-[#FDEEE9] dark:bg-[#2D1F1A] border border-[#C25B32] text-[#1C1917] dark:text-[#F5F5F4] font-heading font-extrabold text-[11px] rounded-full hover:bg-[#C25B32] hover:text-white transition-all duration-200 shadow-sm active:scale-95"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          )}

          {/* Loading bubble placeholder */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 w-full justify-start"
            >
              <div className="w-10 h-10 rounded-full border border-[#C25B32] bg-[#FDEEE9] dark:bg-[#2D1F1A] overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                <img src="/uncle_sabi.png" alt="Uncle Sabi" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-4 border border-[#E0E0E0] dark:border-white/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#C25B32] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2.5 h-2.5 bg-[#C25B32] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2.5 h-2.5 bg-[#C25B32] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}

          {/* Hint Card */}
          {hintText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-[#FDEEE9] dark:bg-[#2D1F1A] border-l-4 border-l-[#C25B32] border border-[#E0E0E0] dark:border-white/10 rounded-2xl flex items-start gap-3 text-left w-full sm:max-w-xl mx-auto"
            >
              <Lightbulb className="w-5 h-5 text-[#C25B32] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-heading font-extrabold text-xs text-[#1C1917] dark:text-[#F5F5F4] uppercase tracking-wider">
                  Uncle Sabi Hint
                </h5>
                <p className="text-xs sm:text-sm font-sans mt-0.5 leading-relaxed text-[#1C1917]/85 dark:text-[#F5F5F4]/85">
                  {hintText}
                </p>
              </div>
            </motion.div>
          )}

          {/* Reveal Correct Answer Info */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-l-[#C25B32] border border-emerald-200 dark:border-emerald-900/40 rounded-2xl flex items-start gap-3 text-left w-full sm:max-w-xl mx-auto"
            >
              <Check className="w-5 h-5 text-[#C25B32] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-heading font-extrabold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Answer Revealed
                </h5>
                <p className="text-xs sm:text-sm font-sans font-bold mt-0.5 text-emerald-800 dark:text-emerald-300">
                  Correct Answer Option: {showAnswer}
                </p>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Sticky, Conversational Chat Input Box Footer */}
      <footer className="fixed bottom-0 left-0 md:left-64 right-0 bg-[#F5F5F0]/95 dark:bg-[#121212]/95 border-t border-[#E0E0E0]/20 dark:border-white/5 p-4 z-40 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="max-w-5xl mx-auto px-4 md:px-6 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                language === "pidgin"
                  ? "Ask Uncle Sabi any question..."
                  : "Ask Uncle Sabi a question..."
              }
              className={`w-full py-3.5 pl-4 ${
                language === "pidgin" ? "pr-4" : "pr-12"
              } rounded-full border-2 border-[#E0E0E0] dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#C25B32] transition-all text-[#1C1917] dark:text-[#F5F5F4] shadow-inner`}
            />
            {/* Integrated Voice Input microphone trigger (Hidden in Pidgin mode to save STT credits) */}
            {language !== "pidgin" && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                <VoiceInput
                  onTranscript={(transcript) => setInputValue(transcript)}
                  label="Voice Input"
                  iconOnly
                  appLanguage={language}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#C25B32] to-[#94401F] text-white hover:from-[#94401F] hover:to-[#94401F] font-heading font-extrabold text-xs sm:text-sm rounded-full active:scale-95 transition-all shadow-md"
          >
            Send
          </button>
        </form>
      </footer>
    </PageShell>
  );
};
