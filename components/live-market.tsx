"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  type: "crypto" | "forex";
}

const initialMarketData: MarketData[] = [
  { symbol: "BTC/USD", name: "Bitcoin", price: 67523.45, change: 2.34, volume: "24.5B", type: "crypto" },
  { symbol: "ETH/USD", name: "Ethereum", price: 3456.78, change: -1.23, volume: "12.3B", type: "crypto" },
  { symbol: "EUR/USD", name: "Euro", price: 1.0872, change: 0.15, volume: "8.2B", type: "forex" },
  { symbol: "GBP/USD", name: "British Pound", price: 1.2634, change: -0.08, volume: "5.1B", type: "forex" },
  { symbol: "XRP/USD", name: "Ripple", price: 0.5234, change: 4.56, volume: "2.1B", type: "crypto" },
  { symbol: "USD/JPY", name: "Japanese Yen", price: 154.32, change: 0.23, volume: "6.8B", type: "forex" },
  { symbol: "SOL/USD", name: "Solana", price: 145.67, change: -2.89, volume: "3.4B", type: "crypto" },
  { symbol: "AUD/USD", name: "Australian Dollar", price: 0.6542, change: 0.45, volume: "4.2B", type: "forex" },
];

export function LiveMarket() {
  const [marketData, setMarketData] = useState(initialMarketData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "crypto" | "forex">("all");

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          const priceChange = (Math.random() - 0.5) * (item.price * 0.001);
          const newPrice = item.price + priceChange;
          const changeVariation = (Math.random() - 0.5) * 0.5;
          return {
            ...item,
            price: Number(newPrice.toFixed(item.price < 10 ? 4 : 2)),
            change: Number((item.change + changeVariation).toFixed(2)),
          };
        })
      );
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredData = marketData.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section className="py-20" id="market">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Live Market Data
            </h2>
            <p className="mt-2 text-muted-foreground">
              Real-time prices updated every 3 seconds
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex rounded-lg border border-border bg-card p-1">
              {(["all", "crypto", "forex"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    filter === type
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3 animate-spin" />
              {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Asset
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    24h Change
                  </th>
                  <th className="hidden px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Volume
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="transition-colors hover:bg-secondary/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            item.type === "crypto"
                              ? "bg-primary/10 text-primary"
                              : "bg-chart-4/10 text-chart-4"
                          }`}
                        >
                          <span className="text-xs font-bold">
                            {item.symbol.slice(0, 3)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {item.symbol}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono font-medium text-foreground">
                        ${item.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${
                          item.change >= 0
                            ? "bg-chart-2/10 text-chart-2"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {item.change >= 0 ? "+" : ""}
                        {item.change}%
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-right text-muted-foreground sm:table-cell">
                      ${item.volume}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => alert(`Trading ${item.symbol} - Feature coming soon!`)}
                        className="rounded-lg bg-gradient-to-r from-primary/20 to-orange-500/20 px-4 py-2 text-sm font-medium text-primary transition-all hover:from-primary hover:to-orange-500 hover:text-primary-foreground"
                      >
                        Trade
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
