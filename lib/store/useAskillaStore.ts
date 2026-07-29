import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppScreen, AskillaCourseModule, CompletedCertificate, LearningLanguage, UserProfile } from "../types/askilla";

interface LocalAnalytics {
  totalAttempts: number;
  correctAttempts: number;
  pidginAttempts: number;
  englishAttempts: number;
}

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
  localAnalytics: LocalAnalytics;

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
  setCompletedModuleIds: (moduleIds: string[]) => void;
  setCompletedCertificates: (certificates: CompletedCertificate[]) => void;
  archiveCertificate: (cert: CompletedCertificate) => void;
  toggleVoiceFeedback: () => void;
  toggleDarkMode: () => void;
  recordAttempt: (isCorrect: boolean, lang: string) => void;
  logout: () => void;
  resetAll: () => void;
  initializeUser: () => void;
  authenticateWithPhone: (phone: string, name?: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<boolean>;
  createUser: (data: { phone: string; name: string; preferredLanguage: LearningLanguage }) => Promise<boolean>;
  updateUserProfile: (data: { phone: string; name: string; preferredLanguage: LearningLanguage }) => Promise<boolean>;
}

export const useAskillaStore = create<AskillaState>()(
  persist(
    (set) => ({
      screen: "landing",
      language: "pidgin",
      user: {
        id: "",
        phone: "",
        name: "",
        preferredLanguage: "pidgin",
      },
      currentTopic: "",
      currentCourse: null,
      activeModuleIndex: 0,
      activeQuestionIndex: 0,
      wrongAttemptCount: 0,
      completedModuleIds: [],
      completedCertificates: [],
      voiceFeedbackEnabled: true,
      darkModeEnabled: false,
      isLoadingModule: false,
      localAnalytics: { totalAttempts: 0, correctAttempts: 0, pidginAttempts: 0, englishAttempts: 0 },

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
      setCompletedModuleIds: (completedModuleIds) => set({ completedModuleIds }),
      setCompletedCertificates: (completedCertificates) => set({ completedCertificates }),
      archiveCertificate: (cert) =>
        set((state) => {
          const exists = state.completedCertificates.some((c) => c.topic.toLowerCase() === cert.topic.toLowerCase());
          if (exists) return state;
          return { completedCertificates: [cert, ...state.completedCertificates] };
        }),
      recordAttempt: (isCorrect, lang) =>
        set((state) => ({
          localAnalytics: {
            totalAttempts: state.localAnalytics.totalAttempts + 1,
            correctAttempts: state.localAnalytics.correctAttempts + (isCorrect ? 1 : 0),
            pidginAttempts: state.localAnalytics.pidginAttempts + (lang.toLowerCase() === "pidgin" ? 1 : 0),
            englishAttempts: state.localAnalytics.englishAttempts + (lang.toLowerCase() !== "pidgin" ? 1 : 0),
          },
        })),
      toggleVoiceFeedback: () => set((state) => ({ voiceFeedbackEnabled: !state.voiceFeedbackEnabled })),
      toggleDarkMode: () => set((state) => ({ darkModeEnabled: !state.darkModeEnabled })),
      logout: () =>
        set({
          screen: "landing",
          user: {
            id: "",
            phone: "", // Clear phone to force re-login
            name: "",
            preferredLanguage: "pidgin",
          },
          currentTopic: "",
          currentCourse: null,
          activeModuleIndex: 0,
          activeQuestionIndex: 0,
          wrongAttemptCount: 0,
          completedModuleIds: [],
          completedCertificates: [],
        }),
      resetAll: () =>
        set({
          screen: "home",
          currentTopic: "",
          currentCourse: null,
          activeModuleIndex: 0,
          activeQuestionIndex: 0,
          wrongAttemptCount: 0,
          completedModuleIds: [],
        }),
      initializeUser: () =>
        set((state) => {
          // Phone number is the primary identifier - if no phone, user is not authenticated
          // ID will be generated by database when user is created with phone
          return state;
        }),
      authenticateWithPhone: async (phone: string, name?: string) =>
        set((state) => ({
          user: {
            ...state.user,
            phone: phone,
            name: name || state.user.name,
            id: "", // ID will be set by API response
          },
        })),
      loginWithPhone: async (phone: string) => {
        try {
          const res = await fetch(`/api/user?phone=${encodeURIComponent(phone)}`);
          
          if (res.ok) {
            const data = await res.json();
            
            console.log('Login response:', data);
            
            if (data.success && data.user) {
              set((state) => ({
                user: {
                  ...state.user,
                  id: data.user.id,
                  phone: data.user.phone,
                  name: data.user.name || state.user.name,
                  preferredLanguage: data.user.preferredLanguage || state.user.preferredLanguage,
                },
                completedModuleIds: data.completedModuleIds || [],
                completedCertificates: data.certificates || [],
              }));
              return true;
            }
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
      createUser: async ({ phone, name, preferredLanguage }) => {
        try {
          const res = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, name, preferredLanguage }),
          });

          if (!res.ok) return false;

          const data = await res.json();
          if (!data.success || !data.user) return false;

          set((state) => ({
            language: data.user.preferredLanguage || preferredLanguage,
            user: {
              ...state.user,
              id: data.user.id,
              phone: data.user.phone,
              name: data.user.name || name,
              preferredLanguage: data.user.preferredLanguage || preferredLanguage,
            },
            completedModuleIds: data.completedModuleIds || [],
            completedCertificates: data.certificates || [],
          }));

          return true;
        } catch (error) {
          console.error("Create user error:", error);
          return false;
        }
      },
      updateUserProfile: async ({ phone, name, preferredLanguage }) => {
        try {
          const currentPhone = useAskillaStore.getState().user.phone;
          const res = await fetch("/api/user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPhone, phone, name, preferredLanguage }),
          });

          if (!res.ok) return false;

          const data = await res.json();
          if (!data.success || !data.user) return false;

          set((state) => ({
            language: data.user.preferredLanguage || preferredLanguage,
            user: {
              ...state.user,
              id: data.user.id,
              phone: data.user.phone,
              name: data.user.name || name,
              preferredLanguage: data.user.preferredLanguage || preferredLanguage,
            },
            completedModuleIds: data.completedModuleIds || state.completedModuleIds,
            completedCertificates: data.certificates || state.completedCertificates,
          }));

          return true;
        } catch (error) {
          console.error("Update user error:", error);
          return false;
        }
      },
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
        localAnalytics: state.localAnalytics,
      }),
    }
  )
);
