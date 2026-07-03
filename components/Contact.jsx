"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) {
      tempErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters.";
    }

    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[var(--background)] overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-[#b4fe1e]/[0.008] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-350">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                Let’s Build Something Iconic Together
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-md font-medium">
                Have an idea, need branding, or want to discuss a new digital product? Drop us a message, and our creative experts will get back to you within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Us</h4>
                  <p className="text-white text-sm font-semibold mt-0.5">hello@designagency.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Call Us</h4>
                  <p className="text-white text-sm font-semibold mt-0.5">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Office</h4>
                  <p className="text-white text-sm font-semibold mt-0.5">Downtown Creative District, NY</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Panel */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full"
          >
            <div className="relative rounded-3xl bg-[#0b0f19]/35 p-8 sm:p-10 border border-white/5 overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-400">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 hover:border-white/15 focus:bg-white/10 ${
                          errors.name
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-[#b4fe1e]/50"
                        }`}
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-400">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 hover:border-white/15 focus:bg-white/10 ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-[#b4fe1e]/50"
                        }`}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-semibold text-slate-400">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Tell us about your project or vision..."
                        value={form.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 resize-none hover:border-white/15 focus:bg-white/10 ${
                          errors.message
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-[#b4fe1e]/50"
                        }`}
                      />
                      {errors.message && (
                        <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit button (hover:scale-105, smooth transition) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#b4fe1e] text-black font-bold text-sm hover:bg-[#bef264] transition-all duration-300 hover:scale-105 active:scale-98 shadow-md hover:shadow-[#b4fe1e]/15 cursor-pointer disabled:opacity-50 select-none"
                    >
                      {isSubmitting ? (
                        <span className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-450 mb-6 animate-bounce">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Received!</h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8 font-medium">
                      Thank you for reaching out. We have received your inquiry and our team will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
