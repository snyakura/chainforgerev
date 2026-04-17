"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

const initialTickers: TickerItem[] = [
  { symbol: "BTC/USD", price: 67523.45, change: 2.34 },
  { symbol: "ETH/USD", price: 3456.78, change: -1.23 },
  { symbol: "XRP/USD", price: 0.5234, change: 4.56 },
  { symbol: "SOL/USD", price: 145.67, change: -2.89 },
  { symbol: "EUR/USD", price: 1.0872, change: 0.15 },
  { symbol: "GBP/USD", price: 1.2634, change: -0.08 },
  { symbol: "USD/JPY", price: 154.32, change: 0.23 },
  { symbol: "ADA/USD", price: 0.4523, change: 3.21 },
  { symbol: "DOGE/USD", price: 0.1234, change: -1.45 },
  { symbol: "LINK/USD", price: 14.56, change: 2.87 },
];

export function MarketTicker() {
  const [tickers, setTickers] = useState(initialTickers);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          const priceChange = (Math.random() - 0.5) * (item.price * 0.002);
          const newPrice = item.price + priceChange;
          const changeVariation = (Math.random() - 0.5) * 0.3;
          return {
            ...item,
            price: Number(newPrice.toFixed(item.price < 10 ? 4 : 2)),
            change: Number((item.change + changeVariation).toFixed(2)),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate tickers for seamless loop
  const duplicatedTickers = [...tickers, ...tickers];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] overflow-hidden border-b border-primary/20 bg-background/95 backdrop-blur-sm">
      <motion.div
        animate={{ x: [0, -50 * tickers.length] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="flex items-center py-2"
      >
        {duplicatedTickers.map((ticker, index) => (
          <div
            key={`${ticker.symbol}-${index}`}
            className="flex shrink-0 items-center gap-2 px-4 border-r border-border/30"
          >
            <span className="font-mono text-xs font-medium text-foreground">
              {ticker.symbol}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              ${ticker.price.toLocaleString()}
            </span>
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                ticker.change >= 0 ? "text-chart-2" : "text-destructive"
              }`}
            >
              {ticker.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {ticker.change >= 0 ? "+" : ""}
              {ticker.change}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
