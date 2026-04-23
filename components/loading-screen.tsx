"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // Main container for the loading screen, fades out when loading is complete
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex items-center justify-center">
        {/* Lively Glow Effect - Made slightly larger and with slightly higher opacity for better visibility */}
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1], // More pronounced pulse
            opacity: [0.1, 0.5, 0.1] // Brighter glow
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 h-72 w-72 rounded-full bg-[#3B82F6]/20 blur-[80px]"
        />

        {/* Theme-aware Brand Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
          }}
          transition={{ 
            scale: { type: "spring", stiffness: 100, damping: 15 },
            opacity: { duration: 0.8 }
          }}
         // className="relative flex h-96 w-96 items-center justify-center"
          className="relative flex h-[200px] w-[200px] items-center justify-center"
        >
          {mounted && (
            <motion.img
              src={resolvedTheme === "dark" ? "/q.png" : "/q1.png"}
              alt="ChainForge Loading..."
              className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              animate={{
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}