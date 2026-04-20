"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, Zap, ArrowRight, MessageCircle, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const values = [
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

const stats = [
  { label: "Members served", value: "5,000+" },
  { label: "Volume processed", value: "$2.4M+" },
  { label: "Average signal win rate", value: "73%" },
];

export default function AboutPage() {
  return (
    <section id="about" className="relative min-h-screen bg-zinc-950 pt-32 pb-20">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#F59E0B]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#D97706]/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6"
          >
            <Flame className="h-4 w-4 text-[#F59E0B]" />
            <span className="text-[10px] font-black text-[#F59E0B] uppercase tracking-[0.2em]">ABOUT CHAINFORGE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6"
          >
            We are the <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">Forex Mafia</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-zinc-400 leading-relaxed"
          >
            Chainforge is a signal provision and brokerage facilitation service for serious 18+ traders. 
            We help our community fund and withdraw from Deriv, Weltrade and other major brokers — 
            and deliver the live signals, mentorship, and tools you need to trade with an edge.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 uppercase">Our story</h2>
            <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
              <p>
                Chainforge started as a small circle of Zimbabwean traders frustrated by the lack of local payment options and trustworthy signal providers. We built what we couldn't find: a service that bridges global brokers like Deriv and Weltrade with local rails like EcoCash, InnBucks and Ozow.
              </p>
              <p>
                Today we serve a fast-growing community of traders across Southern Africa and beyond — funding accounts, processing withdrawals, and delivering live signals that keep our members on the right side of the market.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-xl text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className={`h-12 w-12 rounded-2xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon className={`h-6 w-6 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}