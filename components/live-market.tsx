"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function LiveMarket() {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !container.current) return;
    
    container.current.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": true,
      "locale": "en",
      "largeChartUrl": "",
      "isTransparent": true,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "width": "100%",
      "height": "600",
      "tabs": [
        {
          "title": "Forex",
          "symbols": [
            { "s": "FX:EURUSD", "d": "EUR/USD" },
            { "s": "FX:GBPUSD", "d": "GBP/USD" },
            { "s": "FX:USDJPY", "d": "USD/JPY" },
            { "s": "FX:USDZAR", "d": "USD/ZAR" },
            { "s": "FX:AUDUSD", "d": "AUD/USD" },
            { "s": "FX:XAUUSD", "d": "Gold" }
          ]
        },
        {
          "title": "Crypto",
          "symbols": [
            { "s": "BINANCE:BTCUSDT", "d": "Bitcoin" },
            { "s": "BINANCE:ETHUSDT", "d": "Ethereum" },
            { "s": "BINANCE:SOLUSDT", "d": "Solana" },
            { "s": "BINANCE:XRPUSDT", "d": "Ripple" },
            { "s": "BINANCE:BNBUSDT", "d": "Binance Coin" }
          ]
        }
      ]
    });
    container.current.appendChild(script);
  }, [mounted]);

  return (
    <section className="relative py-24 overflow-hidden" id="market">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-20 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Live Market Terminal
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Institutional grade data feeds and real-time analysis
          </p>
        </motion.div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/5 bg-[#020617]/50 backdrop-blur-xl shadow-2xl min-h-[600px]">
          <div ref={container} className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
