"use client";

import { motion } from "framer-motion";
import { CandlestickChart, Bitcoin, ArrowDownToLine, ArrowUpFromLine, Globe2, Zap, ShieldCheck, Network } from "lucide-react";

export function ServicesSection() {
  const forexServices = [
    { title: "Instant Deposits", desc: "Fund your MT4, MT5, cTrader, and other brokerage accounts without delays.", icon: ArrowDownToLine },
    { title: "Fast Withdrawals", desc: "Access your profits quickly with streamlined withdrawal processing.", icon: ArrowUpFromLine },
    { title: "Multiple Currencies", desc: "Support for major fiat currencies (USD, EUR, GBP, etc.) with competitive exchange rates.", icon: Globe2 },
  ];

  const cryptoServices = [
    { title: "One-Click Transfers", desc: "Easily deposit crypto from your personal wallet to any major exchange (Binance, Coinbase, Bybit, etc.).", icon: Zap },
    { title: "Direct to Wallet", desc: "Withdraw your trading gains directly back to your secure cold storage wallet.", icon: ShieldCheck },
    { title: "Multi-Chain Support", desc: "Seamless transactions across various blockchain networks.", icon: Network },
  ];

  return (
    <section id="services" className="relative py-24 bg-background text-foreground isolate font-sans border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-5xl font-black uppercase tracking-tighter">Elite <span className="text-blue-500">Services</span></h2>
          <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.3em]">Institutional Grade Financial Infrastructure</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Forex Traders */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 border-l-4 border-blue-500 pl-6">
              <CandlestickChart className="h-8 w-8 text-blue-500" />
              <h3 className="text-2xl font-black uppercase tracking-widest text-foreground">Forex Traders</h3>
            </div>
            <div className="grid gap-6">
              {forexServices.map((service, i) => (
                <div key={i} className="group p-6 rounded-3xl bg-card border border-border hover:border-blue-500/30 transition-all">
                  <div className="flex gap-5">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <service.icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase text-foreground">{service.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Crypto Traders */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 border-l-4 border-blue-400 pl-6">
              <Bitcoin className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-black uppercase tracking-widest text-foreground">Crypto Traders</h3>
            </div>
            <div className="grid gap-6">
              {cryptoServices.map((service, i) => (
                <div key={i} className="group p-6 rounded-3xl bg-card border border-border hover:border-blue-400/30 transition-all">
                  <div className="flex gap-5">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                      <service.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase text-foreground">{service.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}