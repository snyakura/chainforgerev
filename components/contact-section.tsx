"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, XCircle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus("error"); // Indicate validation errors
      return;
    }

    setStatus("loading");
    setErrors({}); // Clear previous errors

    try {
      // Using FormSubmit.co AJAX to send the message to chainforge@gmail.com
      const response = await fetch("https://formsubmit.co/ajax/chainforge@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Message from ChainForge: ${formData.subject}`
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative min-h-screen border-y border-border py-32 overflow-hidden bg-background isolate transition-colors duration-500">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Emerald Radial Glows */}
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        
        {/* Glowing Circuit Lines */}
        <div className="absolute top-[10%] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
        <div className="absolute bottom-[20%] right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-blue-500/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />

        {/* Ghost Typography */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
          <span className="text-[22vw] font-black tracking-tighter uppercase leading-none text-blue-500 dark:text-blue-500">
            CONTACT
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Get In Touch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">GET IN TOUCH</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter leading-tight">
                Let&apos;s Build <br />
                <span className="text-blue-500">The Future.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Have inquiries about our signals or transactions? Our elite support team is ready to assist you in navigating the markets.
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              {[
                { icon: Mail, label: "Email", value: "chainforge@gmail.com" },
                { icon: Phone, label: "Phone", value: "+263 78 429 3089" },
                { icon: MapPin, label: "Location", value: "4th floor right wing zimdef bulawayo" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md transition-all hover:bg-zinc-800/50 hover:border-blue-500/20"
                > {/* Changed bg-zinc-900/40 to bg-card/60, border-white/5 to border-border, hover:bg-zinc-800/50 to hover:bg-secondary/50 */}
                  <div className="h-12 w-12 rounded-xl bg-secondary/30 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <item.icon className="h-5 w-5 text-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Sleek Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/60 border border-blue-500/20 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group/form"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] ml-2">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-secondary/30 border-border h-16 rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all placeholder:text-muted-foreground"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase ml-2">{errors.name}</p>}
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] ml-2">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary/30 border-border h-16 rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all placeholder:text-muted-foreground"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase ml-2">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <Label htmlFor="message" className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] ml-2">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="bg-secondary/30 border-border rounded-[2rem] p-6 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all placeholder:text-muted-foreground resize-none"
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase ml-2">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-foreground text-background hover:bg-foreground/90 h-16 rounded-2xl font-black text-lg uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.98]"
              disabled={status === "loading"}
            >
              <AnimatePresence mode="wait">
                {status === "loading" ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-background">
                    <div className="h-4 w-4 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    Sending...
                  </motion.div>
                ) : status === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" /> Sent Successfully
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    Submit Message <Send className="ml-2 h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            {status === "error" && (
               <p className="text-[10px] text-red-500 font-bold uppercase text-center mt-4">Transmission Failed. Please check inputs.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}