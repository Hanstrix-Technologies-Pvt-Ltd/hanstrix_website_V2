import { Mail, Phone, MapPin } from "lucide-react";

export const GetInTouchInfo = () => {
  return (
    <div className="pt-6 sm:pt-8 border-t border-slate-700 lg:pt-0 lg:border-t-0">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-5 flex items-center gap-3 flex-nowrap">
        <span className="text-gradient-neonsubtle">Get in Touch Directly</span>
      </h2>

      <div className="space-y-5 text-foreground">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-base sm:text-lg text-white">Email Us</h3>
            <a
              href="mailto:info@hanstrix.com"
              className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
              aria-label="Email info at hanstrix dot com"
            >
              info@hanstrix.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-base sm:text-lg text-white">Call Us</h3>
            <a
              href="tel:+919704328648"
              className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
              aria-label="Call plus nine one nine eight seven six five four three two one zero"
            >
              +91 97043 28648
            </a>
          </div>
        </div>

        {/* Address (optional: link to maps) */}
        <div className="flex items-start gap-3">
          <MapPin className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-base sm:text-lg text-white">Our Office</h3>
            <a
              href="https://maps.app.goo.gl/98ujcdZVaXQ7U6H6A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
            >
              Pragathi Nagar, Hyderabad, India
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
