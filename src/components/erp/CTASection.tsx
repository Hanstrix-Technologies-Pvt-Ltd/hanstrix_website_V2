"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative px-6 sm:px-12 lg:px-20 py-10 md:py-16 overflow-hidden">
      {/* full-bleed soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(0,255,255,0.10),rgba(138,43,226,0.08)_60%,transparent)]" />

      {/* XL centering rail (matches other sections) */}
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon">
            Ready to streamline your operations with ERP?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mt-3 max-w-3xl mx-auto">
            Partner with Hanstrix to design, implement, and customize an ERP that unifies finance,
            inventory, sales, and operations—delivering real-time visibility and measurable ROI.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <a
              href="/contact"
              className="btn btn--pill"
              aria-label="Get an ERP demo"
            >
              Get an ERP Demo
            </a>
          </div>
          {/* No neon underline/shimmer */}
        </motion.div>
      </div>
    </section>
  );
}
