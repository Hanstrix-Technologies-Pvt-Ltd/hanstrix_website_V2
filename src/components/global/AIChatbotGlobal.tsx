"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  Bot,
  User,
  Trash2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMsg = { role: "user" | "bot"; text: string };

const STORAGE_KEY = "hanstrix_ai_chat_v1";

export default function AIChatbotGlobal() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: "Hi! I’m the Hanstrix AI assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // restore chat
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {}
  }, []);

  // persist chat
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, open]);

  // route-aware quick prompts
  const quickPrompts = useMemo(() => {
    if (pathname.includes("/services/ai-ml")) {
      return [
        "What AI/ML services do you offer?",
        "How do you approach custom model training?",
        "What does deployment & support look like?",
      ];
    }
    if (pathname.includes("/services/erp")) {
      return ["How do you customize ERP for SMEs?", "Which modules can you integrate?", "Migration & training process?"];
    }
    if (pathname.includes("/services/website-development")) {
      return ["Do you build Next.js sites with SEO?", "Do you support e-commerce?", "Typical delivery timelines?"];
    }
    return [
      "Which service is right for my business?",
      "Explain your process in 3 steps.",
      "How can I get a cost estimate?",
    ];
  }, [pathname]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setError(null);
    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setInput("");
    setLoading(true);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: content,
          context: pathname,
          history: messages.slice(-8),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get reply");

      setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch (err: Error | unknown) {
      if ((err as Error)?.name !== "AbortError") {
        setError((err as Error)?.message || "Something went wrong");
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Sorry, I'm having trouble. Please try again." },
        ]);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const clearChat = () => {
    setMessages([{ role: "bot", text: "New chat started. How can I help?" }]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-[100] p-4 rounded-full text-white shadow-lg shadow-cyan-500/30
                   bg-gradient-to-r from-cyan-500 to-purple-600 border border-white/10
                   [background-clip:padding-box]"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle AI Chatbot"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window (anchored above the button) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="
              fixed right-6 z-[99]
              w-[min(92vw,420px)] h-[70vh] bottom-[90px]
              sm:w-[420px] sm:h-[70vh]
              md:w-[380px] md:h-[520px]
            "
          >
            <div className="glass-card rounded-2xl h-full flex flex-col border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden pointer-events-auto">
              {/* Header */}
              <div className="shrink-0 px-4 py-3 bg-gradient-to-r from-cyan-600/70 to-purple-700/70 text-white/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <span className="font-semibold">HAI</span>
                    <span className="ml-2 text-xs text-white/70 ">Hanstrix AI</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded hover:bg-white/10"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body: suggestions + scrollable messages */}
              <div className="flex-1 min-h-0 relative flex flex-col">
                {/* Quick prompts row (non-scrollable, visible below header) */}
                {messages.length <= 2 && (
                  <div className="shrink-0 px-3 pt-3 pb-2 flex flex-wrap gap-2 bg-black/20">
                    {quickPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white/90 hover:bg-white/10 transition"
                      >
                        <Sparkles className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                {/* Scrollable messages */}
                <div
                  className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar"
                  style={{ pointerEvents: "auto" }}
                >
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed border ${
                          m.role === "user"
                            ? "bg-cyan-600 text-white border-cyan-500/40"
                            : "bg-black/40 text-gray-100 border-white/10"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {m.role === "bot" ? (
                            <Bot className="w-4.5 h-4.5 mt-0.5 shrink-0 text-cyan-300" />
                          ) : (
                            <User className="w-4.5 h-4.5 mt-0.5 shrink-0 text-white/90" />
                          )}
                          <div className="prose prose-invert max-w-none prose-p:my-0 prose-strong:text-white prose-li:marker:text-cyan-400">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm bg-black/40 text-gray-300 border border-white/10">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          AI is typing…
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </div>

              {/* Footer / Input */}
              <div className="shrink-0 border-t border-white/10 px-2 py-2 bg-black/30">
                <form
                  className="flex items-center gap-1.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <button
                    type="button"
                    onClick={clearChat}
                    title="Clear chat"
                    className="p-2 rounded-lg text-gray-300 hover:bg-white/10"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>

                  <div className="flex-1 flex items-center bg-black/30 border border-white/10 rounded-xl">
                    <input
                      type="text"
                      className="flex-1 bg-transparent text-white text-sm px-3 py-2 outline-none placeholder-gray-500"
                      placeholder="Ask about our services, process, pricing…"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      aria-label="Chat input"
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="p-2 rounded-lg text-white bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50"
                    aria-label="Send"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
                {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
