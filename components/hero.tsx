"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Signal, Wallet, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Signal, label: "Premium Signals" },
  { icon: Wallet, label: "Funding & Withdrawals" },
  { icon: Shield, label: "Secure Transactions" },
  { icon: Zap, label: "Instant Processing" },
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
    <section id="home" className="relative min-h-screen overflow-hidden pt-32">
      {/* Background effects */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-20 pointer-events-none"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Premium Trading Signals Available
            </div>

            <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Forge your wealth{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
                with The Forex 
              </span>{" "}
              Mafia
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Signal provision and seamless transactions for traders. We assist in funding and 
              withdrawing from Deriv, Weltrade, and other brokers. Join the CHAINFORGE family and 
              elevate your trading game.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-primary-foreground hover:text-black sm:w-auto flex justify-center hover:scale-105 transition-all"
                onClick={() => scrollToSection("#services")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-border text-zinc-400 hover:text-white hover:bg-secondary flex justify-center hover:scale-105 transition-all sm:w-auto"
                onClick={() => scrollToSection("#courses")}
              >
                <Bitcoin className="mr-2 h-5 w-5 -rotate-12" />
                Know About the Mafia
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
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
        </div>
      </div>
    </section>
  );
}
