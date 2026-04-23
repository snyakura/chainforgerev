"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  Wallet, 
  Smartphone, 
  Bitcoin, 
  CheckCircle2, 
  Upload,
  Info,
  Copy,
  Check
} from "lucide-react"; // Assuming Upload icon is sufficient for general file upload
import { FileUp } from "lucide-react"; // Using FileUp for document specific upload
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TransactionType = "deposit" | "withdraw";

interface PaymentMethod {
  id: string;
  name: string;
  instructions: string;
  details: string;
  icon: React.ElementType;
  color: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "ecocash", name: "EcoCash", instructions: "Send money to 077XXXXXXX (ChainForge Admin)", details: "Merchant/Agent: 123456", icon: Smartphone, color: "text-emerald-500" },
  { id: "innbucks", name: "InnBucks", instructions: "Send to 078XXXXXXX", details: "Account: ChainForge Forex", icon: Wallet, color: "text-blue-500" },
  { id: "usdt", name: "USDT (TRC20)", instructions: "Send to TRC20 Address below", details: "Address: TXXXX...", icon: Bitcoin, color: "text-amber-500" },
];

const PaymentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TransactionType>("deposit");
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [proof, setProof] = useState<File | null>(null);
  const [refId, setRefId] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [passportDocument, setPassportDocument] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const resetFlow = () => {
    setStep(1);
    setSelectedMethod(null);
    setProof(null);
    setRefId("");
    setIdDocument(null);
    setPassportDocument(null);
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-xl w-full">
      {/* Segmented Control Tabs */}
      <div className="flex p-1 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/5 mb-8">
        {(['deposit', 'withdraw'] as TransactionType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); resetFlow(); }}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === tab 
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Glass Card Container */}
      <div className="relative bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Animated Background Accent */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Step Progress Indicator */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                step >= i ? "border-blue-500 bg-blue-500 text-white" : "border-zinc-800 text-zinc-600"
              }`}>
                {step > i ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i}</span>}
              </div>
              {i < 4 && (
                <div className={`flex-1 h-0.5 mx-2 transition-colors ${step > i ? "bg-blue-500" : "bg-zinc-800"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: AMOUNT */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Enter {activeTab} Amount</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-blue-500">$</span>
                    <Input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                      placeholder="0.00"
                      className="pl-10 bg-zinc-950/50 border-white/5 h-16 text-2xl font-bold rounded-2xl focus:border-blue-500 transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight px-1">Min: $10.00 | Max: $5,000.00</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Identity Verification (ID or Passport)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <input 
                        type="file" 
                        onChange={(e) => setIdDocument(e.target.files ? e.target.files[0] : null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="h-20 w-full border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center bg-zinc-950/30 group-hover:border-blue-500/50 transition-all">
                        {idDocument ? (
                          <span className="text-[10px] text-emerald-400 font-bold px-2 text-center">{idDocument.name.substring(0, 15)}...</span>
                        ) : (
                          <><FileUp className="h-4 w-4 text-zinc-600 mb-1" /><span className="text-[9px] font-bold text-zinc-600 uppercase">National ID</span></>
                        )}
                      </div>
                    </div>

                    <div className="relative group">
                      <input 
                        type="file" 
                        onChange={(e) => setPassportDocument(e.target.files ? e.target.files[0] : null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="h-20 w-full border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center bg-zinc-950/30 group-hover:border-blue-500/50 transition-all">
                        {passportDocument ? (
                          <span className="text-[10px] text-emerald-400 font-bold px-2 text-center">{passportDocument.name.substring(0, 15)}...</span>
                        ) : (
                          <><FileUp className="h-4 w-4 text-zinc-600 mb-1" /><span className="text-[9px] font-bold text-zinc-600 uppercase">Passport</span></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                disabled={!amount || Number(amount) <= 0 || (!idDocument && !passportDocument)} 
                onClick={handleNext} 
                className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-[1.02] transition-all rounded-2xl text-lg font-bold"
              >
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: METHOD SELECTION */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-white/5 transition-colors"><ArrowLeft className="h-5 w-5 text-zinc-400" /></button>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Select Method</h3>
              </div>
              <div className="grid gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <button 
                    key={method.id} 
                    onClick={() => { setSelectedMethod(method); handleNext(); }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-zinc-950/50 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${method.color}`}>
                        <method.icon className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-zinc-200 uppercase tracking-tight">{method.name}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: INSTRUCTIONS */}
          {step === 3 && selectedMethod && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-white/5 transition-colors"><ArrowLeft className="h-5 w-5 text-zinc-400" /></button>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Instructions</h3>
              </div>
              
              <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300 leading-relaxed">{selectedMethod.instructions}</p>
                    <div className="mt-3 flex items-center justify-between bg-zinc-950/80 p-3 rounded-xl border border-white/5">
                      <code className="text-xs font-mono text-blue-400">{selectedMethod.details.split(': ')[1]}</code>
                      <button 
                        onClick={() => copyToClipboard(selectedMethod.details.split(': ')[1])}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-zinc-500" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                  <p className="text-sm text-zinc-300">Confirm you are sending exactly <span className="text-white font-bold">${amount}</span></p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div>
                  <p className="text-sm text-zinc-300 italic">Capture the proof of payment.</p>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full h-16 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold">
                I have made the payment
              </Button>
            </motion.div>
          )}

          {/* STEP 4: PROOF SUBMISSION */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-white/5 transition-colors"><ArrowLeft className="h-5 w-5 text-zinc-400" /></button>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Confirm Payment</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Transaction Ref / ID</Label>
                  <Input 
                    type="text" 
                    value={refId} 
                    onChange={(e) => setRefId(e.target.value)}
                    placeholder="e.g. PP220101.1200.A12345"
                    className="bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Proof of Payment</Label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      onChange={(e) => setProof(e.target.files ? e.target.files[0] : null)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="h-32 w-full border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center bg-zinc-950/30 group-hover:border-blue-500/50 transition-all">
                      {proof ? (
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          {proof.name.substring(0, 20)}...
                        </div>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-zinc-600 mb-2 group-hover:text-blue-500 transition-colors" />
                          <span className="text-xs font-bold text-zinc-600 uppercase tracking-tight">Upload Screenshot</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                disabled={!refId || !proof} 
                onClick={() => alert('Request Submitted for review!')}
                className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Complete {activeTab}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Footer */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.15em]">
        <Info className="h-3 w-3 text-blue-500" />
        Manual Processing: 1-2 Hours Expected
      </div>
    </div>
  );
};

export default PaymentSection;