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

const generateInitialData = () => {
  const data = [];
  let price = 67500;
  for (let i = 0; i < 24; i++) {
    price += (Math.random() - 0.48) * 500;
    data.push({
      time: `${i}:00`,
      price: Math.round(price),
    });
  }
  return data;
};

export function TradingChart() {
  const [data, setData] = useState<{time: string, price: number}[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    const initialData = generateInitialData();
    setData(initialData);
    setCurrentPrice(initialData[initialData.length - 1].price);

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastPrice = newData[newData.length - 1].price;
        const newPrice = Math.round(lastPrice + (Math.random() - 0.48) * 200);
        const hour = parseInt(newData[newData.length - 1].time.split(":")[0]);
        newData.push({
          time: `${(hour + 1) % 24}:00`,
          price: newPrice,
        });
        setCurrentPrice(newPrice);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
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
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
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
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
