"use client";

import React from "react";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  bottomInset?: "nav" | "chat" | "none";
}

interface PageContentProps {
  children: React.ReactNode;
  as?: "main" | "div";
  className?: string;
}

const bottomInsetClass = {
  nav: "pb-24 md:pb-12",
  chat: "pb-32 md:pb-28",
  none: "pb-8",
};

export const PageShell: React.FC<PageShellProps> = ({
  children,
  className = "",
  bottomInset = "nav",
}) => (
  <div
    className={`min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#1C1917] dark:text-[#F5F5F4] md:pl-64 transition-colors duration-200 ${bottomInsetClass[bottomInset]} ${className}`}
  >
    {children}
  </div>
);

export const PageContent: React.FC<PageContentProps> = ({
  children,
  as = "div",
  className = "",
}) => {
  const Component = as;

  return (
    <Component className={`w-full px-4 md:px-12 pt-20 md:pt-8 pb-8 ${className}`}>
      {children}
    </Component>
  );
};
