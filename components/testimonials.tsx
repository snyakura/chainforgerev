"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Full-time Trader",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    profit: "+$45,000",
    text: "TradeMaster completely transformed my understanding of forex markets. The risk management modules alone were worth the investment. I went from losing consistently to profitable within 6 months.",
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
    text: "Trading has become my second income stream thanks to TradeMaster. The courses are practical, the signals are accurate, and the mentors truly care about your success.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20" id="testimonials">
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
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50"
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
                <span className="rounded-full bg-chart-2/10 px-3 py-1 text-sm font-semibold text-chart-2">
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
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Ready to Start Your Trading Journey?
            </h3>
            <p className="mt-1 text-muted-foreground">
              Join 50,000+ traders and start learning today
            </p>
          </div>
          <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            Get Started Free
          </button>
        </motion.div>
      </div>
    </section>
  );
}
