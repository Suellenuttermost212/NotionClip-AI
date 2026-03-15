export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8e] to-[#1e3a5f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div data-aos="fade-down" data-aos-delay="0">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium mb-8 border border-white/20">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
              AI-Powered Browser Extension
            </div>
          </div>

          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Clip Smarter,
            <br />
            <span className="text-[#4a9eff]">Not Harder</span>
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-9 leading-relaxed">
            Save any webpage to Notion with one click. Our AI automatically summarizes content,
            extracts key insights, and organizes everything for you.
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/history"
              className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] text-sm font-semibold px-7 py-3 rounded-xl hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              View My Clips
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center gap-2 text-white/80 text-sm font-medium px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all"
            >
              Learn More
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">How It Works</h2>
          <p className="text-[#64748b] text-sm">Three simple steps to organize your web knowledge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Step 1 */}
          <div data-aos="fade-up" data-aos-delay="0" className="relative bg-white rounded-2xl p-7 border border-[#e2e8f0] hover:border-[#1e3a5f]/30 hover:shadow-xl hover:shadow-[#1e3a5f]/5 transition-all group">
            <div className="absolute -top-3.5 left-7 bg-[#1e3a5f] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <div className="w-12 h-12 bg-[#eef2ff] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <path d="M5 8a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" stroke="#1e3a5f" strokeWidth="1.8" fill="none" />
                <path d="M9 12h10M9 16h6" stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="22" cy="8" r="4" fill="#4a9eff" />
                <path d="M20.5 8h3M22 6.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#1e3a5f] mb-1.5">Click the Extension</h3>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Browse any webpage and click the NotionClip AI icon in your toolbar. That&apos;s it — one click to start.
            </p>
          </div>

          {/* Step 2 */}
          <div data-aos="fade-up" data-aos-delay="100" className="relative bg-white rounded-2xl p-7 border border-[#e2e8f0] hover:border-[#1e3a5f]/30 hover:shadow-xl hover:shadow-[#1e3a5f]/5 transition-all group">
            <div className="absolute -top-3.5 left-7 bg-[#1e3a5f] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <div className="w-12 h-12 bg-[#eef2ff] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="4" width="20" height="20" rx="4" stroke="#1e3a5f" strokeWidth="1.8" fill="none" />
                <path d="M9 10l3 3-3 3M14 17h5" stroke="#4a9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#1e3a5f] mb-1.5">AI Analyzes Content</h3>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Gemini AI reads the page and extracts a summary, key insights, tags, and action steps automatically.
            </p>
          </div>

          {/* Step 3 */}
          <div data-aos="fade-up" data-aos-delay="200" className="relative bg-white rounded-2xl p-7 border border-[#e2e8f0] hover:border-[#1e3a5f]/30 hover:shadow-xl hover:shadow-[#1e3a5f]/5 transition-all group">
            <div className="absolute -top-3.5 left-7 bg-[#1e3a5f] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <div className="w-12 h-12 bg-[#eef2ff] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <path d="M6 6h16v16H6z" stroke="#1e3a5f" strokeWidth="1.8" fill="none" rx="2" />
                <path d="M10 10h8M10 14h5" stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="21" cy="19" r="5" fill="#22c55e" />
                <path d="M19 19l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#1e3a5f] mb-1.5">Saved to Notion</h3>
            <p className="text-[#64748b] text-sm leading-relaxed">
              A beautifully formatted page is created in your Notion database — organized, tagged, and ready.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Why NotionClip AI?</h2>
            <p className="text-[#64748b] text-sm">Everything you need to build your personal knowledge base</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div data-aos="fade-right" data-aos-delay="0" className="flex gap-4 p-5 rounded-2xl border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <path d="M11 3v16M3 11h16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">One-Click Saving</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  No copy-pasting, no manual formatting. Click once and the entire page is captured, processed, and saved to your Notion workspace instantly.
                </p>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="0" className="flex gap-4 p-5 rounded-2xl border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.8" fill="none" />
                  <path d="M11 7v4l3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">Save Hours of Work</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  Stop spending time manually organizing bookmarks. AI does the heavy lifting — summarizing articles, extracting key points, and categorizing content for you.
                </p>
              </div>
            </div>

            <div data-aos="fade-right" data-aos-delay="100" className="flex gap-4 p-5 rounded-2xl border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <path d="M4 6h14M4 11h14M4 16h8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">AI-Powered Summaries</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  Every saved page gets an intelligent summary, key insights, notable quotes, and actionable next steps — all generated by Gemini AI in seconds.
                </p>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="100" className="flex gap-4 p-5 rounded-2xl border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <path d="M3 7l4-4 4 4M7 3v12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 15l-4 4-4-4M15 19V7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">Auto-Categorized & Tagged</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  Content is automatically categorized (Article, Tutorial, Documentation, Research) and tagged with relevant topics. Find anything instantly.
                </p>
              </div>
            </div>

            <div data-aos="fade-right" data-aos-delay="200" className="flex gap-4 p-5 rounded-2xl border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="3" width="16" height="16" rx="3" stroke="white" strokeWidth="1.8" fill="none" />
                  <path d="M8 8h6M8 11h6M8 14h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">Beautiful Notion Pages</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  Each clip creates a structured Notion page with headings, callouts, and organized sections — not just a plain link dump.
                </p>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="200" className="flex gap-4 p-5 rounded-2xl border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <path d="M12 3L3 8v6l9 5 9-5V8l-9-5z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
                  <path d="M3 8l9 5 9-5" stroke="white" strokeWidth="1.5" />
                  <path d="M12 13v6" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">Works on Any Website</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  Articles, tutorials, documentation, GitHub repos, research papers — NotionClip AI handles any type of web content effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div data-aos="zoom-in" className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-2xl p-10 text-center text-white">
          <h2 className="text-xl font-bold mb-6">Built for Productivity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div data-aos="fade-up" data-aos-delay="0">
              <div className="text-2xl font-extrabold text-[#4a9eff]">1-Click</div>
              <div className="text-xs text-white/60 mt-1">To Save Any Page</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="text-2xl font-extrabold text-[#4a9eff]">5 sec</div>
              <div className="text-xs text-white/60 mt-1">AI Processing Time</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="text-2xl font-extrabold text-[#4a9eff]">7+</div>
              <div className="text-xs text-white/60 mt-1">Smart Tags Per Page</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="text-2xl font-extrabold text-[#4a9eff]">100%</div>
              <div className="text-xs text-white/60 mt-1">Notion Integration</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 data-aos="fade-up" className="text-2xl font-bold text-[#1e3a5f] mb-3">Ready to Clip Smarter?</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-[#64748b] mb-7 text-sm">
            Install the Chrome extension and start building your AI-powered knowledge base in Notion.
          </p>
          <a
            data-aos="fade-up" data-aos-delay="200"
            href="/history"
            className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white text-sm font-semibold px-7 py-3 rounded-xl hover:bg-[#2d5a8e] hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Get Started Now
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/android-chrome-192x192.png" alt="NotionClip AI" className="w-5 h-5 rounded" />
            <span className="text-sm font-semibold text-[#1e3a5f]">NotionClip AI</span>
          </div>
          <p className="text-xs text-[#94a3b8]">AI-powered bookmarking for Notion</p>
        </div>
      </footer>
    </div>
  );
}
