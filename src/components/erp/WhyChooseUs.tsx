"use client";

import { motion } from "framer-motion";
import { Award, Lightbulb, Handshake, Settings } from "lucide-react";

const points = [
  { title: "Proven ERP Expertise", desc: "Over a decade of delivering ERP solutions tailored to SMEs and enterprises.", icon: Award },
  { title: "Innovation with Flexibility", desc: "We innovate while ensuring your ERP aligns with your business rules.", icon: Lightbulb },
  { title: "Partnership Approach", desc: "We co-create ERP solutions as your long-term digital transformation partner.", icon: Handshake },
  { title: "Smooth Customization", desc: "Quick adaptability of ERP modules to your workflows without disruption.", icon: Settings },
];

export default function WhyChooseUs() {
  return (
    <section className="px-6 lg:px-20 py-12 md:py-16">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-10 text-center"
        >
          Why Choose Our ERP?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {points.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 flex gap-4 items-start"
            >
              <p.icon className="w-7 h-7 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
