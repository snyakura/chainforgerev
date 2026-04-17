"use client";

import { Mail, Phone, MapPin, Twitter, Youtube, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  courses: [
    { label: "Forex Basics", href: "#courses" },
    { label: "Crypto Trading", href: "#courses" },
    { label: "Technical Analysis", href: "#courses" },
    { label: "Risk Management", href: "#courses" },
    { label: "Advanced Strategies", href: "#courses" },
  ],
  resources: [
    { label: "Market News", href: "#news" },
    { label: "Economic Calendar", href: "#market" },
    { label: "Trading Tools", href: "#market" },
    { label: "Glossary", href: "#news" },
    { label: "FAQ", href: "#contact" },
  ],
  company: [
    { label: "About Us", href: "#courses" },
    { label: "Careers", href: "#contact" },
    { label: "Partners", href: "#payments" },
    { label: "Press", href: "#news" },
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
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

function scrollToSection(href: string) {
  if (href === "#") return;
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-orange-500">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary-foreground">
                  <path d="M11.5 11.5v-2h1.75c.55 0 1 .45 1 1s-.45 1-1 1H11.5zm0 1h2.25c.55 0 1 .45 1 1s-.45 1-1 1H11.5v-2z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 13.5c0 1.1-.67 2.04-1.62 2.44l.37 1.06h-1.5l-.3-.87H11.5v.87h-1.5v-.87h-1V17.5h1v-7H9V9h1v-.87h1.5V9h1.2l.3-.87h1.5l-.37 1.06c.95.4 1.62 1.34 1.62 2.44 0 .59-.19 1.13-.52 1.57.33.44.52.98.52 1.57V15.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">
                Trade<span className="text-primary">Master</span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Empowering traders worldwide with expert education, real-time
              market analysis, and proven trading strategies since 2018.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:support@trademaster.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                support@trademaster.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                123 Trading Street, New York, NY
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all hover:border-primary hover:bg-gradient-to-r hover:from-primary hover:to-orange-500 hover:text-primary-foreground"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold text-foreground">Courses</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.courses.map((link) => (
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
              &copy; {new Date().getFullYear()} TradeMaster Institute. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Risk Warning: Trading involves significant risk of loss. Past
              performance is not indicative of future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
