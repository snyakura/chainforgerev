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
    bankBranch: "",
    amount: "10",
    proofFile: null as File | null,
    txid: "",
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const amountValue = parseFloat(formData.amount) || 0;
  const adminFee = amountValue * 0.10;
  let providerFee = formData.gateway === "EcoCash" ? 1.00 : formData.gateway === "InnBucks" ? 0.50 : 4.00;
  const netResult = Math.max(0, amountValue - adminFee - providerFee);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => {
    if (step === 1) setMode(null);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      nextStep();
    }, 2000);
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
                    <Input placeholder="First Name" onChange={(e) => updateForm({ firstName: e.target.value })} className="bg-secondary/30 h-16 border-border" />
                    <Input placeholder="Surname" onChange={(e) => updateForm({ surname: e.target.value })} className="bg-secondary/30 h-16 border-border" />
                    <Input placeholder="Email" onChange={(e) => updateForm({ email: e.target.value })} className="bg-secondary/30 h-16 border-border" />
                    <Input placeholder="WhatsApp Number" onChange={(e) => updateForm({ phone: e.target.value })} className="bg-secondary/30 h-16 border-border" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground">Select Broker</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Weltrade", "Deriv", "Other"].map((b) => (
                        <button key={b} onClick={() => updateForm({ broker: b })} className={`py-4 rounded-xl border text-[10px] font-black uppercase transition-all ${formData.broker === b ? "border-blue-500 bg-blue-500/10 text-blue-500" : "border-border bg-secondary/30"}`}>{b}</button>
                      ))}
                    </div>
                  </div>
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
                    <Input type="number" placeholder="Amount (USD)" onChange={(e) => updateForm({ amount: e.target.value })} className="bg-secondary/30 h-20 text-4xl font-black text-blue-500 border-none focus:ring-0" />
                    
                    {/* WITHDRAWAL BANK DETAILS INPUT */}
                    {mode === "withdrawal" && formData.gateway === "FNB (EFT)" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in">
                        <Input placeholder="Bank Name" onChange={(e) => updateForm({ bankName: e.target.value })} className="bg-secondary/30 h-16" />
                        <Input placeholder="Account Number" onChange={(e) => updateForm({ bankAccount: e.target.value })} className="bg-secondary/30 h-16" />
                        <Input placeholder="Branch Code" onChange={(e) => updateForm({ bankBranch: e.target.value })} className="bg-secondary/30 h-16" />
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
                      <div className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/30 space-y-4 font-bold uppercase text-[11px]">
                        <h4 className="text-xl font-black text-blue-500">FNB Bank Details</h4>
                        <div className="space-y-2 text-foreground">
                          <p>Account Name: Chainforge Bridge</p>
                          <p>Bank: First National Bank (FNB)</p>
                          <p>Account Number: 62900112233</p>
                          <p>Branch Code: 250655</p>
                          <p className="text-blue-400 mt-4">Reference: CF-{formData.surname.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className={`relative h-40 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center transition-all ${formData.proofFile ? "border-green-500 bg-green-500/5" : "border-border bg-secondary/30"}`}>
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateForm({ proofFile: e.target.files?.[0] || null })} />
                        <ImageIcon className="h-10 w-10 text-blue-500 mb-2" />
                        <p className="text-xs font-black uppercase">{formData.proofFile ? formData.proofFile.name : "Upload Bank Confirmation Screenshot"}</p>
                      </div>
                    </div>
                  ) : (
                    /* DEFAULT VERIFICATION FLOW (Crypto/Mobile Money) */
                    <div className="text-center p-8 bg-secondary/30 rounded-[2rem]">
                      <p className="text-xs font-black uppercase text-muted-foreground">Standard verification active for {formData.gateway}</p>
                      <div className="mt-6 border-2 border-dashed border-border h-32 rounded-xl flex items-center justify-center">
                        <input type="file" className="absolute opacity-0" onChange={(e) => updateForm({ proofFile: e.target.files?.[0] || null })} />
                        <span className="text-[10px] font-black uppercase">Upload POP Image</span>
                      </div>
                    </div>
                  )}
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