"use client";

import React, { useEffect } from "react";
import { useAskillaStore } from "@/lib/store/useAskillaStore";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingModal } from "@/components/OnboardingModal";
import { IntroWalkthrough } from "@/components/IntroWalkthrough";
import { HomeDashboard } from "@/components/HomeDashboard";
import { LearningSession } from "@/components/LearningSession";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { SettingsView } from "@/components/SettingsView";
import { BottomNav } from "@/components/BottomNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { MobileHeader } from "@/components/MobileHeader";

import { WelcomeScreen } from "@/components/WelcomeScreen";

export default function Page() {
  const { screen, darkModeEnabled, user, setScreen, initializeUser } = useAskillaStore();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    initializeUser();
  }, []);

  // Auto-redirect returning users who already completed onboarding
  useEffect(() => {
    if (!mounted) return;
    const isReturningUser = user.phone && user.phone.trim().length > 0 && user.name && user.name.trim().length > 0;
    const isOnboardingScreen = screen === "landing" || screen === "onboarding";

    if (isReturningUser && isOnboardingScreen) {
      setScreen("welcome");
    }
  }, [mounted, user.phone, user.name, screen, setScreen]);

  useEffect(() => {
    if (darkModeEnabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkModeEnabled]);

  // Scroll to top when screen changes
  useEffect(() => {
    if (mounted) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [screen, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] transition-colors" />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] transition-colors duration-200 overflow-x-hidden">
      {/* Mobile Top Header (Hidden on desktop) */}
      <MobileHeader />

      {/* Desktop Fixed Left Sidebar */}
      <DesktopSidebar />

      {/* Main Screen Stage */}
      {screen === "landing" && <LandingPage />}
      {screen === "onboarding" && <OnboardingModal />}
      {screen === "intro" && <IntroWalkthrough />}
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "home" && <HomeDashboard />}
      {screen === "module" && <LearningSession />}
      {screen === "progress" && <ProgressDashboard />}
      {screen === "settings" && <SettingsView />}

      {/* Mobile Bottom Navigation (Hidden on desktop) */}
      <BottomNav />
    </div>
  );
}
