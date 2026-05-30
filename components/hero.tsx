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
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset) - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 bg-background transition-colors duration-500">
      {/* Background effects */}
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-20 pointer-events-none will-change-transform"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-4 sm:px-6 lg:px-8 lg:pt-32 lg:pb-8">
        <div className="flex flex-col items-center justify-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 font-semibold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Premium Trading Signals Available
            </div>

            <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Forge your wealth{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
                with The Forex 
              </span>{" "}
              Mafia
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Signal provision and seamless transactions for traders. We assist in funding and 
              withdrawing from Deriv, Weltrade, and other brokers. Join the CHAINFORGE family and 
              elevate your trading game.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 w-full max-w-lg mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:text-white flex justify-center hover:scale-105 transition-all font-bold px-8 py-6 rounded-2xl"
                  onClick={() => {
                    scrollToSection("#bridge");
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("open-deposit"));
                    }, 10);
                  }}
                >
                  Deposit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-secondary flex justify-center hover:scale-105 transition-all font-bold px-8 py-6 rounded-2xl"
                  onClick={() => {
                    scrollToSection("#bridge");
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("open-withdrawal"));
                    }, 10);
                  }}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Withdrawal
                </Button>
              </div>

              <Button
                size="lg"
                variant="ghost"
                className="w-full border border-white/20 bg-white/5 text-white transition-all font-bold px-8 py-6 rounded-2xl tracking-widest uppercase text-xs focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 flex justify-center hover:scale-105 hover:bg-white/10 hover:border-white/40"
                onClick={() => {
                  scrollToSection("#about");
                }}
              >
                <Bitcoin className="mr-2 h-4 w-4" />
                Know The Mafia
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <feature.icon className="h-4 w-4 text-blue-500" />
                  {feature.label}
                </div>
              ))}
            </div>

            {/* TUNED CONTAINER SPACING:
              - Added '-mt-12' on mobile to yank the logo up tightly under the features.
              - Added '-mb-24' on mobile to remove the dead space underneath it before the next section.
            */}
            <div className="flex justify-center -mt-12 sm:-mt-16 md:-mt-16 lg:-mt-24 -mb-24 sm:-mb-28 md:-mb-32">
              <img 
                src="/TFM.png" 
                alt="TFM Logo" 
                /* BUMPED MOBILE SIZE: Changed from h-[200px] to h-[320px] so it looks prominent on phones */
                className="h-[320px] sm:h-[400px] md:h-[500px] lg:h-[650px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}