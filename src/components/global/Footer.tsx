"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

type SectionKey = "Services" | "Company" | "Resources";

const sections: Record<SectionKey, { name: string; href: string }[]> = {
  Services: [
    { name: "AI & ML", href: "/services/ai-ml" },
    { name: "ERP Solutions", href: "/services/erp-software" },
    { name: "Website Development", href: "/services/website-development" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  Resources: [
    { name: "Case Studies", href: "/case-studies" },
    { name: "Documentation", href: "/docs" },
    { name: "Support", href: "/support" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/hanstrixtechnologies", icon: <FaFacebookF className="h-5 w-5" /> },
  { name: "Instagram", href: "https://www.instagram.com/hanstrixtechnologies", icon: <FaInstagram className="h-5 w-5" /> },
  { name: "LinkedIn", href: "https://in.linkedin.com/", icon: <FaLinkedinIn className="h-5 w-5" /> },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const LinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="group inline-block text-gray-300 hover:text-white transition-colors text-sm"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );

  return (
    <footer className="relative z-10 bg-[#030303] text-white px-4 md:px-6 py-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        {/* ===== Desktop / Tablet (ONLY md+ changes) ===== */}
        <div className="hidden md:grid grid-cols-12 gap-6 md:gap-8">
          {/* LEFT: Brand + Contact stacked, EXACT same width */}
          <div className="col-span-5 lg:col-span-4 space-y-4">
            {/* Brand container */}
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2 text-gradient-neon">Hanstrix Technologies</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Leading digital transformation solutions for modern businesses. We empower companies with innovative technology that drives growth and success.
              </p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-2xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact container (same width as brand via max-w-md) */}
            <div
              className="
                max-w-md rounded-xl border border-white/10 bg-white/5
                px-4 py-3
                grid grid-cols-1 items-center gap-2
                md:grid-cols-[auto_1fr] md:gap-x-4
              "
            >
              <span className="text-sm font-semibold">Contact</span>
              <div className="text-gray-300 text-sm flex flex-wrap items-center gap-x-5 gap-y-1">
                <span>
                  Phone:{" "}
                  <a href="tel:+919704328648" className="text-white hover:underline">
                    +91 97043 28648
                  </a>
                </span>
                <span>
                  Email:{" "}
                  <a href="mailto:info@hanstrix.com" className="text-white hover:underline">
                    info@hanstrix.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: sections (unchanged styles), vertically centered */}
          <div className="col-span-7 lg:col-span-8 grid grid-cols-3 gap-6 md:gap-8 self-center">
            {(["Services", "Company", "Resources"] as SectionKey[]).map((key) => (
              <nav key={key} aria-label={key}>
                <h4 className="text-lg font-semibold mb-3">{key}</h4>
                <ul className="space-y-2">
                  {sections[key].map((link) => (
                    <li key={link.name}>
                      <LinkItem href={link.href}>{link.name}</LinkItem>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ===== Mobile (UNCHANGED) ===== */}
        <div className="md:hidden space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gradient-neon">Hanstrix Technologies</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading digital transformation solutions that drive real growth and success.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-2xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {(["Services", "Company", "Resources"] as SectionKey[]).map((key) => {
            const items = sections[key];

            // Special mobile layout for exactly 3 items: 2 on the left, 1 on the right
            if (items.length === 3) {
              return (
                <div key={key}>
                  <h4 className="text-base font-semibold mb-2">{key}</h4>
                  <div className="grid grid-cols-2 gap-x-4">
                    <ul className="flex flex-col gap-2">
                      {items.slice(0, 2).map((link) => (
                        <li key={link.name}>
                          <LinkItem href={link.href}>{link.name}</LinkItem>
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-2">
                      <li className="self-start sm:self-center">
                        <LinkItem href={items[2].href}>{items[2].name}</LinkItem>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }

            // Default: 2×2 grid; if odd, last spans both columns & centers
            const isOdd = items.length % 2 === 1;
            return (
              <div key={key}>
                <h4 className="text-base font-semibold mb-2">{key}</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {items.map((link, idx) => {
                    const centerLast = isOdd && idx === items.length - 1;
                    return (
                      <li key={link.name} className={centerLast ? "col-span-2 flex justify-center" : ""}>
                        <LinkItem href={link.href}>{link.name}</LinkItem>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* Mobile Contact (unchanged) */}
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="block text-sm font-semibold mb-1">Contact</span>
            <div className="text-gray-300 text-xs flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Phone:{" "}
                <a href="tel:+15551234567" className="text-white hover:underline">
                  (555) 123-4567
                </a>
              </span>
              <span>
                Email:{" "}
                <a href="mailto:info@hanstrix.com" className="text-white hover:underline">
                  info@hanstrix.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-3 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            <span suppressHydrationWarning>&copy; {year ?? ""}</span> Hanstrix Technologies. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
