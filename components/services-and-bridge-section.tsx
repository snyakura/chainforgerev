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
    txid: "",
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const amountValue = parseFloat(formData.amount) || 0;
  const adminFee = amountValue * 0.10;
  let providerFee = formData.gateway === "EcoCash" ? 1.00 : formData.gateway === "InnBucks" ? 0.50 : 4.00;
  const netReceive = Math.max(0, amountValue - adminFee - providerFee);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => {
    if (step === 1) { setStep(0); setMode(null); }
    else setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    if (!formData.proofFile) {
      alert("Please upload your proof of payment image.");
      return;
    }

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
TXID: ${formData.txid || 'N/A'}
---
_Please attach my proof of payment image to this message._`;

      const whatsappUrl = `https://wa.me/263710554856?text=${encodeURIComponent(message)}`;
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
                    <Input placeholder="First Name" value={formData.firstName} onChange={(e) => updateForm({ firstName: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                    <Input placeholder="Surname" value={formData.surname} onChange={(e) => updateForm({ surname: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                    <Input placeholder="Email Address" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                    <Input placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} className="bg-secondary/30 h-14 border-border" />
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
                        <Input placeholder="Deriv CR Number" value={formData.brokerId} onChange={(e) => updateForm({ brokerId: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                        <Input placeholder="Full Name on Deriv" value={formData.derivAccountName} onChange={(e) => updateForm({ derivAccountName: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                      </div>
                    ) : (
                      <Input placeholder="USDT (TRC20) Wallet Address" value={formData.brokerId} onChange={(e) => updateForm({ brokerId: e.target.value })} className="bg-secondary/30 h-14 border-border" />
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
                    <Input type="number" value={formData.amount} onChange={(e) => updateForm({ amount: e.target.value })} className="bg-secondary/30 py-8 text-4xl font-black text-blue-500 border-none focus:ring-0" />
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-secondary/20 border border-border space-y-4 text-xs font-bold uppercase tracking-widest">
                    <div className="flex justify-between text-muted-foreground"><span>Service Fee (10%)</span><span className="text-foreground">-${adminFee.toFixed(2)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Gateway Fee</span><span className="text-foreground">-${providerFee.toFixed(2)}</span></div>
                    <div className="pt-6 border-t border-border flex justify-between items-center">
                        <span className="text-foreground">Net Total Value</span>
                        <span className="text-4xl font-black text-blue-500">${netReceive.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase ml-1">{formData.gateway} Number</Label>
                      <Input placeholder="07XXXXXXXX" value={formData.gatewayNumber} onChange={(e) => updateForm({ gatewayNumber: e.target.value })} className="bg-secondary/30 h-14 border-border" />
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
                      <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase ml-1">Upload Receipt (POP)</Label>
                          <Input type="file" onChange={(e) => updateForm({ proofFile: e.target.files?.[0] || null })} className="bg-secondary/30 h-16 pt-6" />
                          <Input placeholder="Transaction Reference (TXID)" value={formData.txid} onChange={(e) => updateForm({ txid: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                      </div>
                      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-blue-600 py-8 font-black uppercase rounded-2xl tracking-widest">{isSubmitting ? "Uploading..." : "Submit Proof"}</Button>
                    </div>
                  ) : (
                    formData.broker === "Deriv" ? (
                      <div className="space-y-8">
                          <div className="p-8 rounded-[2.5rem] bg-green-500/5 border border-green-500/20 space-y-4">
                              <h4 className="text-xl font-black uppercase text-green-500">The Forex Mafia Withdrawal Process</h4>
                              <p className="text-[11px] font-bold text-muted-foreground uppercase leading-relaxed">
                                  1. Initiate Agent Transfer to "The Forex Mafia" on Deriv.<br/>
                                  2. Capture Screenshot of successful transaction.<br/>
                                  3. Upload screenshot and confirm your CR number below.
                              </p>
                          </div>
                          <div className="space-y-4">
                              <Input value={formData.brokerId} readOnly className="bg-secondary/30 border-border h-14 opacity-50" />
                              <div className="space-y-2">
                                  <Label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Upload Proof of Agent Transfer</Label>
                                  <Input type="file" onChange={(e) => updateForm({ proofFile: e.target.files?.[0] || null })} className="bg-secondary/30 h-16 pt-6" />
                              </div>
                          </div>
                          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-green-600 py-8 font-black uppercase tracking-widest">{isSubmitting ? "Verifying..." : "Confirm Withdrawal"}</Button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="rounded-[2.5rem] border border-red-500/50 bg-red-500/5 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4 text-red-500">
                                <ShieldAlert className="h-6 w-6" />
                                <h4 className="text-lg font-black uppercase">Mandatory Security Protocol</h4>
                            </div>
                            <p className="text-xs font-bold text-red-200/80 mb-6 uppercase tracking-wider">
                                Direct transfers from broker wallets are strictly prohibited to prevent AML flags.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-center bg-background/40 p-4 rounded-2xl border border-border">
                                    <span className="text-xl font-black text-red-500/40">01</span>
                                    <h5 className="text-[11px] font-black uppercase text-foreground">Withdraw funds from broker to your private wallet.</h5>
                                </div>
                                <div className="flex gap-4 items-center bg-background/40 p-4 rounded-2xl border border-border">
                                    <span className="text-xl font-black text-red-500/40">02</span>
                                    <h5 className="text-[11px] font-black uppercase text-foreground">Send USDT (TRC20) from your wallet to our address.</h5>
                                </div>
                                <div className="flex gap-4 items-center bg-background/40 p-4 rounded-2xl border border-border">
                                    <span className="text-xl font-black text-red-500/40">03</span>
                                    <h5 className="text-[11px] font-black uppercase text-foreground">Submit your private transaction hash below for verification.</h5>
                                </div>
                            </div>
                        </div>

                          <div className="bg-secondary/20 p-8 rounded-[2.5rem] border border-border flex flex-col items-center">
                              <img src="/QR.png" alt="TRC20 QR Code" className="h-40 w-40 mb-6 object-contain rounded-xl" />
                              <div className="flex items-center gap-3 bg-background/60 px-4 py-3 rounded-xl border border-border mb-4">
                                  <code className="text-[10px] text-blue-400 font-mono">TPvTAj6W8AZQzsnu27TsPjUMR7tNJ9CHgP</code>
                                  <button onClick={() => {navigator.clipboard.writeText("TPvTAj6W8AZQzsnu27TsPjUMR7tNJ9CHgP"); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} className="text-blue-500">
                                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                  </button>
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Binance ID: 848180225 • Parexsibanda@icloud.com</p>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase">MARC ANTHONY(THEFOREXMAFIA) (Paradise Sibanda)</p>
                              </div>
                          </div>
                          <div className="space-y-4">
                              <Input type="file" onChange={(e) => updateForm({ proofFile: e.target.files?.[0] || null })} className="bg-secondary/30 h-16 pt-6" />
                              <Input placeholder="USDT Transaction Hash (TXID)" value={formData.txid} onChange={(e) => updateForm({ txid: e.target.value })} className="bg-secondary/30 h-14 border-border" />
                          </div>
                          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-blue-600 py-8 font-black uppercase tracking-widest">Finalize Transaction</Button>
                      </div>
                    )
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