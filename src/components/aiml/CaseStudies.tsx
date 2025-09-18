"use client";

import { motion } from "framer-motion";

const studies = [
  {
    id: 1,
    title: "AI in Healthcare",
    region: "USA",
    description:
      "Implemented a diagnostic ML system to analyze medical images with 95% accuracy.",
  },
  {
    id: 2,
    title: "Retail Personalization",
    region: "India",
    description:
      "Enhanced e-commerce conversions with AI-driven product recommendations.",
  },
  {
    id: 3,
    title: "FinTech Fraud Detection",
    region: "Europe",
    description:
      "Reduced fraudulent transactions by 40% using real-time anomaly detection.",
  },
];

export default function CaseStudies() {
  return (
    <section className="px-6 lg:px-20 py-8 md:py-13">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-8 text-center"
        >
          Case Studies Across Industries
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-transform"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                {study.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{study.region}</p>
              <p className="text-gray-300 text-sm">{study.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
