"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Upload, BrainCircuit, Sparkles, Activity, Target, TrendingDown, Loader2, FileImage } from "lucide-react";
import EconomicCalendarWidget from "./economic-calendar-widget";
import { Button } from "@/components/ui/button";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);


export function NewsFeed() {
  const [mounted, setMounted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowAnalysis(false);
    }
  };

  const runAnalysis = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      setAnalysisResult(data.analysis);
      setShowAnalysis(true);
    } catch (err) {
      alert("Failed to analyze chart. Please check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-24 bg-card/10 relative overflow-hidden" id="news" data-section="community">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Institutional Economic Calendar
          </h2>
          <p className="mt-3 text-muted-foreground">
              Live high-impact events powered by Tradays
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                High Impact Events
              </h3>
              <button 
                onClick={() => window.open("https://www.forexfactory.com/calendar", "_blank")}
                suppressHydrationWarning
                className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
              >
                Full Calendar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {mounted ? <EconomicCalendarWidget /> : <div className="h-[600px] w-full bg-card/40 animate-pulse rounded-2xl" />}
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <WhatsAppIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h4 className="font-bold text-xl text-blue-500 uppercase tracking-tight">Join Our WhatsApp Channel</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Get real-time market signals and institutional insights delivered directly to your phone.
              </p>
              <a 
                href="https://whatsapp.com/channel/0029VaVnVETC6ZvgsD8foc3E" 
                target="_blank" 
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-6 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
              >
                <WhatsAppIcon className="h-4 w-4" /> Join Channel
              </a>
            </motion.div>
          </div>
        </div>

        {/* AI Analyser Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-4xl text-slate-100">
                AI Forex <span className="text-blue-500">Chart Analyst</span>
            </h2>
            <p className="mt-3 text-muted-foreground font-bold uppercase text-[10px] tracking-[0.3em]">
                Institutional Grade Technical Intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Trading Grid Background Effect */}
            <div 
              className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
              }} 
            />

            {/* Left Column: Upload */}
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
                <span className="text-blue-500 font-black">1.</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Upload Chart</h3>
              </div>
              
              <div className="group relative rounded-[2.5rem] border-2 border-dashed border-white/10 bg-slate-800/40 p-12 transition-all hover:border-blue-500/50 flex flex-col items-center justify-center text-center">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                
                {!previewUrl ? (
                  <>
                    <div className="h-20 w-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6">
                      <Upload className="h-8 w-8 text-blue-500" />
                    </div>
                    <h4 className="text-lg font-bold uppercase text-slate-100">Drop your screenshot here</h4>
                    <p className="text-xs text-slate-400 mt-2">Supports MT4/MT5, TradingView (PNG, JPG)</p>
                  </>
                ) : (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold uppercase text-white">Click to change image</p>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={runAnalysis}
                  disabled={isAnalyzing || !selectedFile}
                  className="mt-8 w-full bg-blue-600 py-8 font-black uppercase rounded-2xl tracking-widest hover:scale-[1.02] transition-transform text-white relative z-20"
                >
                  {isAnalyzing ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  {isAnalyzing ? "Processing..." : "Analyze Chart"}
                </Button>
              </div>
            </div>

            {/* Right Column: AI Outcome */}
            <div className="space-y-6 text-left bg-slate-900/50 p-6 rounded-[2.5rem] border border-white/5 min-h-[500px] flex flex-col">
              <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
                <span className="text-blue-500 font-black">2.</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">AI Analysis Outcome</h3>
              </div>

              <div className="flex-1 rounded-3xl bg-slate-800/30 p-8 relative overflow-y-auto">
                {!showAnalysis && !isAnalyzing && (
                  <div className="flex flex-col items-center justify-center text-center p-12 opacity-50">
                    <BrainCircuit className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center">Upload a chart to begin technical analysis</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <div className="h-1 bg-secondary w-48 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="h-full bg-blue-500 w-1/2"
                      />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Neural engine processing...</p>
                  </div>
                )}

                {showAnalysis && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-invert prose-sm max-w-none">
                    <div className="flex items-center gap-2 text-blue-500">
                      <Sparkles className="h-5 w-5" />
                      <span className="text-xs font-black uppercase tracking-widest">Intelligence Report CF-992</span>
                    </div>
                    <div className="mt-6 whitespace-pre-wrap text-slate-300 leading-relaxed font-medium">
                      {analysisResult}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Analysis High-Confidence</span>
                      </div>
                      <Target className="h-4 w-4 text-blue-500" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
