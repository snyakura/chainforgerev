"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bitcoin, CreditCard, Smartphone, Globe, Wallet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  {
    name: "Deriv",
    description: "Trade with Deriv",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    color: "from-red-500 to-red-600",
  },
  {
    name: "EcoCash",
    description: "Mobile money",
    icon: Smartphone,
    color: "from-green-500 to-green-600",
  },
  {
    name: "InnBucks",
    description: "Digital wallet",
    icon: Wallet,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Crypto",
    description: "BTC, ETH, USDT",
    icon: Bitcoin,
    color: "from-primary to-orange-500",
  },
  {
    name: "Ozow",
    description: "Instant EFT",
    icon: Globe,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "PayPal",
    description: "Secure payments",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
    ),
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "Visa",
    description: "Credit/Debit card",
    icon: CreditCard,
    color: "from-blue-700 to-blue-800",
  },
  {
    name: "Mastercard",
    description: "Credit/Debit card",
    icon: CreditCard,
    color: "from-orange-600 to-red-600",
  },
];

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("100");

  const handlePayment = () => {
    if (selectedMethod) {
      alert(`Processing $${amount} payment via ${selectedMethod}. Redirecting to payment gateway...`);
    } else {
      alert("Please select a payment method first.");
    }
  };

  return (
    <section id="payments" className="border-y border-border bg-card/50 py-16">
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

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Payment Methods Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon;
                const isSelected = selectedMethod === method.name;
                return (
                  <motion.button
                    key={method.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedMethod(method.name)}
                    className={`group relative flex flex-col items-center rounded-xl border p-4 text-center transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${method.color} text-white transition-transform group-hover:scale-110`}
                    >
                      <IconComponent />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-foreground">
                      {method.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground">Payment Summary</h3>
            
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Amount (USD)</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background py-2 pl-8 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Selected Method</label>
                <div className="mt-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
                  {selectedMethod || "None selected"}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${amount}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="text-foreground">$0.00</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">${amount}</span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-primary to-orange-500 text-primary-foreground hover:opacity-90"
              >
                Confirm Payment
              </Button>
            </div>
          </motion.div>
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
