"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, AlertCircle, Newspaper, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    type: "alert",
    icon: AlertCircle,
    title: "Bitcoin Surges Past $67,000 Amid ETF Optimism",
    excerpt: "BTC reaches new yearly highs as institutional demand continues to grow...",
    time: "5 min ago",
    category: "Crypto",
  },
  {
    id: 2,
    type: "news",
    icon: Newspaper,
    title: "Fed Signals Potential Rate Cuts in Q3 2024",
    excerpt: "Markets react positively to dovish comments from Federal Reserve officials...",
    time: "32 min ago",
    category: "Forex",
  },
  {
    id: 3,
    type: "analysis",
    icon: TrendingUp,
    title: "EUR/USD Technical Analysis: Key Levels to Watch",
    excerpt: "Support at 1.0850 holds firm as bulls eye 1.0950 resistance zone...",
    time: "1 hour ago",
    category: "Forex",
  },
  {
    id: 4,
    type: "news",
    icon: Newspaper,
    title: "Ethereum Dencun Upgrade: What Traders Need to Know",
    excerpt: "The upcoming upgrade promises significant improvements to scalability...",
    time: "2 hours ago",
    category: "Crypto",
  },
  {
    id: 5,
    type: "alert",
    icon: AlertCircle,
    title: "GBP Volatile Ahead of UK Employment Data",
    excerpt: "Traders brace for potential volatility as key economic indicators loom...",
    time: "3 hours ago",
    category: "Forex",
  },
];

const announcements = [
  {
    id: 1,
    title: "New Advanced Crypto Course Available",
    description: "Learn advanced DeFi trading strategies from industry experts",
    badge: "New",
  },
  {
    id: 2,
    title: "Live Trading Session Tomorrow",
    description: "Join our head trader for a live EUR/USD scalping session",
    badge: "Live",
  },
  {
    id: 3,
    title: "Weekend Maintenance Notice",
    description: "Platform maintenance scheduled for Saturday 2AM-4AM UTC",
    badge: "Notice",
  },
];

export function NewsFeed() {
  return (
    <section className="py-20 bg-card/30" id="news" data-section="community">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Market News & Announcements
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stay updated with the latest market movements and platform news
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Latest News</h3>
              <button 
                onClick={() => alert("Full news archive coming soon!")}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => alert(`Reading: ${item.title}`)}
                  className="group cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/50"
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        item.type === "alert"
                          ? "bg-primary/10 text-primary"
                          : item.type === "analysis"
                            ? "bg-chart-2/10 text-chart-2"
                            : "bg-chart-4/10 text-chart-4"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.category === "Crypto"
                              ? "bg-primary/10 text-primary"
                              : "bg-chart-4/10 text-chart-4"
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">Announcements</h3>
            </div>
            <div className="space-y-4">
              {announcements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => alert(`Opening: ${item.title}`)}
                  className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.badge === "New"
                          ? "bg-chart-2/10 text-chart-2"
                          : item.badge === "Live"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4"
            >
              <h4 className="font-semibold text-primary">Join Our Newsletter</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Get daily market insights delivered to your inbox
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <button 
                  onClick={() => alert("Thanks for subscribing! Check your email for confirmation.")}
                  className="rounded-lg bg-gradient-to-r from-primary to-orange-500 px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
