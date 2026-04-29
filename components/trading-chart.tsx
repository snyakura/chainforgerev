"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function TradingChart() {
  const [data, setData] = useState<{time: string, price: number}[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    // 1. Fetch real 24h history from Binance (1h intervals)
    const fetchHistory = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24");
        const rawData = await res.json();
        const formatted = rawData.map((d: any) => ({
          time: new Date(d[0]).getHours() + ":00",
          price: Math.round(parseFloat(d[4])), // Closing price
        }));
        setData(formatted);
        setCurrentPrice(formatted[formatted.length - 1].price);
      } catch (e) {
        console.error("Failed to fetch BTC history", e);
      }
    };

    fetchHistory();

    // 2. Subscribe to real-time price updates via WebSocket
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    
    ws.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      const newPrice = Math.round(parseFloat(trade.p));
      
      setCurrentPrice(newPrice);
      
      // Update the last data point in the chart to reflect the current live price
      setData(prev => {
        if (prev.length === 0) return prev;
        const lastIndex = prev.length - 1;
        const updated = [...prev];
        updated[lastIndex] = { ...updated[lastIndex], price: newPrice };
        return updated;
      });
    };

    // 3. Fallback: every hour, refresh the history to shift the chart
    const refreshInterval = setInterval(fetchHistory, 3600000);

    return () => {
      ws.close();
      clearInterval(refreshInterval);
    };
  }, []);

  if (data.length === 0) return null;

  const minPrice = Math.min(...data.map((d) => d.price)) - 200;
  const maxPrice = Math.max(...data.map((d) => d.price)) + 200;
  const priceChange = currentPrice - data[0].price;
  const priceChangePercent = ((priceChange / data[0].price) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-foreground">
            ${currentPrice.toLocaleString()}
          </span>
          <span
            className={`ml-2 text-sm font-medium ${isPositive ? "text-chart-2" : "text-destructive"}`}
          >
            {isPositive ? "+" : ""}
            {priceChangePercent}%
          </span>
        </div>
        <span className="text-xs text-muted-foreground">24h</span>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? "#3b82f6" : "#ef4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? "#3b82f6" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#3b82f6" : "#ef4444"}
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
