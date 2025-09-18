// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hanstrix Technologies",
  description:
    "How Hanstrix Technologies collects, uses, and protects information across our website and services.",
  robots: { index: true, follow: true },
};

const UPDATED = "2025-09-08"; // update when you change this page

export default function PrivacyPolicyPage() {
  return (
    <main className="relative text-white">
      <section className="px-6 lg:px-20 py-12 md:py-16">
        <div className="xl:mx-auto xl:max-w-[900px]">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-neon">
            Privacy Policy
          </h1>
          <p className="mt-2 text-white/70 text-sm">Last updated: {UPDATED}</p>

          <div className="mt-8 space-y-8 leading-relaxed text-white/90">
            <section>
              <h2 className="text-xl font-semibold text-white">1) Who we are</h2>
              <p className="mt-2">
                Hanstrix Technologies (“Hanstrix”, “we”, “our”, “us”) operates
                this company portfolio website located at{" "}
                <span className="text-white">dev-xyz.vercel.app</span> (the
                “Site”). This policy explains how we handle information when you
                visit or interact with the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                2) Information we collect
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  <span className="font-semibold text-white">Contact details</span>{" "}
                  you choose to submit (e.g., via a form or email), such as
                  name, email, company, and message content.
                </li>
                <li>
                  <span className="font-semibold text-white">Usage data</span>{" "}
                  like pages viewed, device type, and approximate location
                  derived from your IP address (typically in aggregated form).
                </li>
                <li>
                  <span className="font-semibold text-white">Server logs</span>{" "}
                  automatically recorded by our hosting provider (e.g., IP
                  address, user-agent, request timestamps) for security and
                  reliability.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                3) How we use information
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>To respond to inquiries and provide requested information.</li>
                <li>
                  To operate, maintain, secure, and improve the Site’s
                  performance and accessibility.
                </li>
                <li>To analyze high-level traffic patterns (aggregated).</li>
                <li>
                  To comply with legal obligations and enforce our Terms of
                  Service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4) Cookies</h2>
              <p className="mt-2">
                <span className="font-semibold text-white">Current status:</span>{" "}
                We do <span className="font-semibold text-white">not</span> set
                cookies for advertising or profiling. We do not rely on cookies
                for animations (e.g., Framer Motion) or visual effects (e.g.,
                Vanta/canvas backgrounds).
              </p>
              <p className="mt-2">
                If we later introduce analytics or features that require
                non-essential cookies, we will update this policy and, where
                required, present a consent banner that lets you opt-in.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                5) Third-party services
              </h2>
              <p className="mt-2">
                We may load assets (fonts, icons, libraries, images) via CDNs or
                third-party providers. These services may receive your IP
                address and user-agent to deliver content and secure their
                infrastructure. We aim to use reputable vendors and minimize
                personal data sharing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                6) Data retention
              </h2>
              <p className="mt-2">
                We retain contact messages and related correspondence as long as
                needed to respond to you, maintain records, or comply with
                legal/operational requirements. Server logs are retained per our
                hosting provider’s standard retention windows.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                7) Security
              </h2>
              <p className="mt-2">
                We use industry-standard measures (TLS, access controls) to
                protect information. No method of transmission or storage is
                100% secure; we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                8) Your choices & rights
              </h2>
              <p className="mt-2">
                You may request access, correction, or deletion of your personal
                information by contacting us. If applicable under local laws
                (e.g., GDPR/CCPA), you may have additional rights such as data
                portability or objection to certain processing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                9) Children’s privacy
              </h2>
              <p className="mt-2">
                The Site is not directed to children under 13, and we do not
                knowingly collect personal information from them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                10) International transfers
              </h2>
              <p className="mt-2">
                Depending on your location and our providers’ locations,
                information may be processed in countries with laws different
                from your jurisdiction. We take steps to ensure appropriate
                safeguards where required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                11) Changes to this Policy
              </h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. Material
                changes will be posted on this page with an updated “Last
                updated” date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">12) Contact</h2>
              <p className="mt-2">
                For questions or privacy requests, contact:{" "}
                <a className="underline decoration-cyan-400/70" href="mailto:privacy@hanstrix.com">
                  privacy@hanstrix.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
