"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

const INITIAL_DATA: TickerItem[] = [
  { symbol: "BTC/USD", price: "---", change: "0.00%", isUp: true },
  { symbol: "ETH/USD", price: "---", change: "0.00%", isUp: true },
  { symbol: "EUR/USD", price: "1.0842", change: "+0.12%", isUp: true },
  { symbol: "GBP/USD", price: "1.2654", change: "+0.05%", isUp: true },
  { symbol: "XAU/USD", price: "2,175.40", change: "+1.15%", isUp: true },
  { symbol: "USD/ZAR", price: "18.92", change: "-0.45%", isUp: false },
  { symbol: "SOL/USD", price: "---", change: "0.00%", isUp: true },
  { symbol: "NAS100", price: "18,240.50", change: "-0.15%", isUp: false },
];

export function MarketTicker() {
  const [data, setData] = useState<TickerItem[]>(INITIAL_DATA);

  useEffect(() => {
    // 1. Fetch Forex data once (Free tier usually doesn't provide sub-second WS)
    const fetchForex = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const rates = await res.json();
        setData(prev => prev.map(item => {
          if (item.symbol === "EUR/USD") return { ...item, price: (1 / rates.rates.EUR).toFixed(4) };
          if (item.symbol === "GBP/USD") return { ...item, price: (1 / rates.rates.GBP).toFixed(4) };
          if (item.symbol === "USD/ZAR") return { ...item, price: rates.rates.ZAR.toFixed(2) };
          return item;
        }));
      } catch (e) { console.error("Forex fetch error", e); }
    };

    // 2. Setup WebSocket for real-time Crypto data (Binance)
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/solusdt@ticker");
    
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const symbolMap: Record<string, string> = {
        BTCUSDT: "BTC/USD",
        ETHUSDT: "ETH/USD",
        SOLUSDT: "SOL/USD"
      };

      const tickerSym = symbolMap[msg.s];
      if (tickerSym) {
        setData(prev => prev.map(item => {
          if (item.symbol === tickerSym) {
            const price = parseFloat(msg.c);
            const change = parseFloat(msg.P);
            return {
              ...item,
              price: price > 100 ? price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : price.toFixed(2),
              change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
              isUp: change >= 0
            };
          }
          return item;
        }));
      }
    };

    fetchForex();
    return () => ws.close();
  }, []);

  // We triple the data to ensure a seamless loop
  const scrollingData = [...data, ...data, ...data];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-12 border-b border-border/10 bg-background/95 backdrop-blur-md overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap gap-12 px-6"
        initial={{ x: 0 }}
        animate={{ x: "-33.333%" }}
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
