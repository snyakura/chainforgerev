"use client";

import { motion } from "framer-motion";
import { BookOpen, TrendingUp, BarChart3, Shield, Clock, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Forex Fundamentals",
    description: "Learn the basics of forex trading, currency pairs, and market analysis techniques.",
    icon: TrendingUp,
    level: "Beginner",
    duration: "4 weeks",
    students: 2450,
    price: 49,
    features: ["Market basics", "Technical analysis", "Risk management", "Live demos"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    title: "Crypto Trading Mastery",
    description: "Master cryptocurrency trading with advanced strategies for BTC, ETH, and altcoins.",
    icon: BarChart3,
    level: "Intermediate",
    duration: "6 weeks",
    students: 1820,
    price: 99,
    features: ["Crypto fundamentals", "DeFi strategies", "Portfolio building", "Signal analysis"],
    color: "from-primary to-orange-500",
    popular: true,
  },
  {
    id: 3,
    title: "Advanced Signal Trading",
    description: "Professional signal interpretation and execution strategies for consistent profits.",
    icon: Shield,
    level: "Advanced",
    duration: "8 weeks",
    students: 945,
    price: 199,
    features: ["Signal mastery", "Risk/reward ratios", "Position sizing", "1-on-1 mentorship"],
    color: "from-violet-500 to-purple-500",
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
  return (
    <section id="courses" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trading Education</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
            Master Trading with Our <span className="text-primary">Expert Courses</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From beginner to advanced, our comprehensive courses will help you become a profitable trader
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              {course.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-full bg-gradient-to-r from-primary to-orange-500 px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Course Header */}
              <div className={`bg-gradient-to-r ${course.color} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <course.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-white/80">{course.description}</p>
              </div>

              {/* Course Body */}
              <div className="flex flex-1 flex-col p-6">
                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-6">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-foreground">${course.price}</span>
                    <span className="text-sm text-muted-foreground">/course</span>
                  </div>
                  <Button
                    onClick={() => alert(`Enrolling in ${course.title} - Coming soon!`)}
                    className={`bg-gradient-to-r ${course.color} text-white hover:opacity-90`}
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which course is right for you?
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Get Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
