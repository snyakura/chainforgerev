"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Wallet, Landmark, ArrowLeft, 
  CheckCircle2, Clock, ShieldCheck, FileUp,
  TrendingUp, QrCode, ShieldAlert, Copy, Check,
  ExternalLink, BellRing, HelpCircle, Globe,
  MousePointerClick, Layers, Bitcoin, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ServicesAndBridgeSection() {
  const [step, setStep] = useState(0); 
  const [mode, setMode] = useState<"deposit" | "withdrawal" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    broker: "Weltrade",
    brokerId: "", 
    derivAccountName: "",
    gateway: "EcoCash",
    gatewayNumber: "",
    amount: "10",
    proofFile: null as File | null,
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear error for the field being typed in
    const keys = Object.keys(updates);
    setErrors(prev => {
      const next = { ...prev };
      keys.forEach(k => delete next[k]);
      return next;
    });
  };

  const amountValue = parseFloat(formData.amount) || 0;
  const adminFee = amountValue * 0.10;
  const netReceive = Math.max(0, amountValue - adminFee);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const phoneRegex = /^(07[1378]\d{7}|\+2637[1378]\d{7})$/;
    const crRegex = /^CR\d+$/i;

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.surname) newErrors.surname = "Surname is required";
      if (!formData.email || !formData.email.includes("@")) newErrors.email = "Valid email is required";
      if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "Use format: 07XXXXXXXX";
      
      if (formData.broker === "Deriv") {
        if (!formData.brokerId || !crRegex.test(formData.brokerId)) newErrors.brokerId = "Must start with 'CR'";
      } else {
        if (!formData.brokerId) newErrors.brokerId = "Broker ID is required";
      }
    }

    if (step === 2) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = "Enter a valid amount";
      if (!formData.gatewayNumber || !phoneRegex.test(formData.gatewayNumber)) newErrors.gatewayNumber = "Invalid gateway number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const prevStep = () => {
    if (step === 1) { setStep(0); setMode(null); }
    else setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const message = `*CHAINFORGE BRIDGE TRANSACTION*
Mode: ${mode?.toUpperCase()}
---
Client: ${formData.firstName} ${formData.surname}
Email: ${formData.email}
Phone: ${formData.phone}
---
Broker: ${formData.broker} (${formData.brokerId})
Gateway: ${formData.gateway} (${formData.gatewayNumber})
Amount: $${formData.amount}
Net Receive: $${netReceive.toFixed(2)}
---
_Please attach my proof of payment image to this message._`;

      const whatsappUrl = `https://wa.me/263784293089?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      nextStep();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 bg-background text-foreground isolate font-sans">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* STEP 0: SELECTION */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-12">
            <div className="space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Chainforge <span className="text-blue-500">Bridge</span></h2>
                <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.3em]">Institutional Grade Zimbabwean Liquidity</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => { setMode("deposit"); setStep(1); }} className="group p-10 rounded-[2.5rem] border border-border bg-secondary/30 hover:border-blue-500/50 transition-all hover:bg-blue-500/5">
                <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black uppercase tracking-tight">Deposit Funds</h3>
                <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">ZWL/USD to Global Broker</p>
              </button>
              <button onClick={() => { setMode("withdrawal"); setStep(1); }} className="group p-10 rounded-[2.5rem] border border-border bg-secondary/30 hover:border-green-500/50 transition-all hover:bg-green-500/5">
                <Wallet className="h-12 w-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black uppercase tracking-tight">Withdraw Profit</h3>
                <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">Broker to Local Gateway</p>
              </button>
            </div>
          </motion.div>
        )}

        {step > 0 && (
          <div className="bg-card/80 border border-border rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
             <div className="flex justify-between items-center mb-10">
                <button onClick={prevStep} className="h-10 w-10 flex items-center justify-center bg-secondary/50 rounded-full hover:bg-secondary/80 transition-colors"><ArrowLeft className="h-5 w-5" /></button>
                <div className="text-right">
                    <span className={`block text-[10px] font-black uppercase tracking-[0.3em] ${mode === 'deposit' ? 'text-blue-500' : 'text-green-500'}`}>{mode} Mode</span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Step 0{step} of 04</span>
                </div>
             </div>

            <AnimatePresence mode="wait">
              {/* STEP 1: CLIENT DETAILS */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Client Identification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Input placeholder="First Name" value={formData.firstName} onChange={(e) => updateForm({ firstName: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.firstName ? "border-red-500" : ""}`} />
                      {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="Surname" value={formData.surname} onChange={(e) => updateForm({ surname: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.surname ? "border-red-500" : ""}`} />
                      {errors.surname && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.surname}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="Email Address" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.email ? "border-red-500" : ""}`} />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.phone ? "border-red-500" : ""}`} />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Target Trading Platform</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Weltrade", "Deriv", "Other"].map(b => (
                        <button key={b} onClick={() => updateForm({ broker: b })} className={`py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all ${formData.broker === b ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-border bg-secondary/30'}`}>{b}</button>
                      ))}
                    </div>
                    {formData.broker === "Deriv" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-1">
                          <Input placeholder="Deriv CR Number" value={formData.brokerId} onChange={(e) => updateForm({ brokerId: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.brokerId ? "border-red-500" : ""}`} />
                          {errors.brokerId && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.brokerId}</p>}
                        </div>
                        <Input placeholder="Full Name on Deriv" value={formData.derivAccountName} onChange={(e) => updateForm({ derivAccountName: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Input placeholder="Broker Account ID / Number" value={formData.brokerId} onChange={(e) => updateForm({ brokerId: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.brokerId ? "border-red-500" : ""}`} />
                        {errors.brokerId && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.brokerId}</p>}
                      </div>
                    )}
                  </div>
                  <Button onClick={nextStep} className="w-full bg-blue-600 py-8 rounded-2xl font-black uppercase tracking-widest">Next: Payment Details</Button>
                </motion.div>
              )}

              {/* STEP 2: GATEWAY & CALCULATION */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Financial Breakdown</h3>
                    {mode === "withdrawal" && (
                        <p className="text-[10px] font-black uppercase text-muted-foreground pl-5 tracking-widest">How would you like to receive your funds?</p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[{ id: "EcoCash", icon: Smartphone }, { id: "InnBucks", icon: Wallet }, { id: "FNB (EFT)", icon: Landmark }].map(m => (
                      <button key={m.id} onClick={() => updateForm({ gateway: m.id })} className={`p-6 rounded-[2rem] border flex flex-col items-center gap-3 transition-all ${formData.gateway === m.id ? 'border-blue-500 bg-blue-500/10' : 'border-border bg-secondary/30'}`}>
                        <m.icon className="h-6 w-6" />
                        <span className="text-[10px] font-black uppercase">{m.id}</span>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">Transaction Amount (USD)</Label>
                    <Input type="number" value={formData.amount} onChange={(e) => updateForm({ amount: e.target.value })} className={`bg-secondary/30 py-8 text-4xl font-black text-blue-500 border-none focus:ring-0 ${errors.amount ? "ring-2 ring-red-500" : ""}`} />
                    {errors.amount && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.amount}</p>}
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-secondary/20 border border-border space-y-4 text-xs font-bold uppercase tracking-widest">
                    <div className="flex justify-between text-muted-foreground"><span>Service Fee (10%)</span><span className="text-foreground">-${adminFee.toFixed(2)}</span></div>
                    <div className="pt-6 border-t border-border flex justify-between items-center">
                        <span className="text-foreground">Net Total Value</span>
                        <span className="text-4xl font-black text-blue-500">${netReceive.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase ml-1">{formData.gateway} Number</Label>
                      <Input placeholder="07XXXXXXXX" value={formData.gatewayNumber} onChange={(e) => updateForm({ gatewayNumber: e.target.value })} className={`bg-secondary/30 h-14 border-border ${errors.gatewayNumber ? "border-red-500" : ""}`} />
                      {errors.gatewayNumber && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.gatewayNumber}</p>}
                  </div>
                  <Button onClick={nextStep} className="w-full bg-blue-600 py-8 rounded-2xl font-black uppercase tracking-widest">Continue to Verification</Button>
                </motion.div>
              )}

              {/* STEP 3: VERIFICATION */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Verification Protocol</h3>
                  
                  {mode === "deposit" ? (
                    <div className="space-y-6">
                      {formData.gateway === "FNB (EFT)" ? (
                        <div className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/30 space-y-6">
                          <h4 className="text-xl font-black uppercase text-blue-500 underline underline-offset-8 decoration-blue-500/30">Deposit Instructions</h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
                            Please follow these steps to fund your account. Ensure the banking details are entered correctly to avoid any transaction errors.
                          </p>
                          <div className="space-y-5 text-xs font-medium leading-relaxed">
                            <div className="space-y-1">
                              <p className="text-blue-400 font-black uppercase">1. Log in to your Banking App</p>
                              <p className="pl-4 opacity-80 italic">Open your FNB App or online banking portal.</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-blue-400 font-black uppercase">2. Make a Payment</p>
                              <p className="pl-4 opacity-80">Transfer your desired deposit amount to the following account:</p>
                              <div className="ml-4 p-4 bg-background/40 rounded-2xl border border-border space-y-2 font-mono text-[10px] tracking-tight">
                                <div className="flex justify-between border-b border-border pb-1"><span>Account Name:</span> <span className="text-foreground font-black text-right">MAZ FX (PVT) LTD</span></div>
                                <div className="flex justify-between border-b border-border pb-1"><span>Account Number:</span> <span className="text-foreground font-black text-xs text-right">63051409861</span></div>
                                <div className="flex justify-between"><span>Account Type:</span> <span className="text-foreground font-black text-right">FNB Business Account</span></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-blue-400 font-black uppercase">3. Use a Reference</p>
                              <p className="pl-4 opacity-80">Enter your <span className="text-foreground font-black underline">Full Name</span> or <span className="text-foreground font-black underline">Trading ID</span> as the payment reference.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-blue-400 font-black uppercase">4. Capture Proof</p>
                              <p className="pl-4 opacity-80">Once complete, take a screenshot of the successful transaction or save the PDF receipt.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-blue-400 font-black uppercase">5. Verification</p>
                              <p className="pl-4 opacity-80">Upload your Proof of Payment (POP) once redirected to WhatsApp to notify our finance team.</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/30 space-y-6">
                          <h4 className="text-xl font-black uppercase text-blue-500">Payment Instructions</h4>
                          <div className="space-y-5 text-xs font-medium">
                              <p>1. SEND FUNDS: Send to <span className="text-blue-400 font-black">078 429 3089</span>.</p>
                              <div className="pl-6 py-3 bg-background/40 rounded-xl space-y-1 opacity-80 border-l-2 border-blue-500">
                                  <p>• EcoCash: *151# Send Money 078 429 3089</p>
                                  <p>• InnBucks: *227# Send Money 078 429 3089</p>
                              </div>
                              <p>2. RECIPIENT: Confirm name is MARC A ZHOU.</p>
                              <p>3. RECEIPT: Save your transaction screenshot.</p>
                          </div>
                        </div>
                      )}
                      <div className="p-6 border-2 border-h your proof of payment image once redirected to WhatsApp!
                        </p>
                      </div>
                      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-blue-600 py-8 font-black uppercase rounded-2xl tracking-widest">{isSubmitting ? "Uploading..." : "Submit Proof"}</Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                        <div className="p-8 rounded-[2.5rem] bg-green-600/10 border border-green-500/30 space-y-6">
                            <h4 className="text-xl font-black uppercase text-green-500 underline underline-offset-8 decoration-green-500/30">Withdrawal Instructions</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
                                To receive your funds from the academy, please follow this process:
                            </p>
                            <div className="space-y-5 text-xs font-medium leading-relaxed">
                                <div className="space-y-1">
                                    <p className="text-green-400 font-black uppercase">1. Request Withdrawal</p>
                                    <p className="pl-4 opacity-80 italic">Initiate the withdrawal amount through your member dashboard.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-green-400 font-black uppercase">2. Provide Destination Details</p>
                                    <p className="pl-4 opacity-80">Ensure your banking details (Account Name, Number, and Bank) are correctly saved in your profile.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-green-400 font-black uppercase">3. Wait for Processing</p>
                                    <p className="pl-4 opacity-80">Our team will transfer the funds from the MAZ FX (PVT) LTD business account (63051409861) to your account.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-green-400 font-black uppercase">4. Confirm Receipt</p>
                                    <p className="pl-4 opacity-80">Once the status is marked as "Complete," check your banking app for the reflected balance.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-green-400 font-black uppercase">5. Record Keeping</p>
                                    <p className="pl-4 opacity-80">Take a screenshot of the incoming transaction for your records and to verify the payout was successful.</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <Input placeholder="Bank Name" value={formData.bankName} onChange={(e) => updateForm({ bankName: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.bankName ? "border-red-500" : ""}`} />
                                {errors.bankName && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.bankName}</p>}
                            </div>
                            <div className="space-y-1">
                                <Input placeholder="Account Name" value={formData.bankAccountName} onChange={(e) => updateForm({ bankAccountName: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.bankAccountName ? "border-red-500" : ""}`} />
                                {errors.bankAccountName && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.bankAccountName}</p>}
                            </div>
                            <div className="space-y-1">
                                <Input placeholder="Account Number" value={formData.bankAccount} onChange={(e) => updateForm({ bankAccount: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.bankAccount ? "border-red-500" : ""}`} />
                                {errors.bankAccount && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.bankAccount}</p>}
                            </div>
                        </div>
                        <div className="p-6 border-2 border-green-500 bg-green-500/10 rounded-[2rem] animate-pulse">
                            <p className="text-sm font-black text-green-500 text-center uppercase tracking-widest">
                                IMPORTANT: Don't forget to attach your proof of transfer image once redirected to WhatsApp!
                            </p>
                        </div>
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-green-600 py-8 font-black uppercase rounded-2xl tracking-widest">{isSubmitting ? "Redirecting..." : "Confirm Withdrawal"}</Button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 4: SUCCESS */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-10">
                  <div className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-14 w-14 text-green-500" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-4xl font-black uppercase tracking-tighter">Request Queued</h3>
                        <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em]">Reference: CF-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="p-5 rounded-2xl bg-secondary/20 border border-border space-y-3">
                            <div className="flex items-center gap-2 text-foreground font-black uppercase text-[10px]">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span>Verification Timeline</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground font-bold uppercase leading-relaxed">
                                Manual verification is active. Average processing time is 15 to 45 minutes during business hours.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-secondary/20 border border-border space-y-3">
                            <div className="flex items-center gap-2 text-foreground font-black uppercase text-[10px]">
                                <BellRing className="h-4 w-4 text-blue-500" />
                                <span>Notification</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground font-bold uppercase leading-relaxed">
                                You will receive a confirmation message via WhatsApp or Email once the funds have been released.
                            </p>
                        </div>
                    </div>
                  </div>

                  <Button onClick={() => window.location.reload()} className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200">Return to Dashboard</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}