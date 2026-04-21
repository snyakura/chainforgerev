"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle, ArrowRight, Calendar } from "lucide-react";

interface CalendarEvent {
  title: string;
  country: string;
  date: string;
  impact: "Low" | "Medium" | "High";
  forecast: string;
  previous: string;
  actual: string;
  time: string;
}

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
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await fetch("/api/calendar");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        const filtered = (Array.isArray(data) ? data : [])
          .filter((e: CalendarEvent) => e && (e.impact === "High" || e.impact === "Medium"))
          .slice(0, 10);
        setEvents(filtered);
      } catch (error) {
        console.error("Calendar fetch error:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendar();
    const interval = setInterval(fetchCalendar, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-card/10 relative overflow-hidden" id="news" data-section="community">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Institutional Economic Calendar
          </h2>
          <p className="mt-3 text-muted-foreground">
              Live high-impact events powered by Trading Economics
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                High Impact Events
              </h3>
              <button 
                onClick={() => window.open("https://tradingeconomics.com/calendar", "_blank")}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Full Calendar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground italic">Fetching market events...</div>
              ) : events.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-md p-4 transition-all hover:border-primary/50"
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-black text-sm ${
                        item.impact === "High"
                          ? "bg-destructive/10 text-destructive ring-1 ring-destructive/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                          : "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/30"
                      }`}
                    >
                      {item.country}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.date} • {item.time}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-lg line-clamp-1">
                        {item.title}
                      </h4>
                      <div className="mt-2 flex gap-4 text-[11px] font-semibold">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground uppercase text-[8px] opacity-70">Actual</span>
                          <span className={`${item.actual ? 'text-emerald-400' : 'text-foreground'}`}>{item.actual || "-"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground uppercase text-[8px] opacity-70">Forecast</span>
                          <span className="text-foreground">{item.forecast || "-"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground uppercase text-[8px] opacity-70">Previous</span>
                          <span className="text-foreground">{item.previous || "-"}</span>
                        </div>
                        <span className={`ml-auto self-end rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter ${item.impact === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'}`}>
                          {item.impact} IMPACT
                        </span>
                      </div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <button 
                  onClick={() => {
                    if (!email || !email.includes('@')) {
                      alert("Please enter a valid email address.");
                      return;
                    }
                    alert("Thanks for subscribing! Check your email for confirmation.");
                    setEmail("");
                  }}
                  className="rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
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
