"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Shield, Zap, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradingChart } from "@/components/trading-chart";

const stats = [
  { label: "Active Traders", value: "50K+" },
  { label: "Success Rate", value: "94%" },
  { label: "Countries", value: "120+" },
  { label: "Courses", value: "45+" },
];

const features = [
  { icon: TrendingUp, label: "Expert Mentorship" },
  { icon: Signal, label: "Live Trading Signals" },
  { icon: Shield, label: "Risk Management Tools" },
  { icon: Zap, label: "Real-time Analysis" },
];

function scrollToSection(href: string) {
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export function Hero() {
  return (
    <section id="courses" className="relative min-h-screen overflow-hidden pt-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live Trading Sessions Available
            </div>

            <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Master{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Forex & Crypto
              </span>{" "}
              Trading
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Transform your financial future with expert-led mentorship, real-time trading signals, 
              and professional tools. Join over 50,000 successful traders who have mastered the 
              markets with our proven strategies.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-orange-500 text-primary-foreground hover:opacity-90 sm:w-auto"
                onClick={() => scrollToSection("#market")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary sm:w-auto"
                onClick={() => scrollToSection("#payments")}
              >
                Join Now
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 lg:justify-start">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  {feature.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Trading chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-primary/10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-primary">
                      <path d="M11.5 11.5v-2h1.75c.55 0 1 .45 1 1s-.45 1-1 1H11.5zm0 1h2.25c.55 0 1 .45 1 1s-.45 1-1 1H11.5v-2z" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 13.5c0 1.1-.67 2.04-1.62 2.44l.37 1.06h-1.5l-.3-.87H11.5v.87h-1.5v-.87h-1V17.5h1v-7H9V9h1v-.87h1.5V9h1.2l.3-.87h1.5l-.37 1.06c.95.4 1.62 1.34 1.62 2.44 0 .59-.19 1.13-.52 1.57.33.44.52.98.52 1.57V15.5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    BTC/USD Live
                  </span>
                </div>
              </div>
              <TradingChart />
            </div>

            {/* Floating profit indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/20">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">+12.5% Today</p>
                  <p className="text-xs text-muted-foreground">Portfolio Growth</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
