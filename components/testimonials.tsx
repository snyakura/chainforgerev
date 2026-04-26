"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Full-time Trader",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$45,000",
    text: "ChainForge completely transformed my understanding of forex markets. The risk management modules alone were worth the investment. I went from losing consistently to profitable within 6 months.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Part-time Trader",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$23,500",
    text: "As a complete beginner, I was skeptical at first. But the step-by-step approach and live trading sessions gave me confidence. Now I trade part-time alongside my job.",
  },
  {
    id: 3,
    name: "David Okonkwo",
    role: "Crypto Investor",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$67,800",
    text: "The crypto trading course is exceptional. I learned how to identify trends, manage positions, and most importantly, control my emotions during volatile markets.",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Investment Banker",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$89,200",
    text: "Even with my finance background, I found tremendous value here. The advanced strategies and market psychology modules took my trading to a professional level.",
  },
  {
    id: 5,
    name: "Kenji Tanaka",
    role: "Software Engineer",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$34,600",
    text: "The technical analysis course is incredibly detailed. I now understand chart patterns and indicators at a deep level. The community support is also amazing.",
  },
  {
    id: 6,
    name: "Isabella Martinez",
    role: "Entrepreneur",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$52,300",
    text: "Trading has become my second income stream thanks to ChainForge. The courses are practical, the signals are accurate, and the mentors truly care about your success.",
  },
];

export function Testimonials() {
  return null;
  /*
  return (
    <section className="py-20" id="testimonials" data-section="community">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Success Stories from Our Traders
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Join thousands of traders who have transformed their financial
            future with our comprehensive trading education
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl border border-white/5 bg-card p-6 transition-all hover:border-white/20"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-500">
                  {testimonial.profit}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &quot;{testimonial.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Ready to Start Your Trading Journey?
            </h3>
            <p className="mt-1 text-muted-foreground">
              Join our community of elite traders and start growing your portfolio today
            </p>
          </div>
          <a 
            href="https://whatsapp.com/channel/0029VaVnVETC6ZvgsD8foc3E"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-8 py-3 font-semibold text-white transition-all hover:opacity-90 inline-flex items-center gap-2"
          >
            <WhatsAppIcon className="h-5 w-5" /> Join WhatsApp Channel
          </a>
        </motion.div>
      </div>
    </section>
  );
  */
}
