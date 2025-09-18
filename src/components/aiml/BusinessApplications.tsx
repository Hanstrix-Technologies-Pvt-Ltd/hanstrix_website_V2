"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessApplications } from "@/content/aiml-page-content";

export default function BusinessApplications() {
  const [selectedTab, setSelectedTab] = useState(0);
  const selectedApplication = businessApplications[selectedTab];

  return (
    <section className="px-4 lg:px-20">
      {/* XL rail only — centers on ultrawide, no spacing changes */}
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-8 text-center"
        >
          AI Across Key Business Verticals
        </motion.h2>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Tab buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 border-b border-white/10 pb-2 justify-center">
            {businessApplications.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setSelectedTab(index)}
                className={`relative px-3 py-2 text-sm sm:text-base font-medium transition-colors ${
                  selectedTab === index ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.title}
                {selectedTab === index && (
                  <motion.div
                    className="absolute bottom-[-10px] left-0 right-0 h-1 bg-gradient-neon"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-8 text-center w-full min-h-[180px] flex flex-col justify-center"
              >
                <div className="flex justify-center items-center gap-3 mb-4">
                  <selectedApplication.icon className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-gradient-neonsubtle">
                    {selectedApplication.title}
                  </h3>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {selectedApplication.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
