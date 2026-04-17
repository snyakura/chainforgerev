"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./loading-screen";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      {!isLoading && children}
    </>
  );
}
