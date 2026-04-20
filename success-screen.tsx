"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center space-y-6 py-12"
    >
      <div className="h-24 w-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
      </div>
      <h2 className="text-4xl font-black">Welcome to the Academy! 🎉</h2>
      <p className="text-gray-400 max-w-md mx-auto">
        Your payment has been successfully processed. Check your email for your login credentials and the "Roadmap to Profitability" PDF.
      </p>
      <Button className="bg-[#F7931A] text-black font-bold px-8 py-6 rounded-2xl group">
        Go to Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}