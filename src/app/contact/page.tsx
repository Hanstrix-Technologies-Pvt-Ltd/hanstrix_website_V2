"use client";

import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
import CanvasBackground from "@/components/contact/CanvasBackground";
import { AiAssistantInfo } from "@/components/contact/AiAssistantInfo";
import { GetInTouchInfo } from "@/components/contact/GetInTouchInfo";

const ContactPage = () => {
  return (
    <>
      <Toaster
        position="top-center"
        /* push it below your fixed navbar height + a little gap */
        containerStyle={{ 
          zIndex: 2147483647, 
          top: "calc(var(--nav-h, 64px) + 8px)" 
        }}
        toastOptions={{
          style: { zIndex: 2147483647 },
          className: "dark:bg-gray-800 dark:text-white",
        }}
      />


      <div className="min-h-screen w-full bg-transparent text-foreground relative font-sans">
        <CanvasBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="section-spacing relative container container-gutters"
        >
          {/* Heading */}
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10 pt-5 md:pt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-neon leading-tight mb-3 sm:mb-4">
              Connect with the Future
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto">
              Have a question or a brilliant idea? Reach out and let our AI-assisted platform guide your message.
            </p>
          </div>

          {/* Form + Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-6xl mx-auto bg-slate-900/70 rounded-2xl shadow-2xl 
                      p-5 sm:p-8 lg:p-10 border border-slate-700"
          >
            <div className="lg:hidden mb-8">
              <AiAssistantInfo />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              {/* Contact Form */}
              <ContactForm />

              {/* Info column */}
              <div className="flex flex-col gap-8 sm:gap-10">
                <div className="hidden lg:block">
                  <AiAssistantInfo />
                </div>
                <div className="lg:pl-8 lg:border-l lg:border-slate-700">
                  <GetInTouchInfo />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;
