"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Flame, ArrowRight, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const storyValues = [
  {
    title: "Vision",
    description: "To become the world's most trusted and ubiquitous payment gateway for the global trading community.",
    icon: Target,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Mission",
    description: "To provide a frictionless, secure, and rapid financial infrastructure that enables traders to execute their strategies with speed and precision, 24/7.",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

function scrollToSection(href: string) {
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 270;
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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Enhanced scrolling parallax effects for the phone
  const phoneRotate = useTransform(smoothProgress, [0, 1], [12, -35]);
  const phoneX = useTransform(smoothProgress, [0, 1], [150, 450]);

  return (
    <section id="about" ref={containerRef} className="relative py-24 overflow-hidden bg-background transition-colors duration-500">
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
        <div className="absolute top-1/2 -left-20 h-[600px] w-[600px] rounded-full bg-[#3B82F6]/10 blur-[140px]" />
        <div className="absolute bottom-0 -right-20 h-[500px] w-[500px] rounded-full bg-[#2563EB]/5 blur-[120px]" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6">
              <Flame className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">ABOUT CHAINFORGE</span>
            </div>
            <h2 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6 uppercase">
              We are the{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
                Forex Mafia
              </span>
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed transition-colors">
              CHAINFORGE is a cutting-edge financial technology platform dedicated to empowering forex 
              and cryptocurrency traders. We eliminate the friction between your capital and your trading 
              strategy by providing instant, secure, and hassle-free deposit and withdrawal solutions.
              We bridge the gap between traditional finance and the digital asset world, allowing traders to 
              move funds seamlessly between their bank accounts, trading accounts, and digital wallets. 
              Our mission is to ensure that your focus remains on the markets, not on the logistics of moving 
              your money.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:scale-105 transition-all text-white font-bold px-8 py-6 rounded-2xl flex justify-center"
                onClick={() => scrollToSection("#services")}
              >
                See Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => window.open("https://wa.me/message", "_blank")}
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-border text-muted-foreground hover:text-foreground hover:bg-secondary hover:scale-105 transition-all font-bold px-8 py-6 rounded-2xl flex justify-center"
              >
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Talk to the Team
              </Button>
            </div>
          </motion.div>

          {/* Tilted Phone Visual with Scrolling Effect */}
          <div className="lg:col-span-2 relative hidden lg:flex justify-end items-center overflow-visible pointer-events-none">
            <motion.div
              style={{ 
                rotate: phoneRotate, 
                x: phoneX,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative z-10 origin-center"
            >
              <img 
                src="/phone.png" 
                alt="ChainForge Mobile" 
                className="max-h-[1100px] w-auto drop-shadow-[0_40px_120px_rgba(59,130,246,0.45)] scale-[1.6] will-change-transform"
              />
            </motion.div>
          </div>
        </div>

        {/* Our Story Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 mb-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {storyValues.map((value, i) => (
              <div key={i} className="p-5 rounded-2xl bg-card border border-border backdrop-blur-xl hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className={`h-10 w-10 rounded-xl ${value.bg} flex items-center justify-center mb-4`}>
                  <value.icon className={`h-5 w-5 ${value.color}`} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1 uppercase">{value.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed transition-colors">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
