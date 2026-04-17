"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Bitcoin, Building2, Smartphone, Globe } from "lucide-react";

const paymentMethods = [
  {
    name: "Credit/Debit Cards",
    description: "Visa, Mastercard, Amex",
    icon: CreditCard,
  },
  {
    name: "Bank Transfer",
    description: "Direct bank deposits",
    icon: Building2,
  },
  {
    name: "Cryptocurrency",
    description: "BTC, ETH, USDT",
    icon: Bitcoin,
  },
  {
    name: "Digital Wallets",
    description: "PayPal, Skrill, Neteller",
    icon: Wallet,
  },
  {
    name: "Mobile Payment",
    description: "Apple Pay, Google Pay",
    icon: Smartphone,
  },
  {
    name: "Wire Transfer",
    description: "International transfers",
    icon: Globe,
  },
];

export function PaymentMethods() {
  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Secure Payment Methods
          </h2>
          <p className="mt-3 text-muted-foreground">
            Multiple payment options for your convenience
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <method.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-3 text-sm font-medium text-foreground">
                {method.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-chart-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            256-bit SSL Encryption
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-chart-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            PCI DSS Compliant
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-chart-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Instant Processing
          </div>
        </motion.div>
      </div>
    </section>
  );
}
