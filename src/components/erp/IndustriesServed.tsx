"use client";

import { motion } from "framer-motion";
import { Building2, ShoppingCart, Truck, HeartPulse, GraduationCap, Factory } from "lucide-react";

const industries = [
  { title: "Manufacturing", icon: Factory },
  { title: "Retail & E-Commerce", icon: ShoppingCart },
  { title: "Supply Chain & Logistics", icon: Truck },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Education", icon: GraduationCap },
  { title: "Corporate Enterprises", icon: Building2 },
];

export default function IndustriesServed() {
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
          Industries We Empower
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl px-3 py-5 text-center flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <ind.icon className="w-7 h-7 text-cyan-400" />
              <span className="text-sm font-medium text-white">{ind.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
