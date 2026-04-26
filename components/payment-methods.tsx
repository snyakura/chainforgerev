"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bitcoin, 
  Smartphone,
  FileUp, 
  Wallet, 
  Check, 
  Briefcase, 
  TrendingUp, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  QrCode, 
  ExternalLink, 
  CheckCircle2,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PaymentMethods() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    broker: "",
    brokerId: "",
    gateway: "",
    amount: "100",
    type: "deposit",
    gatewayNumber: "",
    usdtAccount: "",
    usdtRef: "",
    proofName: "",
    idDoc: "",
    passportDoc: "",
    binanceQrName: ""
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // Fee calculation logic
  const calculateFees = (amountStr: string, gateway: string, broker: string, type: string) => {
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return { brokerFee: 0, gatewayFee: 0, totalDeduction: 0, netAmount: 0 };

    let brokerFee = 0;
    let gatewayFee = 0;

    // Broker Fee (10% for Weltrade, Deriv, Other deposits)
    // This fee applies to the broker, not the payment method itself.
    if (type === "deposit" && (broker === "Weltrade" || broker === "Deriv" || broker === "Other")) {
      brokerFee = amount * 0.10;
    }

    // Payment Gateway Fee (only for deposits)
    if (type === "deposit") {
      switch (gateway) {
        case "EcoCash":
          // EcoCash fee: 2% or minimum $0.10 for small amounts
          gatewayFee = amount <= 5 ? 0.10 : amount * 0.02;
          break;
        case "InnBucks":
          // InnBucks fee: Flat $0.50
          gatewayFee = 0.50;
          break;
        case "FNB (EFT)":
          // FNB (EFT) fee: Fixed $4 charge
          gatewayFee = 4.00;
          break;
        // USDT and Cash are assumed to have their processing covered by the broker fee, or no direct gateway fee
        case "USDT":
        case "Cash":
        default:
          gatewayFee = 0;
          break;
      }
    }

    const totalDeduction = brokerFee + gatewayFee;
    const netAmount = amount - totalDeduction;

    return { brokerFee, gatewayFee, totalDeduction, netAmount: Math.max(0, netAmount) };
  };

  const { netAmount, brokerFee, gatewayFee } = calculateFees(formData.amount, formData.gateway, formData.broker, formData.type);

  return (
    <section id="services" className="relative border-y border-border/50 py-24 overflow-hidden bg-background isolate transition-colors duration-500">
      {/* Replaced bg.png with a dynamic gradient to prevent 404 */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500/5 to-transparent opacity-50" />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 -right-20 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6">
            <Briefcase className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">SERVICES & PRODUCTS</span>
          </div>
          <h2 className="text-pretty text-4xl font-black tracking-tighter text-foreground sm:text-5xl lg:text-6xl mb-6 uppercase leading-[1.1]">
            Everything you need to trade{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">with an edge</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            From live signals to broker funding, Chainforge gives you the full stack to win on Deriv, Weltrade, and beyond.
          </p>
        </motion.div>

        {/* Service Highlight Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] bg-card border border-border backdrop-blur-2xl hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 uppercase tracking-tight">Live Trading Signals</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Daily forex, indices and synthetic indices signals with entry, stop, and take-profit levels. Delivered via Telegram & WhatsApp.
            </p>
            <ul className="space-y-3">
              {["Forex majors & minors", "Deriv synthetic indices", "Risk-managed setups"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2.5rem] bg-card border border-border backdrop-blur-2xl hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wallet className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 uppercase tracking-tight">Broker Funding & Withdrawals</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We deposit and withdraw to/from Deriv, Weltrade and other major brokers using local payment rails.
            </p>
            <ul className="space-y-3">
              {["Deriv, Weltrade & more", "EcoCash, InnBucks, Ozow, crypto", "Same-day processing"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8 uppercase tracking-tight">
            Make a withdrawal or deposit
          </h3>
          <div className="bg-card/60 dark:bg-zinc-900/60 border border-border dark:border-blue-500/30 ring-1 ring-blue-500/10 dark:ring-blue-500/20 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.1)] dark:shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_80px_rgba(59,130,246,0.25)] group/form">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-600/10 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none group-hover/form:bg-blue-600/20 dark:group-hover/form:bg-blue-600/30 transition-colors duration-500" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Client Details</h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Step 01 / 04</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">Full Name</Label>
                      <Input 
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">Email Address</Label>
                      <Input 
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">Phone Number</Label>
                      <Input 
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                        placeholder="+263 77 000 000"
                        value={formData.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Identity Verification (ID or Passport)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group/id">
                          <input 
                            type="file" 
                            onChange={(e) => updateForm({ idDoc: e.target.files?.[0]?.name || "" })}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="h-20 w-full border border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/30 group-hover/id:border-blue-500/50 transition-all">
                            {formData.idDoc ? (
                              <span className="text-[10px] text-emerald-400 font-bold px-2 text-center">{formData.idDoc.substring(0, 15)}...</span>
                            ) : (
                              <><FileUp className="h-4 w-4 text-muted-foreground mb-1" /><span className="text-[9px] font-bold text-muted-foreground uppercase">National ID</span></>
                            )}
                          </div>
                        </div>

                        <div className="relative group/passport">
                          <input 
                            type="file" 
                            onChange={(e) => updateForm({ passportDoc: e.target.files?.[0]?.name || "" })}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="h-20 w-full border border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/30 group-hover/passport:border-blue-500/50 transition-all">
                            {formData.passportDoc ? (
                              <span className="text-[10px] text-emerald-400 font-bold px-2 text-center">{formData.passportDoc.substring(0, 15)}...</span>
                            ) : (
                              <><FileUp className="h-4 w-4 text-muted-foreground mb-1" /><span className="text-[9px] font-bold text-muted-foreground uppercase">Passport</span></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.name || !formData.email || !formData.phone || (!formData.idDoc && !formData.passportDoc)}
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    Continue to Broker Selection <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <button onClick={prevStep} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Broker Info</h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Step 02 / 04</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Transaction Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {["deposit", "withdrawal"].map((t) => (
                        <button 
                          key={t}
                          onClick={() => updateForm({ type: t, gateway: "" })}
                          className={`py-4 rounded-xl border text-sm font-bold uppercase transition-all ${formData.type === t ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-border bg-secondary/50 text-muted-foreground"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <Label className="text-xs uppercase font-bold text-muted-foreground">Select Broker</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Weltrade", "Deriv", "Other"].map((b) => (
                        <button 
                          key={b}
                          onClick={() => updateForm({ broker: b, brokerId: "" })}
                          className={`py-4 rounded-xl border text-sm font-bold uppercase transition-all ${formData.broker === b ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-border bg-secondary/50 text-muted-foreground"}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {formData.broker && (
                      <>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                          <Label className="text-xs uppercase font-bold text-muted-foreground">
                            {formData.broker === "Deriv" ? "CR Number" : "TRC20 USDT Wallet Address"}
                          </Label>
                          <Input 
                            className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                            placeholder={formData.broker === "Deriv" ? "e.g. CR123456" : "Paste your TRC20 address"}
                            value={formData.brokerId}
                            onChange={(e) => updateForm({ brokerId: e.target.value })}
                          />
                        </motion.div>

                        {formData.broker === "Weltrade" && formData.type === "deposit" && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-muted-foreground">Binance Pay QR Code</Label>
                            <div className="relative h-32 w-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-all cursor-pointer bg-secondary/30">
                              <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                              <span className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Upload QR Code Screenshot</span>
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateForm({ binanceQrName: e.target.files?.[0]?.name || "" })} />
                              {formData.binanceQrName && <span className="mt-2 text-[10px] text-emerald-400 font-bold">{formData.binanceQrName}</span>}
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                  <Button 
                    disabled={!formData.broker || !formData.brokerId || (formData.broker === "Weltrade" && formData.type === "deposit" && !formData.binanceQrName)} 
                    onClick={nextStep} 
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    {formData.type === "deposit" ? "Choose Payment Gateway" : "Withdrawal Methods"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <button onClick={prevStep} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">
                        {formData.type === "deposit" ? "Deposit Details" : "Withdrawal Details"}
                      </h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Step 03 / 04</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className={`grid ${formData.type === "deposit" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-2"} gap-4`}>
                      {(formData.type === "deposit" 
                        ? [
                            { id: "EcoCash", icon: Smartphone, color: "text-green-500" },
                            { id: "InnBucks", icon: Wallet, color: "text-blue-500" },
                            { id: "USDT", icon: Bitcoin, color: "text-blue-500" },
                            { id: "Cash", icon: Briefcase, color: "text-emerald-500" },
                            { id: "FNB (EFT)", icon: Wallet, color: "text-indigo-500" }
                          ]
                        : [
                            { id: "Office Cash", icon: Briefcase, color: "text-blue-500" },
                            { id: "EcoCash", icon: Smartphone, color: "text-green-500" }
                          ]
                      ).map((g) => (
                        <button 
                          key={g.id}
                          onClick={() => updateForm({ gateway: g.id })}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${formData.gateway === g.id ? "border-blue-500 bg-blue-500/10" : "border-border bg-secondary/50 hover:border-blue-500/30"}`}
                        >
                          <div className="relative">
                            <g.icon className={`h-6 w-6 ${g.color}`} />
                            {formData.gateway === g.id && (
                              <motion.div layoutId="active" className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3B82F6]" />
                            )}
                          </div>
                          <span className={`text-[10px] font-bold uppercase ${formData.gateway === g.id ? "text-foreground" : "text-muted-foreground"}`}>{g.id}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs uppercase font-bold text-muted-foreground">Amount (USD)</Label>
                        {formData.gateway === "Cash" && (
                          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Min $1</span>
                        )}
                      </div>
                      <Input 
                        type="number"
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500 text-xl font-bold"
                        value={formData.amount}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                      />
                      
                      {formData.type === "deposit" && parseFloat(formData.amount) > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">Funds to be Received</span>
                            <span className="text-lg font-black text-blue-500">
                              ${netAmount.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[9px] text-muted-foreground leading-tight">
                            {brokerFee > 0 && `A 10% processing fee ($${brokerFee.toFixed(2)})`}
                            {brokerFee > 0 && gatewayFee > 0 && " and "}
                            {gatewayFee > 0 && 
                              (formData.gateway === "EcoCash" 
                                ? `an EcoCash fee of $${gatewayFee.toFixed(2)}` 
                                : formData.gateway === "InnBucks" 
                                  ? `an InnBucks fee of $${gatewayFee.toFixed(2)}` 
                                  : formData.gateway === "FNB (EFT)" 
                                    ? `an FNB (EFT) fee of $${gatewayFee.toFixed(2)}` 
                                    : "")}
                            {(brokerFee > 0 || gatewayFee > 0) ? ` will be deducted from your deposit to ${formData.broker}.` : "No additional fees for this transaction."}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {formData.gateway === "EcoCash" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <Label className="text-xs uppercase font-bold text-muted-foreground">{formData.gateway} Number</Label>
                        <Input 
                          className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                          placeholder="077..."
                          value={formData.gatewayNumber}
                          onChange={(e) => updateForm({ gatewayNumber: e.target.value })}
                        />
                      </motion.div>
                    )}

                    {formData.gateway === "USDT" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Scan to Pay (TRC20)</span>
                            <QrCode className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="h-40 w-full bg-white rounded-xl flex items-center justify-center">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=T...AccountLink" alt="USDT QR" className="h-32 w-32" />
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground truncate bg-muted p-3 rounded-lg">
                            T-Account-Link-Placeholder-Text-123...
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-muted-foreground">Your USDT Account</Label>
                            <Input 
                              className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                              placeholder="Address you sent from"
                              value={formData.usdtAccount}
                              onChange={(e) => updateForm({ usdtAccount: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-muted-foreground">Transaction Reference</Label>
                            <Input 
                              className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                              placeholder="Paste Hash/Ref Number"
                              value={formData.usdtRef}
                              onChange={(e) => updateForm({ usdtRef: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-muted-foreground">Proof of Payment</Label>
                            <div className="relative h-32 w-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-all cursor-pointer bg-secondary/30">
                              <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                              <span className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Upload Screenshot</span>
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateForm({ proofName: e.target.files?.[0]?.name || "" })} />
                              {formData.proofName && <span className="mt-2 text-[10px] text-emerald-400">{formData.proofName}</span>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.gateway || (formData.gateway === "Cash" && (parseFloat(formData.amount) < 1 || !formData.amount))}
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    Confirm & Process Transaction
                  </Button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                    <div className="h-24 w-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center relative">
                      <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-4">Transaction Initiated</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-10">
                    Thank you, <span className="text-foreground font-bold">{formData.name}</span>. Your <span className="text-blue-500 font-bold uppercase">{formData.type}</span> request via <span className="text-blue-500 font-bold">{formData.gateway}</span> is now being processed.
                  </p>
                  
                  <div className="bg-muted rounded-3xl p-6 border border-border text-left mb-10">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase text-muted-foreground">
                      <History className="h-3 w-3" /> Status Tracking
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-foreground">Validation successful</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-foreground">Broker: {formData.broker} ({formData.brokerId})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs text-blue-500 font-bold uppercase">Processing withdrawal/funding...</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-8 italic">
                    A confirmation will be sent to {formData.email}. Our team will get back to you within 2-4 hours.
                  </p>
                  
                  <Button onClick={() => setStep(1)} variant="outline" className="border-border text-muted-foreground hover:text-foreground px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest">
                    Make Another Transfer
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
