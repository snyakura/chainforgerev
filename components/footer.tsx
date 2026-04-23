"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Mail, Phone, MapPin, Twitter, Youtube, Linkedin, Instagram, MessageCircle } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Trading Signals", href: "#services" },
    { label: "Deriv Funding", href: "#services" },
    { label: "Weltrade Support", href: "#services" },
    { label: "Crypto Exchange", href: "#services" },
    { label: "Withdrawals", href: "#services" },
  ],
  resources: [
    { label: "Market News", href: "#news" },
    { label: "FAQ", href: "#contact" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Partners", href: "#services" },
    { label: "Contact", href: "#news" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/message", label: "WhatsApp" },
];

function scrollToSection(href: string) {
  if (href === "#") return;
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 270;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center justify-end lg:justify-start gap-2">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] items-center justify-center lg:-ml-8" // This div always renders to reserve space
              >
                {mounted ? ( // Conditionally render the image or a placeholder
                  <img src={resolvedTheme === "dark" ? "/q.png" : "/q1.png"} alt="ChainForge Logo" className="h-full w-full object-contain" />
                ) : (
                  <div className="h-full w-full" /> // Placeholder to prevent layout shift
                )}
              </motion.div>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Signal provision and seamless transactions for traders 18+. We assist in funding 
              and withdrawing from Deriv, Weltrade, and other brokers.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:support@chainforge.trade"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                support@chainforge.trade
              </a>
              <a
                href="https://wa.me/message"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Support
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Global Service
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all hover:border-blue-500 hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#2563EB] hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CHAINFORGE. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Risk Warning: Trading involves significant risk of loss. Past
              performance is not indicative of future results. 18+ only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
