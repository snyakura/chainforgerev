"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Flame, ArrowRight, MessageCircle, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const storyValues = [
  {
    title: "Trust First",
    description: "Every signal, every transaction — transparent and accountable.",
    icon: Shield,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Precision",
    description: "Data-driven setups with clearly defined entries, stops, and targets.",
    icon: Target,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    title: "Community",
    description: "An 18+ family of traders learning, winning, and growing together.",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Speed",
    description: "Fast funding and withdrawals across Deriv, Weltrade and more.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

function scrollToSection(href: string) {
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}

export function Courses() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  });

  const phoneRotate = useTransform(smoothProgress, [0, 1], [10, -45]);
  const phoneX = useTransform(smoothProgress, [0, 1], [120, 280]);

  return (
    <section id="courses" ref={containerRef} className="relative py-24 overflow-hidden bg-zinc-950">
      {/* Bitcoin Background Image */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2000&auto=format&fit=crop" 
          alt="Bitcoin Background" 
          className="h-full w-full object-cover opacity-10 grayscale"
        />
      </div>

      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 -left-20 h-[600px] w-[600px] rounded-full bg-[#F59E0B]/10 blur-[140px]" />
        <div className="absolute bottom-0 -right-20 h-[500px] w-[500px] rounded-full bg-[#D97706]/5 blur-[120px]" />
      </div>

      {/* Large Bold Background Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden">
        <span className="text-[25vw] font-black tracking-tighter uppercase text-foreground/[0.03] dark:text-foreground/[0.05] leading-none">
          Mafia
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Header Grid: Mafia Title + Tilted Phone Visual */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 py-1.5 mb-6">
              <Flame className="h-4 w-4 text-[#F59E0B]" />
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">ABOUT CHAINFORGE</span>
            </div>
            <h2 className="text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 uppercase">
              We are the{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
                Forex Mafia
              </span>
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Chainforge is a signal provision and brokerage facilitation service for serious 18+ traders. 
              We help our community fund and withdraw from Deriv, Weltrade and other major brokers — 
              and deliver the live signals, mentorship, and tools you need to trade with an edge.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:scale-105 transition-all text-white hover:text-black font-bold px-8 py-6 rounded-2xl"
                onClick={() => scrollToSection("#services")}
              >
                See Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => window.open("https://wa.me/message", "_blank")}
                variant="outline" 
                size="lg" 
                className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 hover:scale-105 transition-all font-bold px-8 py-6 rounded-2xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to the Team
              </Button>
            </div>
          </motion.div>

          {/* Tilted Phone Visual - Partially covered by right side */}
          <div className="lg:col-span-2 relative hidden lg:flex justify-end pr-0 overflow-visible pointer-events-none">
            <motion.div
              style={{ rotate: phoneRotate, x: phoneX }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[340px] h-[720px] rounded-[3.5rem] border-[8px] border-zinc-900 bg-zinc-950 shadow-[0_0_120px_rgba(245,158,11,0.4)] overflow-hidden ring-1 ring-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1611974717483-36005791a877?q=80&w=800&auto=format&fit=crop" 
                alt="TradingView XAUUSD Chart" 
                className="h-full w-full object-cover opacity-100 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
              {/* iPhone 17 Pro Max Dynamic Island */}
              <div className="absolute top-0 inset-x-0 h-10 flex justify-center pt-4">
                <div className="w-28 h-7 bg-black rounded-[1.25rem] ring-1 ring-white/5" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Story Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-start mt-24 mb-16"
        >
          <div>
            <h2 className="text-pretty text-3xl font-bold tracking-tight text-white mb-6 uppercase">
              Our story
            </h2>
            <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
              <p>
                Chainforge started as a small circle of Zimbabwean traders frustrated by the lack of local payment options and trustworthy signal providers. 
                We built what we couldn't find: a service that bridges global brokers like Deriv and Weltrade with local rails like EcoCash, InnBucks and Ozow.
              </p>
              <p>
                Today we serve a fast-growing community of traders across Southern Africa and beyond — funding accounts, 
                processing withdrawals, and delivering live signals that keep our members on the right side of the market.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {storyValues.map((value, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl hover:border-[#F59E0B]/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className={`h-10 w-10 rounded-xl ${value.bg} flex items-center justify-center mb-4`}>
                  <value.icon className={`h-5 w-5 ${value.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1 uppercase">{value.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
