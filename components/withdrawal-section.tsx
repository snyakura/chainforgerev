"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Wallet, Landmark, ArrowLeft, 
  CheckCircle2, Clock, ShieldCheck, FileUp,
  TrendingUp, QrCode, ShieldAlert, Copy, Check,
  ExternalLink, BellRing, HelpCircle, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChainforgeBridge() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"deposit" | "withdrawal" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    bankName: "",
    bankAccount: "",
    bankAccountName: "",
    bankBranch: "",
    amount: "10",
    proofFile: null as File | null,
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    const keys = Object.keys(updates);
    setErrors(prev => {
      const next = { ...prev };
      keys.forEach(k => delete next[k]);
      return next;
    });
  };

  const amountValue = parseFloat(formData.amount) || 0;
  const adminFee = amountValue * 0.10;
  const netResult = Math.max(0, amountValue - adminFee);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const phoneRegex = /^(07\d{8}|\+2637\d{8})$/;
    const crRegex = /^CR\d+$/i;

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.surname) newErrors.surname = "Required";
      if (!formData.email || !formData.email.includes("@")) newErrors.email = "Valid email required";
      if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "Invalid format";
      
      if (formData.broker === "Deriv") {
        if (!formData.brokerId || !crRegex.test(formData.brokerId)) newErrors.brokerId = "Must start with CR";
      } else {
        if (!formData.brokerId) newErrors.brokerId = "ID is required";
      }
    }

    if (step === 2) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = "Invalid amount";
      if (mode === "withdrawal") {
        if (formData.gateway !== "FNB (EFT)") {
          if (!formData.gatewayNumber || !phoneRegex.test(formData.gatewayNumber)) {
            newErrors.gatewayNumber = "Invalid format";
          }
        }
      }
    }

    if (step === 3 && mode === "withdrawal") {
      if (!formData.bankName) newErrors.bankName = "Bank Name required";
      if (!formData.bankAccountName) newErrors.bankAccountName = "Account Name required";
      if (!formData.bankAccount) newErrors.bankAccount = "Account Number required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step === 1) setMode(null);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (mode === "withdrawal" && !validateStep()) {
        setIsSubmitting(false);
        return;
      }

      const message = `*CHAINFORGE BRIDGE TRANSACTION*
Mode: ${mode?.toUpperCase()}
---
Client: ${formData.firstName} ${formData.surname}
Email: ${formData.email}
Phone: ${formData.phone}
---
Broker: ${formData.broker} (${formData.brokerId})
Gateway: ${formData.gateway}
${mode === 'withdrawal' ? `Bank: ${formData.bankName}
Acc Name: ${formData.bankAccountName}
Acc Number: ${formData.bankAccount}` : `Gateway Number: ${formData.gatewayNumber}`}
Amount: $${formData.amount}
Net Total: $${netResult.toFixed(2)}
---
_Please attach my proof of transfer image to this message._`;

      const whatsappUrl = `https://wa.me/263784293089?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      nextStep();
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 bg-background text-foreground font-sans">
      <div className="max-w-3xl mx-auto px-4">
        
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Chainforge <span className="text-blue-500">Bridge</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => { setMode("deposit"); setStep(1); }} className="group p-10 rounded-[2.5rem] border border-white/5 bg-white/5 hover:border-blue-500/50 transition-all">
                <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-black uppercase">Deposit</h3>
              </button>
              <button onClick={() => { setMode("withdrawal"); setStep(1); }} className="group p-10 rounded-[2.5rem] border border-white/5 bg-white/5 hover:border-green-500/50 transition-all">
                <Wallet className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-black uppercase">Withdraw</h3>
              </button>
            </div>
          </motion.div>
        )}

        {step > 0 && (
          <div className="bg-card/80 border border-border backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <button onClick={prevStep} className="h-10 w-10 flex items-center justify-center bg-secondary/50 rounded-full hover:bg-secondary/80 transition-colors"><ArrowLeft className="h-5 w-5" /></button>
              <div className="text-right">
                <span className={`block text-[10px] font-black uppercase tracking-[0.2em] ${mode === "deposit" ? "text-blue-500" : "text-green-500"}`}>{mode} Mode</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase">Step 0{step} of 04</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Identification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Input placeholder="First Name" value={formData.firstName} onChange={(e) => updateForm({ firstName: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.firstName ? "border-red-500" : ""}`} />
                      {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="Surname" value={formData.surname} onChange={(e) => updateForm({ surname: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.surname ? "border-red-500" : ""}`} />
                      {errors.surname && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.surname}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="Email" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.email ? "border-red-500" : ""}`} />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.phone ? "border-red-500" : ""}`} />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground">Select Broker</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Weltrade", "Deriv", "Other"].map((b) => (
                        <button key={b} onClick={() => updateForm({ broker: b })} className={`py-4 rounded-xl border text-[10px] font-black uppercase transition-all ${formData.broker === b ? "border-blue-500 bg-blue-500/10 text-blue-500" : "border-border bg-secondary/30"}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  {formData.broker === "Deriv" ? (
                    <div className="space-y-1">
                      <Input placeholder="Deriv CR Number" value={formData.brokerId} onChange={(e) => updateForm({ brokerId: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.brokerId ? "border-red-500" : ""}`} />
                      {errors.brokerId && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.brokerId}</p>}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Input placeholder="Broker Account ID / Number" value={formData.brokerId} onChange={(e) => updateForm({ brokerId: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.brokerId ? "border-red-500" : ""}`} />
                      {errors.brokerId && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.brokerId}</p>}
                    </div>
                  )}
                  <Button onClick={nextStep} className="w-full bg-blue-600 h-16 rounded-2xl font-black uppercase">Continue</Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Financial Details</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["EcoCash", "InnBucks", "FNB (EFT)"].map((g) => (
                      <button key={g} onClick={() => updateForm({ gateway: g as any })} className={`p-6 rounded-2xl border-2 transition-all ${formData.gateway === g ? "border-blue-500 bg-blue-500/10" : "border-border bg-secondary/30"}`}>
                        <span className="text-[10px] font-black uppercase">{g}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Input type="number" value={formData.amount} placeholder="Amount (USD)" onChange={(e) => updateForm({ amount: e.target.value })} className={`bg-secondary/30 h-20 text-4xl font-black text-blue-500 border-none focus:ring-0 ${errors.amount ? "ring-2 ring-red-500" : ""}`} />
                      {errors.amount && <p className="text-[10px] text-red-500 font-bold uppercase px-1">{errors.amount}</p>}
                    </div>
                    {mode === "withdrawal" && formData.gateway !== "FNB (EFT)" && (
                      <div className="space-y-1">
                        <Input placeholder={`${formData.gateway} Number`} value={formData.gatewayNumber} onChange={(e) => updateForm({ gatewayNumber: e.target.value })} className={`bg-secondary/30 h-16 border-border ${errors.gatewayNumber ? "border-red-500" : ""}`} />
                        {errors.gatewayNumber && <p className="text-[10px] text-red-500 px-1">{errors.gatewayNumber}</p>}
                      </div>
                    )}
                  </div>
                  <Button onClick={nextStep} className="w-full bg-blue-600 h-16 rounded-2xl font-black uppercase">Proceed</Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Verification</h3>

                  {mode === "deposit" && formData.gateway === "FNB (EFT)" ? (
                    /* FNB DEPOSIT DETAILS */
                    <div className="space-y-6">
                      <div className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/30 space-y-6">
                        <h4 className="text-xl font-black uppercase text-blue-500 underline underline-offset-8 decoration-blue-500/30">Deposit Instructions</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
                          Please follow these steps to fund your account. Ensure the banking details are entered correctly to avoid any transaction errors.
                        </p>
                        <div className="space-y-5 text-[11px] font-medium leading-relaxed uppercase">
                          <div className="space-y-1">
                            <p className="text-blue-400 font-black">1. Log in to your Banking App</p>
                            <p className="pl-4 opacity-80 italic">Open your FNB App or online banking portal.</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-blue-400 font-black">2. Make a Payment</p>
                            <p className="pl-4 opacity-80">Transfer your desired deposit amount to the following account:</p>
                            <div className="ml-4 p-4 bg-background/40 rounded-2xl border border-border space-y-2 font-mono text-[10px] tracking-tight">
                              <div className="flex justify-between border-b border-border pb-1"><span>Account Name:</span> <span className="text-foreground font-black text-right">MAZ FX (PVT) LTD</span></div>
                              <div className="flex justify-between border-b border-border pb-1"><span>Account Number:</span> <span className="text-foreground font-black text-xs text-right">63051409861</span></div>
                              <div className="flex justify-between"><span>Account Type:</span> <span className="text-foreground font-black text-right">FNB Business Account</span></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-blue-400 font-black">3. Use a Reference</p>
                            <p className="pl-4 opacity-80">Enter your Full Name or Trading ID as the payment reference.</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-blue-400 font-black">4. Capture Proof & Notify</p>
                            <p className="pl-4 opacity-80">Once complete, upload your PDF receipt or screenshot once redirected to WhatsApp to notify our team.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : mode === "withdrawal" ? (
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
                    </div>
                  ) : (
                    /* DEFAULT VERIFICATION FLOW (Crypto/Mobile Money) */
                    <div className="text-center p-8 bg-secondary/30 rounded-[2rem]">
                      <p className="text-xs font-black uppercase text-muted-foreground">Standard verification active for {formData.gateway}</p>
                    </div>
                  )}
                  <div className="p-6 border-2 border-red-500 bg-red-500/10 rounded-[2rem] animate-pulse">
                    <p className="text-sm font-black text-red-500 text-center uppercase tracking-widest">
                      IMPORTANT: Don't forget to attach your proof of payment image once redirected to WhatsApp!
                    </p>
                  </div>
                  <Button onClick={handleSubmit} className="w-full bg-blue-600 h-16 rounded-2xl font-black uppercase">Submit Verification</Button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-10">
                  <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Under Review</h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Our team is verifying your {formData.gateway} transfer. Expect funds in 15-45 minutes.</p>
                  <Button onClick={() => window.location.reload()} className="h-16 px-12 rounded-2xl font-black uppercase bg-white text-black">Finish</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}