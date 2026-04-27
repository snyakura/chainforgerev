"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "./loading-screen";
import { Header } from "./header";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen isolate bg-background overflow-x-hidden">
      {/* CRITICAL HYDRATION FIX: 
          Using hasMounted ensures the client doesn't try to manipulate 
          the server-rendered DOM before it's ready. 
      */}
      <AnimatePresence mode="wait">
        {(!hasMounted || showLoading) && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <div 
        className={`flex flex-col min-h-screen transition-opacity duration-1000 ${
          hasMounted && !showLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Global Page Background Effect */}
        <div className="fixed inset-0 -z-50 bg-background" />
        <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vh] bg-blue-600/10 blur-[150px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[100vw] h-[100vh] bg-blue-500/10 blur-[150px] rounded-full"
          />
        </div>

        <Header />
        <main className="relative flex-1">{children}</main>
        <ContactSection />
        <Footer />
      </div> {/* Added this missing closing div - this was line 62's problem! */}
    </div>
  );
}