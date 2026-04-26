"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Mail, Phone, MapPin, Twitter, Youtube, Linkedin, Instagram } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

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
    // { label: "Testimonials", href: "#testimonials" },
    { label: "Partners", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: WhatsAppIcon, href: "https://whatsapp.com/channel/0029VaVnVETC6ZvgsD8foc3E", label: "WhatsApp" },
];

function scrollToSection(href: string) {
  if (href === "#") return;
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset) - headerOffset;
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
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center justify-center lg:justify-start gap-2">
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

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-center lg:text-left mx-auto lg:mx-0">
              Signal provision and seamless transactions for traders 18+. We assist in funding 
              and withdrawing from Deriv, Weltrade, and other brokers.
            </p>

            <div className="mt-6 space-y-3 flex flex-col items-center lg:items-start">
              <a
                href="mailto:support@chainforge.trade"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                support@chainforge.trade
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Global Service
              </p>
            </div>

            <div className="mt-6 flex justify-center lg:justify-start gap-3">
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
              &copy; {mounted ? new Date().getFullYear() : "2025"} CHAINFORGE. All rights reserved.
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
