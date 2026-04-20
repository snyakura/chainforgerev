"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { symbol: "BTC/USD", price: "64,120.50", change: "+2.45%", isUp: true },
  { symbol: "ETH/USD", price: "3,450.12", change: "-0.82%", isUp: false },
  { symbol: "EUR/USD", price: "1.0842", change: "+0.12%", isUp: true },
  { symbol: "GBP/USD", price: "1.2654", change: "+0.05%", isUp: true },
  { symbol: "XAU/USD", price: "2,175.40", change: "+1.15%", isUp: true },
  { symbol: "USD/ZAR", price: "18.92", change: "-0.45%", isUp: false },
  { symbol: "SOL/USD", price: "145.20", change: "+5.40%", isUp: true },
  { symbol: "NAS100", price: "18,240.50", change: "-0.15%", isUp: false },
];

export function MarketTicker() {
  // We triple the data to ensure a seamless loop on very wide screens
  const scrollingData = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-12 border-b border-border/10 bg-background/95 backdrop-blur-md overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap gap-12 px-6"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          duration: 35,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {scrollingData.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5 text-[11px] font-semibold tracking-wide">
            <span className="text-muted-foreground uppercase">{item.symbol}</span>
            <span className="text-foreground tabular-nums">{item.price}</span>
            <span className={`flex items-center gap-0.5 ${item.isUp ? "text-emerald-500" : "text-rose-500"}`}>
              {item.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
