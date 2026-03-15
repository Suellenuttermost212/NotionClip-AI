'use client';

import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000/api';

interface KnowledgeEntry {
  id: string;
  title: string;
  url: string;
  summary: string;
  tags: string[];
  category: string;
  createdAt: string;
  notionPageId: string | null;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Article: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Tutorial: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Documentation: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Repository: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Research: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  Other: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] || categoryColors.Other;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Delete this clip? It will also be removed from Notion.')) return;
    setDeleting(id);
    try {
      await fetch(`${API_BASE}/knowledge/${id}`, { method: 'DELETE' });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert('Failed to delete. Try again.');
    } finally {
      setDeleting(null);
    }
  }

  useEffect(() => {
    fetch(`${API_BASE}/history`)
      .then((res) => res.json())
      .then((data) => setEntries(data.data || []))
      .catch(() => setError('Could not load history. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 4h12v12H4z" stroke="white" strokeWidth="1.5" rx="2" fill="none" />
              <path d="M7 8h6M7 11h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">My Clips</h1>
            <p className="text-xs text-[#94a3b8]">
              {!loading && !error && `${entries.length} saved page${entries.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </div>

      {/* Skeleton Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden animate-pulse">
              <div className="p-5 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-20 bg-[#f1f5f9] rounded-full"></div>
                  <div className="h-4 w-16 bg-[#f1f5f9] rounded"></div>
                </div>
                <div className="h-5 w-full bg-[#f1f5f9] rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-[#f1f5f9] rounded mb-3"></div>
                <div className="h-4 w-32 bg-[#f1f5f9] rounded mb-3"></div>
              </div>
              <div className="px-5 mb-4">
                <div className="h-4 w-full bg-[#f1f5f9] rounded mb-2"></div>
                <div className="h-4 w-full bg-[#f1f5f9] rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-[#f1f5f9] rounded"></div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-[#f1f5f9] rounded-full"></div>
                  <div className="h-6 w-20 bg-[#f1f5f9] rounded-full"></div>
                  <div className="h-6 w-14 bg-[#f1f5f9] rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#ef4444" strokeWidth="1.5" fill="none" />
              <path d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-800 mb-1">Connection Error</h3>
            <p className="text-red-600 text-xs">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && entries.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-[#f1f5f9] rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M6 8a3 3 0 013-3h18a3 3 0 013 3v20a3 3 0 01-3 3H9a3 3 0 01-3-3V8z" stroke="#94a3b8" strokeWidth="2" fill="none" />
              <path d="M12 14h12M12 19h8" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">No clips yet</h3>
          <p className="text-[#94a3b8] text-sm mb-6 max-w-sm mx-auto">
            Use the NotionClip AI browser extension to save your first webpage. It&apos;ll appear here!
          </p>
          <div className="inline-flex items-center gap-2 bg-[#f1f5f9] text-[#64748b] text-xs px-4 py-2 rounded-xl">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Click the extension icon on any webpage
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !error && entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {entries.map((entry, index) => {
            const catStyle = getCategoryStyle(entry.category);
            return (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#1e3a5f]/20 hover:shadow-xl hover:shadow-[#1e3a5f]/5 transition-all group overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Card Header */}
                <div className="p-5 pb-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                      {entry.category}
                    </span>
                    <time className="text-xs text-[#94a3b8] whitespace-nowrap">
                      {formatDate(entry.createdAt)}
                    </time>
                  </div>

                  <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1.5 line-clamp-2 leading-snug group-hover:text-[#2d5a8e] transition-colors">
                    {entry.title}
                  </h3>

                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-[#4a9eff] transition-colors mb-3"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M5 1H2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V7M7 1h4v4M5 7L11 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {getDomain(entry.url)}
                  </a>
                </div>

                {/* Summary */}
                {entry.summary && (
                  <div className="px-5 mb-4">
                    <p className="text-xs text-[#64748b] leading-relaxed line-clamp-3">
                      {entry.summary}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#1e3a5f] font-medium hover:bg-[#1e3a5f] hover:text-white transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                      {entry.tags.length > 4 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#94a3b8]">
                          +{entry.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Footer */}
                <div className="border-t border-[#f1f5f9] px-5 py-3 flex items-center justify-between">
                  {entry.notionPageId ? (
                    <a
                      href={`https://notion.so/${entry.notionPageId.replace(/-/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#1e3a5f] transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3h8v8H3z" stroke="currentColor" strokeWidth="1.2" rx="1.5" fill="none" />
                        <path d="M5.5 6h3M5.5 8h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      Open in Notion
                    </a>
                  ) : <span />}
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deleting === entry.id}
                    className="inline-flex items-center gap-1 text-xs text-[#94a3b8] hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    {deleting === entry.id ? (
                      <span className="w-3 h-3 border border-red-300 border-t-red-500 rounded-full animate-spin" />
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2 4h10M5 4V3a1 1 0 011-1h2a1 1 0 011 1v1M11 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {deleting === entry.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
