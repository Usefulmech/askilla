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

export default function Page() {
  const { screen, darkModeEnabled, user, setScreen } = useAskillaStore();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-redirect returning users who already completed onboarding
  useEffect(() => {
    if (!mounted) return;
    const isReturningUser = user.name && user.name.trim().length > 0;
    const isOnboardingScreen = screen === "landing" || screen === "onboarding" || screen === "intro";

    if (isReturningUser && isOnboardingScreen) {
      setScreen("home");
    }
  }, [mounted, user.name, screen, setScreen]);

  useEffect(() => {
    if (darkModeEnabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkModeEnabled]);

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
      {screen === "home" && <HomeDashboard />}
      {screen === "module" && <LearningSession />}
      {screen === "progress" && <ProgressDashboard />}
      {screen === "settings" && <SettingsView />}

      {/* Mobile Bottom Navigation (Hidden on desktop) */}
      <BottomNav />
    </div>
  );
}
