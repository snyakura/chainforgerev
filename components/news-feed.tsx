"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import EconomicCalendarWidget from "./economic-calendar-widget";


export function NewsFeed() {

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
              Live high-impact events powered by Tradays
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                High Impact Events
              </h3>
              <button 
                onClick={() => window.open("https://www.forexfactory.com/calendar", "_blank")}
                className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
              >
                Full Calendar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <EconomicCalendarWidget />
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h4 className="font-bold text-xl text-blue-500 uppercase tracking-tight">Join Our WhatsApp Channel</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Get real-time market signals and institutional insights delivered directly to your phone.
              </p>
              <a 
                href="https://whatsapp.com/channel/your-channel-id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-6 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
              >
                Join Channel <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
