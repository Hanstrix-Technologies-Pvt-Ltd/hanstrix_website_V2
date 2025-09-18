import { Bot } from 'lucide-react';

export const AiAssistantInfo = () => (
  <div className="p-4 sm:p-6 bg-slate-800 rounded-lg border border-slate-700 shadow-md">
    <h1 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
      <Bot className="text-indigo-400 flex-shrink-0" size={22} />
      <span className="text-gradient-neonsubtle">Hanstrix AI</span>
    </h1>
    <p className="text-white text-sm sm:text-base leading-relaxed">
      Briefly describe your needs, and our assistant will draft a professional
      message, detect your inquiry&apos;s intent, and suggest a subject line—
      making communication effortless.
    </p>
  </div>
);
