"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, ChevronDown, Sparkles, Wand, Zap, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
  type CountryIso2,
} from "react-international-phone";
import "react-international-phone/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

/* body portal for overlays */
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}

export const ContactForm: React.FC = () => {
  /* form state */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    requirementsPrompt: "",
  });
  const [loading, setLoading] = useState({ submit: false, generate: false });
  const [phoneError, setPhoneError] = useState("");
  const [generationStatus, setGenerationStatus] = useState("");
  const [cooldown, setCooldown] = useState<number | null>(null);

useEffect(() => {
  if (cooldown == null) return;
  if (cooldown <= 0) { setCooldown(null); return; }
  const id = setTimeout(() => setCooldown((s) => (s ?? 1) - 1), 1000);
  return () => clearTimeout(id);
}, [cooldown]);

  /* success modal */
  const [showThanks, setShowThanks] = useState(false);

  /* phone input */
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry, phone } =
    usePhoneInput({
      defaultCountry: "in",
      value: formData.phone,
      onChange: ({ phone }) => {
        setFormData((p) => ({ ...p, phone }));
        if (phoneError) setPhoneError("");
      },
      disableCountryGuess: true,
      forceDialCode: true,
    });

  /* portal dropdown positioning */
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const placeMenu = () => {
    const btn = triggerRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const gutter = 12;
    const width = Math.min(window.innerWidth - gutter * 2, 352);
    const maxH = Math.min(360, window.innerHeight - r.bottom - gutter) || 280;
    let left = r.right - width;
    if (left < gutter) left = gutter;
    if (left + width > window.innerWidth - gutter) left = window.innerWidth - gutter - width;
    setMenuStyle({ position: "fixed", top: r.bottom + 8, left, width, maxHeight: maxH, zIndex: 9999 });
  };
  useLayoutEffect(() => {
    if (!open) return;
    placeMenu();
    const onScroll = () => placeMenu();
    const onResize = () => placeMenu();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    const onDocClick = (ev: MouseEvent) => {
      const t = ev.target as Node;
      const menu = document.getElementById("country-menu-portal");
      if (triggerRef.current && (t === triggerRef.current || triggerRef.current.contains(t))) return;
      if (menu && menu.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  /* phone validation on blur of the whole widget */
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const validatePhoneNow = () => {
    if (phone && !isValidPhoneNumber(phone)) setPhoneError("Please enter a valid phone number.");
    else setPhoneError("");
  };
  const handlePhoneBlurCapture = (evt: React.FocusEvent<HTMLDivElement>) => {
    const next = evt.relatedTarget as Node | null;
    if (next && phoneWrapRef.current?.contains(next)) return;
    validatePhoneNow();
  };

  /* generic field change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

type DraftResp = { result?: { subject?: string; message?: string }; error?: string };

const handleGenerate = async (): Promise<void> => {
  const brief = formData.requirementsPrompt.trim();
  if (!brief) {
    toast.error("Please enter your requirements first.");
    return;
  }
  setLoading((p) => ({ ...p, generate: true }));
  setGenerationStatus("AI is drafting your subject and message…");

  try {
    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: brief }),
    });
    const data: DraftResp = await r.json();

    if (!r.ok || data.error) {
      throw new Error(data.error || "Failed to generate AI draft.");
    }

    const subject = data.result?.subject?.trim() ?? "";
    const message = data.result?.message?.trim() ?? "";

    setFormData((p) => ({
      ...p,
      subject: subject || p.subject,
      message: message || p.message,
    }));

    setGenerationStatus("Draft ready! You can edit before sending.");
    toast.success("AI draft generated!");
    setCooldown(15); // 15s local cooldown between generations
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI generation failed.";
    setGenerationStatus("Failed to generate AI draft.");
    toast.error(msg);
  } finally {
    setLoading((p) => ({ ...p, generate: false }));
  }
};


  /* submit (unchanged) */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && !isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number.");
      toast.error("Invalid phone number.");
      return;
    }
    setLoading((p) => ({ ...p, submit: true }));
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { message?: string } = await r.json();
      if (!r.ok) throw new Error(result?.message || "Failed to send message.");
      setShowThanks(true);
      setFormData({ name: "", email: "", subject: "", message: "", phone: "", requirementsPrompt: "" });
      setPhoneError("");
      setGenerationStatus("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading((p) => ({ ...p, submit: false }));
    }
  };

  /* shared input classes */
  const inputClasses =
    "w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-800 border border-slate-600 rounded-lg " +
    "focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none " +
    "transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

  /* memoized country filtering */
  const filtered = useMemo(
    () =>
      defaultCountries
        .map(parseCountry)
        .filter((c) => {
          if (!query.trim()) return true;
          const q = query.toLowerCase();
          return (
            c.name.toLowerCase().includes(q) ||
            c.iso2.toLowerCase().includes(q) ||
            (`+${c.dialCode}`).includes(q.replace(/\s+/g, ""))
          );
        }),
    [query]
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Your Name" required />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="your@example.com" required />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-1.5">Phone Number</label>
          <div ref={phoneWrapRef} onBlurCapture={handlePhoneBlurCapture}>
            <div className="rip-input">
              <div className="rip-btn">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Choose country"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FlagImage iso2={country.iso2} className="rip-flag" />
                  <span className="text-white/90 text-sm leading-none">+{country.dialCode}</span>
                  <ChevronDown className="phone-chevron" />
                </button>
              </div>

              <input
                id="phone"
                ref={inputRef}
                value={inputValue}
                onChange={handlePhoneValueChange}
                onKeyDown={(ev) => {
                  if (ev.key.length === 1 && /[A-Za-z]/.test(ev.key) && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
                    ev.preventDefault();
                  }
                }}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Enter phone number"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Country portal */}
          <AnimatePresence>
            {open && (
              <Portal>
                <motion.div
                  id="country-menu-portal"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={menuStyle}
                  className="rip-dd custom-scrollbar"
                >
                  <div className="p-2 border-b border-slate-700 bg-slate-900 sticky top-0">
                    <input
                      aria-label="Search country"
                      className="rip-search w-full rounded-md px-2.5 py-2 outline-none"
                      placeholder="Search country or dial code…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <ul className="py-1">
                    {filtered.map((c) => {
                      const selected = c.iso2 === country.iso2;
                      return (
                        <li key={c.iso2}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountry(c.iso2 as CountryIso2);
                              setOpen(false);
                              setQuery("");
                            }}
                            className={`rip-item ${selected ? "bg-slate-800/70" : ""}`}
                          >
                            <FlagImage iso2={c.iso2} style={{ width: 18, height: 14 }} />
                            <span className="flex-1 text-sm text-white/90">{c.name}</span>
                            <span className="text-xs text-white/60">+{c.dialCode}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </Portal>
            )}
          </AnimatePresence>

          {/* phone error */}
          <AnimatePresence>
            {phoneError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-red-400 mt-2 flex items-center gap-2"
              >
                <AlertCircle size={16} /> {phoneError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Requirements + AI (BUTTON CHANGED slightly to show cooldown) */}
      <div>
        <label htmlFor="requirementsPrompt" className="block text-sm font-medium text-white mb-1.5">
          What can we help you with?
        </label>
        <textarea
          id="requirementsPrompt"
          name="requirementsPrompt"
          value={formData.requirementsPrompt}
          onChange={handleChange}
          rows={3}
          className={inputClasses}
          placeholder="e.g., I need a custom AI chatbot for my e-commerce site…"
        />
        <div className="flex justify-end mt-1">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading.generate || cooldown !== null}
            className="btn btn--sm sm:btn--lg"
            title={cooldown ? `Please wait ${cooldown}s` : undefined}
          >
            {cooldown !== null
              ? `Wait ${cooldown}s`
              : loading.generate
                ? (<><Wand size={16} className="animate-spin" /> Generating…</>)
                : (<><Sparkles size={16} /> Generate Message</>)
            }
          </button>

        </div>
        <AnimatePresence>
          {generationStatus && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm mt-1 flex items-center gap-2 ${
                generationStatus.toLowerCase().includes("failed") ? "text-red-400" : "text-green-400"
              }`}
            >
              <Zap size={16} /> {generationStatus}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-white mb-1.5">Subject</label>
          <input id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClasses} placeholder="AI generated or enter subject…" required />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">Your Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className={inputClasses} placeholder="AI generated or enter your message…" required />
        </div>

        <button type="submit" disabled={loading.submit} className="btn w-full">
          {loading.submit ? "Submitting…" : (<><Send size={20} /> Send Message</>)}
        </button>
      </form>

      {/* Submitting overlay */}
      <Portal>
        <AnimatePresence>
          {loading.submit && (
            <motion.div
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-[2px] grid place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="glass-card border border-white/10 rounded-2xl px-6 py-5 text-center"
              >
                <div className="mx-auto mb-3 h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <div className="text-white font-semibold">Sending your message…</div>
                <div className="text-white/70 text-sm mt-1">Please don’t close this window.</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Thank-you modal */}
      <Portal>
        <AnimatePresence>
          {showThanks && (
            <motion.div
              className="fixed inset-0 z-[1001] bg-black/70 backdrop-blur-[2px] grid place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowThanks(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: -8 }}
                className="glass-card border border-white/10 rounded-3xl px-8 py-7 text-center max-w-md mx-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mx-auto mb-3 h-16 w-16 rounded-full grid place-items-center bg-emerald-500/20 border border-emerald-400/30">
                  <CheckCircle2 className="w-10 h-10 text-emerald-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank you!</h3>
                <p className="text-white/80 mt-2">
                  We’ve received your message. A confirmation has been emailed to you and our team will respond shortly.
                </p>
                <button
                  onClick={() => setShowThanks(false)}
                  className="mt-5 btn btn--pill"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};
