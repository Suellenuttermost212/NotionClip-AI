// Content script — extracts page data when requested by the popup/background

function extractPageData() {
  const title = document.title || '';
  const url = window.location.href;

  // Get meta description
  const metaDesc =
    document.querySelector('meta[name="description"]')?.content ||
    document.querySelector('meta[property="og:description"]')?.content ||
    '';

  // Extract main content — try common article selectors, fall back to body
  const selectors = [
    'article',
    '[role="main"]',
    'main',
    '.post-content',
    '.article-content',
    '.entry-content',
    '#content',
    '.markdown-body', // GitHub
    '.readme',        // GitHub README
  ];

  let contentElement = null;
  for (const sel of selectors) {
    contentElement = document.querySelector(sel);
    if (contentElement) break;
  }

  if (!contentElement) {
    contentElement = document.body;
  }

  // Clean the text: remove scripts, styles, nav, footer
  const clone = contentElement.cloneNode(true);
  clone.querySelectorAll('script, style, nav, footer, header, aside, .sidebar, .comments').forEach(el => el.remove());

  const content = clone.innerText
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 15000); // Limit content size

  return { title, url, description: metaDesc, content };
}

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractPageData') {
    const data = extractPageData();
    sendResponse(data);
  }
  return true; // keep channel open for async response
});
