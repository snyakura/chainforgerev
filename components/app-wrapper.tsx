"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "./loading-screen";
import { Header } from "./header";
import { Footer } from "./footer";

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
      {!isLoading && (
        <div className="relative min-h-screen">
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
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}
