"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, XCircle } from "lucide-react";
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
      // Using FormSubmit.co AJAX to send the message to snyakura22@gmail.com
      const response = await fetch("https://formsubmit.co/ajax/snyakura22@gmail.com", {
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
    <section id="contact" className="relative border-y border-border/50 py-24 overflow-hidden bg-background isolate transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6">
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">GET IN TOUCH</span>
          </div>
          <h2 className="text-pretty text-4xl font-black tracking-tighter text-foreground sm:text-5xl lg:text-6xl mb-6 uppercase leading-[1.1]">
            Have a question? <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">Contact Us</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We're here to help! Send us a message and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mt-12 bg-card/60 dark:bg-zinc-900/60 border border-border dark:border-blue-500/30 ring-1 ring-blue-500/10 dark:ring-blue-500/20 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.1)] dark:shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_80px_rgba(59,130,246,0.25)] group/form"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-600/10 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none group-hover/form:bg-blue-600/20 dark:group-hover/form:bg-blue-600/30 transition-colors duration-500" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Your Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="text-[10px] text-destructive font-bold uppercase ml-1">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-[10px] text-destructive font-bold uppercase ml-1">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="subject" className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Subject</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Regarding a service inquiry..."
              value={formData.subject}
              onChange={handleChange}
              className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && <p id="subject-error" className="text-[10px] text-destructive font-bold uppercase ml-1">{errors.subject}</p>}
          </div>

          <div className="space-y-2 mb-8">
            <Label htmlFor="message" className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Your Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="bg-secondary/30 border-border py-4 rounded-xl focus:border-blue-500"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <p id="message-error" className="text-[10px] text-destructive font-bold uppercase ml-1">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
            disabled={status === "loading"}
          >
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </motion.span>
              )}
              {status === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5" /> Message Sent!
                </motion.span>
              )}
              {status === "error" && (
                <motion.span
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <XCircle className="h-5 w-5" /> Failed to Send
                </motion.span>
              )}
              {status === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Send Message <Send className="ml-2 h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          {status === "error" && Object.keys(errors).length === 0 && (
            <p className="text-[10px] text-destructive font-bold uppercase text-center mt-4">Please correct the errors above.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}