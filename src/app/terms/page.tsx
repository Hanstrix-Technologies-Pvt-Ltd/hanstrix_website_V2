// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hanstrix Technologies",
  description:
    "The terms and conditions for using the Hanstrix Technologies website and services.",
  robots: { index: true, follow: true },
};

const UPDATED = "2025-09-08"; // update when you change this page

export default function TermsPage() {
  return (
    <main className="relative text-white">
      <section className="px-6 lg:px-20 py-12 md:py-16">
        <div className="xl:mx-auto xl:max-w-[900px]">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-neon">
            Terms of Service
          </h1>
          <p className="mt-2 text-white/70 text-sm">Last updated: {UPDATED}</p>

          <div className="mt-8 space-y-8 leading-relaxed text-white/90">
            <section>
              <h2 className="text-xl font-semibold text-white">1) Acceptance</h2>
              <p className="mt-2">
                By accessing or using the Hanstrix Technologies website at{" "}
                <span className="text-white">dev-xyz.vercel.app</span> (the
                “Site”), you agree to these Terms of Service (“Terms”). If you do
                not agree, do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                2) Who we are & Services
              </h2>
              <p className="mt-2">
                Hanstrix Technologies showcases our portfolio, capabilities, and
                services (e.g., web development, ERP, AI/ML, digital marketing).
                Any proposals, statements of work, or master services agreements
                you sign with us (“Service Agreements”) will govern paid
                engagements. These Terms govern use of the Site itself.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                3) Eligibility & Conduct
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>You must be able to form a binding contract in your region.</li>
                <li>
                  You agree not to misuse the Site (e.g., no unlawful activity,
                  malware, scraping, reverse engineering, or disrupting servers).
                </li>
                <li>
                  You may not use the Site to infringe the rights of others or to
                  upload/submit illegal or harmful content.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4) IP Rights</h2>
              <p className="mt-2">
                The Site, its design, text, graphics, logos, and other content
                are owned by Hanstrix or our licensors and protected by
                intellectual property laws. You may view the Site and, where
                offered, download materials for personal or internal business use
                only, retaining all proprietary notices. Any other use requires
                our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5) Feedback</h2>
              <p className="mt-2">
                If you share feedback or suggestions, you grant Hanstrix a
                non-exclusive, worldwide, royalty-free, irrevocable license to
                use and incorporate it without obligation to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                6) Third-Party Links & Assets
              </h2>
              <p className="mt-2">
                The Site may reference third-party websites or load third-party
                assets (e.g., libraries, fonts, images via CDNs). We do not
                control these third parties and are not responsible for their
                content, policies, or practices. Access at your own discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                7) No Warranties
              </h2>
              <p className="mt-2">
                The Site is provided “as is” and “as available” without
                warranties of any kind, express or implied. Hanstrix disclaims
                all warranties including merchantability, fitness for a
                particular purpose, and non-infringement. We do not warrant the
                Site will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                8) Limitation of Liability
              </h2>
              <p className="mt-2">
                To the maximum extent permitted by law, Hanstrix and its
                affiliates will not be liable for any indirect, incidental,
                special, consequential, or punitive damages; or for any loss of
                profits, revenues, data, or goodwill arising from or related to
                your use of the Site. Our total liability for any claim relating
                to the Site will not exceed USD 100.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">9) Indemnity</h2>
              <p className="mt-2">
                You agree to defend, indemnify, and hold harmless Hanstrix and
                its affiliates from claims, damages, liabilities, costs, and
                expenses (including reasonable legal fees) arising from your use
                of the Site or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                10) Governing Law & Disputes
              </h2>
              <p className="mt-2">
                These Terms are governed by the laws of{" "}
                <span className="italic">[insert jurisdiction]</span>, without
                regard to conflict-of-laws principles. You agree to the exclusive
                jurisdiction and venue of the courts located in{" "}
                <span className="italic">[insert city/state/country]</span> to
                resolve any dispute arising from these Terms or the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                11) Termination
              </h2>
              <p className="mt-2">
                We may suspend or terminate access to the Site at any time
                without notice if we believe you have violated these Terms or to
                address security, legal, or operational issues.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                12) Changes to the Terms
              </h2>
              <p className="mt-2">
                We may update these Terms from time to time. Continued use of the
                Site after changes become effective constitutes acceptance of the
                updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">13) Contact</h2>
              <p className="mt-2">
                Questions about these Terms? Contact{" "}
                <a className="underline decoration-cyan-400/70" href="mailto:legal@hanstrix.com">
                  legal@hanstrix.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
