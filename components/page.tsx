"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, Zap, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

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

const values = [
  {
    title: "VISION",
    description: "To become the world's most trusted and ubiquitous payment gateway for the global trading community.",
    icon: Target,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "MISSION",
    description: "To provide a frictionless, secure, and rapid financial infrastructure that enables traders to execute their strategies with speed and precision, 24/7.",
    icon: Zap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

const stats = [
  { label: "Members served", value: "5,000+" },
  { label: "Volume processed", value: "$2.4M+" },
  { label: "Average signal win rate", value: "73%" },
];

export default function AboutPage() {
  return (
    <section id="about-stats" className="relative min-h-screen bg-background transition-colors duration-500 pt-72 pb-20">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#3B82F6]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6"
          >
            <Flame className="h-4 w-4 text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">ABOUT CHAINFORGE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 uppercase"
          >
            We are the <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">Forex Mafia</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed"
          >
            CHAINFORGE is a cutting-edge financial technology platform dedicated to empowering forex 
            and cryptocurrency traders. We eliminate the friction between your capital and your trading 
            strategy by providing instant, secure, and hassle-free deposit and withdrawal solutions.
            We bridge the gap between traditional finance and the digital asset world, allowing traders to 
            move funds seamlessly between their bank accounts, trading accounts, and digital wallets. 
            Our mission is to ensure that your focus remains on the markets, not on the logistics of moving 
            your money.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:scale-105 transition-all text-white font-bold px-8 py-6 rounded-2xl"
              onClick={() => scrollToSection("#services")}
            >
              See Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a 
              href="https://whatsapp.com/channel/0029VaVnVETC6ZvgsD8foc3E"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
              className="inline-flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary hover:scale-105 transition-all font-bold px-8 py-6 rounded-2xl bg-card"
            >
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Talk to the Team
            </a>
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-card/50 border border-border backdrop-blur-xl text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-foreground mb-2">{stat.value}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-card border border-border hover:border-blue-500/30 transition-all group"
            >
              <div className={`h-12 w-12 rounded-2xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon className={`h-6 w-6 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}