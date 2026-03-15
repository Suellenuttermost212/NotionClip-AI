import type { Metadata } from 'next';
import './globals.css';
import AosInit from '../components/AosInit';

export const metadata: Metadata = {
  title: 'NotionClip AI',
  description: 'AI-powered bookmarking that captures, summarizes, and structures web content into Notion.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <nav className="bg-white border-b border-[#e2e8f0] px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <img src="/android-chrome-192x192.png" alt="NotionClip AI" className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform" />
              <span className="text-lg font-bold text-[#1e3a5f]">NotionClip AI</span>
            </a>
            <div className="flex items-center gap-1">
              <a
                href="/"
                className="text-sm font-medium text-[#64748b] hover:text-[#1e3a5f] hover:bg-[#f1f5f9] px-4 py-2 rounded-lg transition-all"
              >
                Home
              </a>
              <a
                href="/history"
                className="text-sm font-medium text-[#64748b] hover:text-[#1e3a5f] hover:bg-[#f1f5f9] px-4 py-2 rounded-lg transition-all"
              >
                My Clips
              </a>
            </div>
          </div>
        </nav>
        <AosInit />
        <main>{children}</main>
      </body>
    </html>
  );
}
