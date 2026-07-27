import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppScreen, AskillaCourseModule, CompletedCertificate, LearningLanguage, UserProfile } from "../types/askilla";

interface AskillaState {
  screen: AppScreen;
  language: LearningLanguage;
  user: UserProfile;
  currentTopic: string;
  currentCourse: AskillaCourseModule | null;
  activeModuleIndex: number;
  activeQuestionIndex: number;
  wrongAttemptCount: number;
  completedModuleIds: string[];
  completedCertificates: CompletedCertificate[];
  voiceFeedbackEnabled: boolean;
  darkModeEnabled: boolean;
  isLoadingModule: boolean;

  setScreen: (screen: AppScreen) => void;
  setLanguage: (lang: LearningLanguage) => void;
  setUser: (user: Partial<UserProfile>) => void;
  setCurrentTopic: (topic: string) => void;
  setCourse: (course: AskillaCourseModule) => void;
  setIsLoadingModule: (loading: boolean) => void;
  incrementWrongAttempt: () => void;
  resetWrongAttempts: () => void;
  advanceQuestion: () => void;
  completeCurrentModule: () => void;
  archiveCertificate: (cert: CompletedCertificate) => void;
  toggleVoiceFeedback: () => void;
  toggleDarkMode: () => void;
  logout: () => void;
  resetAll: () => void;
}

export const useAskillaStore = create<AskillaState>()(
  persist(
    (set) => ({
      screen: "landing",
      language: "pidgin",
      user: {
        id: "user_guest",
        phone: "",
        name: "",
        preferredLanguage: "pidgin",
      },
      currentTopic: "Excel Basics",
      currentCourse: null,
      activeModuleIndex: 0,
      activeQuestionIndex: 0,
      wrongAttemptCount: 0,
      completedModuleIds: [],
      completedCertificates: [],
      voiceFeedbackEnabled: true,
      darkModeEnabled: false,
      isLoadingModule: false,

      setScreen: (screen) => set({ screen }),
      setLanguage: (language) =>
        set((state) => ({
          language,
          user: { ...state.user, preferredLanguage: language },
        })),
      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
      setCurrentTopic: (topic) => {
        const clean = topic
          .replace(/^(i\s+want\s+to\s+learn\s+about\s+|i\s+want\s+to\s+learn\s+|teach\s+me\s+about\s+|teach\s+me\s+|learn\s+about\s+|learn\s+|how\s+to\s+do\s+|how\s+to\s+|how\s+can\s+i\s+learn\s+)/i, "")
          .trim()
          .replace(/^./, (str) => str.toUpperCase());
        set({
          currentTopic: clean,
          currentCourse: null,
          completedModuleIds: [], // Hard reset on new topic!
          activeModuleIndex: 0,
          activeQuestionIndex: 0,
          wrongAttemptCount: 0,
          screen: "module",
        });
      },
      setCourse: (course) =>
        set((state) => ({
          currentCourse: course,
          currentTopic: course.concise_topic || course.topic || state.currentTopic,
          completedModuleIds: [], // Hard reset on new course load!
          activeModuleIndex: 0,
          activeQuestionIndex: 0,
          wrongAttemptCount: 0,
          isLoadingModule: false,
        })),
      setIsLoadingModule: (isLoadingModule) => set({ isLoadingModule }),
      incrementWrongAttempt: () =>
        set((state) => ({ wrongAttemptCount: state.wrongAttemptCount + 1 })),
      resetWrongAttempts: () => set({ wrongAttemptCount: 0 }),
      advanceQuestion: () =>
        set((state) => {
          if (!state.currentCourse) return state;
          const currentModule = state.currentCourse.modules[state.activeModuleIndex];
          if (!currentModule) return state;

          if (state.activeQuestionIndex + 1 < currentModule.questions.length) {
            return {
              activeQuestionIndex: state.activeQuestionIndex + 1,
              wrongAttemptCount: 0,
            };
          }

          if (state.activeModuleIndex + 1 < state.currentCourse.modules.length) {
            return {
              activeModuleIndex: state.activeModuleIndex + 1,
              activeQuestionIndex: 0,
              wrongAttemptCount: 0,
              completedModuleIds: Array.from(new Set([...state.completedModuleIds, currentModule.id])),
            };
          }

          return {
            screen: "progress",
            completedModuleIds: Array.from(new Set([...state.completedModuleIds, currentModule.id])),
          };
        }),
      completeCurrentModule: () =>
        set((state) => {
          if (!state.currentCourse) return state;
          const currentModule = state.currentCourse.modules[state.activeModuleIndex];
          return {
            completedModuleIds: Array.from(new Set([...state.completedModuleIds, currentModule?.id || ""])),
          };
        }),
      archiveCertificate: (cert) =>
        set((state) => {
          const exists = state.completedCertificates.some((c) => c.topic.toLowerCase() === cert.topic.toLowerCase());
          if (exists) return state;
          return { completedCertificates: [cert, ...state.completedCertificates] };
        }),
      toggleVoiceFeedback: () => set((state) => ({ voiceFeedbackEnabled: !state.voiceFeedbackEnabled })),
      toggleDarkMode: () => set((state) => ({ darkModeEnabled: !state.darkModeEnabled })),
      logout: () =>
        set({
          screen: "landing",
          currentCourse: null,
          activeModuleIndex: 0,
          activeQuestionIndex: 0,
          wrongAttemptCount: 0,
          completedModuleIds: [],
          completedCertificates: [],
          user: { id: "user_guest", phone: "", name: "", preferredLanguage: "pidgin" },
        }),
      resetAll: () =>
        set({
          screen: "home",
          currentCourse: null,
          activeModuleIndex: 0,
          activeQuestionIndex: 0,
          wrongAttemptCount: 0,
          completedModuleIds: [],
        }),
    }),
    {
      name: "askilla-storage",
      partialize: (state) => ({
        screen: state.screen,
        language: state.language,
        user: state.user,
        currentTopic: state.currentTopic,
        currentCourse: state.currentCourse,
        activeModuleIndex: state.activeModuleIndex,
        activeQuestionIndex: state.activeQuestionIndex,
        wrongAttemptCount: state.wrongAttemptCount,
        completedModuleIds: state.completedModuleIds,
        completedCertificates: state.completedCertificates,
        voiceFeedbackEnabled: state.voiceFeedbackEnabled,
        darkModeEnabled: state.darkModeEnabled,
      }),
    }
  )
);
