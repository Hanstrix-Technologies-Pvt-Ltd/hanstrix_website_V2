"use client";

import { motion } from "framer-motion";
import { Building2, Package, LineChart } from "lucide-react";

type Study = {
  logo?: string;
  icon: React.ElementType;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  before: string;
  after: string;
  spark: number[];
};

const studies: Study[] = [
  {
    icon: Building2,
    title: "Enterprise Resource Unification",
    industry: "Corporate",
    problem: "Fragmented data across finance, HR, and procurement.",
    solution:
      "Unified, role-based ERP modules with automated approvals and real-time reporting.",
    before: "Reporting took 4–5 days",
    after: "Real-time visibility",
    spark: [6, 7, 5, 8, 10, 11, 14, 13, 16, 18],
  },
  {
    icon: Package,
    title: "Inventory Accuracy at Scale",
    industry: "Retail & Distribution",
    problem: "Stockouts & overstock due to manual reconciliation.",
    solution:
      "Automated stock sync across POS, WMS & e-commerce; demand alerts.",
    before: "72% accuracy",
    after: "97%+ accuracy",
    spark: [3, 4, 5, 7, 6, 8, 9, 11, 12, 13],
  },
  {
    icon: LineChart,
    title: "Finance Close Acceleration",
    industry: "Financial Services",
    problem: "Month-end close was slow & error-prone.",
    solution:
      "Custom ledgers, audit trails, and rule-based reconciliations within ERP.",
    before: "T+10 days close",
    after: "T+3 days close",
    spark: [12, 12, 11, 10, 9, 8, 8, 7, 6, 5],
  },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const H = 44;           // viewBox height
  const W = 100;          // viewBox width (normalized)
  const step = data.length > 1 ? W / (data.length - 1) : W;

  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = H - ((v - min) / Math.max(1, max - min)) * H;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="w-36 sm:w-40 md:w-44 h-11 opacity-80"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function CaseStudies() {
  return (
    <section
      className="px-6 lg:px-20 py-12 md:py-16"
      aria-labelledby="erp-case-studies-heading"
    >
      <div className="section-center-xl">
        <motion.h2
          id="erp-case-studies-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-8 text-center"
        >
          ERP Case Snapshots
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studies.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-5 flex flex-col h-full focus-within:ring-2 focus-within:ring-cyan-400/40"
              tabIndex={-1}
            >
              <div className="flex items-center gap-3">
                <s.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                <div>
                  <h3 className="text-white font-semibold">{s.title}</h3>
                  <p className="text-xs text-gray-400">{s.industry}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-300 space-y-2">
                <p>
                  <span className="text-white/90 font-medium">Problem: </span>
                  {s.problem}
                </p>
                <p>
                  <span className="text-white/90 font-medium">Solution: </span>
                  {s.solution}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 p-3 bg-white/5">
                  <p className="text-gray-400 text-xs">Before</p>
                  <p className="text-white font-medium">{s.before}</p>
                </div>
                <div className="rounded-xl border border-white/10 p-3 bg-white/5">
                  <p className="text-gray-400 text-xs">After</p>
                  <p className="text-white font-medium">{s.after}</p>
                </div>
              </div>

              {/* push sparkline to the bottom for equal-height cards */}
              <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <span className="text-xs text-gray-300">
                  Trajectory
                  <span className="sr-only">
                    {` from "${s.before}" to "${s.after}"`}
                  </span>
                </span>
                <Sparkline data={s.spark} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
