"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles([...Array(6)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Bitcoin Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
        />
        
        {/* Middle pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-8 rounded-full bg-primary/10"
        />

        {/* Bitcoin Icon Container */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] via-[#F59E0B] to-[#D97706] shadow-2xl shadow-primary/50"
        >
          {/* Bitcoin Symbol */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-14 w-14 text-primary-foreground"
          >
            <path d="M11.5 11.5v-2h1.75c.55 0 1 .45 1 1s-.45 1-1 1H11.5zm0 1h2.25c.55 0 1 .45 1 1s-.45 1-1 1H11.5v-2z" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 13.5c0 1.1-.67 2.04-1.62 2.44l.37 1.06h-1.5l-.3-.87H11.5v.87h-1.5v-.87h-1V17.5h1v-7H9V9h1v-.87h1.5V9h1.2l.3-.87h1.5l-.37 1.06c.95.4 1.62 1.34 1.62 2.44 0 .59-.19 1.13-.52 1.57.33.44.52.98.52 1.57V15.5z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground">
          CHAIN<span className="text-primary">FORGE</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Loading markets...</p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-secondary"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary/30"
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: 1,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
        />
      ))}
    </motion.div>
  );
}
