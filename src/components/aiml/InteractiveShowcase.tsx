"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain, LineChart } from "lucide-react";
import NeuralVisualizer from "@/components/aiml/NeuralVisualizer";

const toClassBySentiment = (s: string | null) => {
  if (!s) return "bg-gray-800/60 text-gray-200 border border-white/10";
  const t = s.toLowerCase();
  if (t.includes("positive")) return "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30";
  if (t.includes("negative")) return "bg-rose-600/20 text-rose-300 border border-rose-500/30";
  return "bg-slate-600/20 text-slate-200 border border-slate-400/30";
};

export default function InteractiveShowcase() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(() => loading || text.trim().length === 0, [loading, text]);

  const analyzeSentiment = useCallback(async () => {
    if (disabled) return;
    setLoading(true);
    setError(null);
    setSentiment(null);

    try {
      const res = await fetch("/api/ai/interaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: "sentiment", input: text.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze sentiment.");
      setSentiment(data.response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [disabled, text]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") analyzeSentiment();
  };

  return (
    <section className="px-6 lg:px-20 py-10 md:py-16">
      {/* XL rail only — centers content on ultrawide, no other layout changes */}
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-8 text-center"
        >
          Try Our AI in Action
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sentiment Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-gradient-neonsubtle">Sentiment Playground</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Type a sentence and see how our model classifies the sentiment.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={`Try: "I love this amazing service!"  (⌘/Ctrl + Enter to analyze)`}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              rows={3}
            />

            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={analyzeSentiment}
                disabled={disabled}
                className="px-4 py-2 rounded-full bg-gradient-neon text-white font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>

              {sentiment && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-3 py-1 rounded-full text-sm ${toClassBySentiment(sentiment)}`}
                  aria-live="polite"
                >
                  {sentiment}
                </motion.span>
              )}
            </div>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          </motion.div>

          {/* Neural Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-gradient-neonsubtle">
                Neural Network Visualizer
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              A simple animation showing how inputs flow through layers of a neural network.
            </p>

            <div className="relative flex justify-between items-center h-40">
              <NeuralVisualizer layers={[3, 5, 4, 2]} cycleSec={3.6} nodeRadius={8} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
