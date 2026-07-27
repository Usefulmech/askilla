export type LearningLanguage = "english" | "pidgin";

export interface ExplanationData {
  local: string;
  english_terms: string[];
  native_equivalents?: Record<string, string>;
}

export interface QuestionData {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  wrong_feedback: string;
  wrong_feedback_second_try?: string;
  correct_feedback: string;
  hint?: string;
}

export interface LessonSubModule {
  id: string;
  title: string;
  explanation: ExplanationData;
  image_search: string;
  imageUrl?: string;
  diagram?: string;
  source: string;
  audio_available: boolean;
  questions: QuestionData[];
}

export interface AskillaCourseModule {
  id: string;
  topic: string;
  concise_topic: string;
  language: LearningLanguage;
  modules: LessonSubModule[];
  related_topics: string[];
}

export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  preferredLanguage: LearningLanguage;
}

export interface CompletedCertificate {
  id: string;
  topic: string;
  learnerName: string;
  dateCompleted: string;
  totalModules: number;
  scorePercent: number;
  language: LearningLanguage;
}

export type AppScreen =
  | "landing"
  | "onboarding"
  | "intro"
  | "home"
  | "module"
  | "progress"
  | "settings"
  | "welcome";
