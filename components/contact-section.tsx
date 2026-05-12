"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen border-y border-border py-32 overflow-hidden bg-background isolate transition-colors duration-500">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Emerald Radial Glows */}
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        
        {/* Glowing Circuit Lines */}
        <div className="absolute top-[10%] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
        <div className="absolute bottom-[20%] right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-blue-500/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />

        {/* Ghost Typography */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
          <span className="text-[22vw] font-black tracking-tighter uppercase leading-none text-blue-500 dark:text-blue-500">
            CONTACT
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Get In Touch Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 text-center flex flex-col items-center"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">GET IN TOUCH</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter leading-tight">
                Let&apos;s Build <br />
                <span className="text-blue-500">The Future.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Have inquiries about our signals or transactions? Our elite support team is ready to assist you in navigating the markets.
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              {[
                { icon: Mail, label: "Email", value: "chainforge@gmail.com" },
                { icon: Phone, label: "Phone", value: "+263 78 429 3089" },
                { icon: MapPin, label: "Location", value: "4th floor right wing zimdef bulawayo" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-card/60 border border-border backdrop-blur-md transition-all hover:bg-secondary/50 hover:border-blue-500/20"
                >
                  <div className="h-12 w-12 rounded-xl bg-secondary/30 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <item.icon className="h-5 w-5 text-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}