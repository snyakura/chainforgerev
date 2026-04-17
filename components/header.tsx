"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Award,
  Phone,
  TrendingUp,
  Newspaper,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Courses",
    href: "#courses",
    icon: BookOpen,
    submenu: [
      { label: "Forex Basics", href: "#forex-basics" },
      { label: "Crypto Trading", href: "#crypto-trading" },
      { label: "Advanced Strategies", href: "#advanced" },
    ],
  },
  { label: "Market", href: "#market", icon: BarChart3 },
  { label: "News", href: "#news", icon: Newspaper },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Community", href: "#testimonials", icon: Users },
  { label: "Success Stories", href: "#testimonials", icon: Award },
  { label: "Contact", href: "#contact", icon: Phone },
];

function scrollToSection(href: string) {
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 120; // Account for fixed header + ticker
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-[40px] left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-orange-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary-foreground">
                <path d="M11.5 11.5v-2h1.75c.55 0 1 .45 1 1s-.45 1-1 1H11.5zm0 1h2.25c.55 0 1 .45 1 1s-.45 1-1 1H11.5v-2z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 13.5c0 1.1-.67 2.04-1.62 2.44l.37 1.06h-1.5l-.3-.87H11.5v.87h-1.5v-.87h-1V17.5h1v-7H9V9h1v-.87h1.5V9h1.2l.3-.87h1.5l-.37 1.06c.95.4 1.62 1.34 1.62 2.44 0 .59-.19 1.13-.52 1.57.33.44.52.98.52 1.57V15.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">
              Trade<span className="text-primary">Master</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </a>

                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-card p-2 shadow-xl"
                    >
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => scrollToSection("#contact")}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-orange-500 text-primary-foreground hover:opacity-90"
              onClick={() => scrollToSection("#courses")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground"
                  onClick={() => {
                    scrollToSection("#contact");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-orange-500 text-primary-foreground"
                  onClick={() => {
                    scrollToSection("#courses");
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
