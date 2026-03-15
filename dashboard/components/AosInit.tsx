'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    AOS: {
      init: (options?: Record<string, unknown>) => void;
      refresh: () => void;
    };
  }
}

export default function AosInit() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
    script.onload = () => {
      window.AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
