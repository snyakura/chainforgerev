"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
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
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 h-72 w-72 rounded-full bg-[#F59E0B]/20 blur-[80px]"
        />

        {/* Smoothly Spinning Bitcoin Coin - References your image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            // Continuous infinite spin
            rotateY: 360 
          }}
          transition={{ 
            scale: { type: "spring", stiffness: 100, damping: 15 },
            opacity: { duration: 0.8 },
            // Linear ease ensures a perfectly constant, smooth rotation speed
            rotateY: { duration: 4, repeat: Infinity, ease: "linear" }
          }}
          className="relative flex h-48 w-48 items-center justify-center"
          // Crucial for true 3D effect: preserves 3D transforms and adds perspective
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <img
            // Assuming your file is in the 'public' folder and named 'bit.png'
            src="/bit.png"
            alt="Physical Bitcoin"
            // Ensure image fits and has no default background
            className="h-full w-full object-contain will-change-transform"
            // Crucial for 3D rotation: ensures the coin is visible even when viewed from the 'back'
            style={{ backfaceVisibility: "visible" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}