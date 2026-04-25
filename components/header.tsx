"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" }, 
  { label: "Services", href: "#services" },
  // { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Handle Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

const scrollToSection = (href: string) => {
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      // On mobile, the header might be taller or the menu might be closing
      // A slightly smaller offset (80) often works better for mobile screens
      const headerOffset = window.innerWidth < 1024 ? 80 : 100;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    if (mobileMenuOpen) {
      // 1. Close the menu first
      setMobileMenuOpen(false);
      
      // 2. Wait for the menu animation to finish (approx 300ms) 
      // before calculating the scroll position
      setTimeout(() => {
        scrollToSection(href);
      }, 350); 
    } else {
      scrollToSection(href);
    }
  };

  return (
    <header className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl rounded-2xl sm:rounded-full border border-border/50 bg-background/70 backdrop-blur-xl shadow-2xl transition-all duration-300 ring-1 ring-white/10">
      <div className="mx-auto px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] items-center justify-center relative"
            >
              {mounted ? (
                <img 
                  src={resolvedTheme === "dark" ? "/q.png" : "/q1.png"} 
                  alt="ChainForge Logo" 
                  className="h-full w-full object-contain" 
                />
              ) : (
                <div className="h-full w-full" /> 
              )}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
              ) : (
                <div className="h-4 w-4" />
              )}
            </button>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90"
                onClick={() => scrollToSection("#services")}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg lg:hidden rounded-b-2xl"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block rounded-lg px-3 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white"
                  onClick={() => {
                    scrollToSection("#services");
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