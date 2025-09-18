'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterClient() {
  return (
    <Toaster
      position="top-center"
      // push it below your fixed navbar (uses your CSS var --nav-h)
      containerClassName="pointer-events-auto !mt-[calc(var(--nav-h)+8px)]"
      // beat navbar’s z-50 (also survives any other stacking contexts)
      containerStyle={{ zIndex: 2147483647 }}
      toastOptions={{
        style: {
          background: '#0f172a',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.12)',
        },
        success: {
          iconTheme: { primary: '#22d3ee', secondary: '#0b1220' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#0b1220' },
        },
      }}
    />
  );
}
