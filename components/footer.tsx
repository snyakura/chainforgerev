"use client";

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
    { label: "Live Market", href: "#market" },
    { label: "Trading Tools", href: "#market" },
    { label: "FAQ", href: "#contact" },
  ],
  company: [
    { label: "About Us", href: "#courses" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Partners", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Risk Disclosure", href: "#" },
    { label: "Refund Policy", href: "#" },
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
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F59E0B] via-[#F59E0B] to-[#D97706]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary-foreground">
                  <path d="M11.5 11.5v-2h1.75c.55 0 1 .45 1 1s-.45 1-1 1H11.5zm0 1h2.25c.55 0 1 .45 1 1s-.45 1-1 1H11.5v-2z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 13.5c0 1.1-.67 2.04-1.62 2.44l.37 1.06h-1.5l-.3-.87H11.5v.87h-1.5v-.87h-1V17.5h1v-7H9V9h1v-.87h1.5V9h1.2l.3-.87h1.5l-.37 1.06c.95.4 1.62 1.34 1.62 2.44 0 .59-.19 1.13-.52 1.57.33.44.52.98.52 1.57V15.5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight text-foreground">
                  CHAIN<span className="text-primary">FORGE</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  The Forex Mafia
                </span>
              </div>
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all hover:border-primary hover:bg-gradient-to-r hover:from-[#F59E0B] hover:to-[#D97706] hover:text-primary-foreground"
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

          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); alert(`${link.label} - Coming soon!`); }}
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
              &copy; {new Date().getFullYear()} CHAINFORGE - The Forex Mafia. All rights
              reserved.
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
