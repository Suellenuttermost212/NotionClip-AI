document.addEventListener('DOMContentLoaded', async () => {
  const saveBtn = document.getElementById('save-btn');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');
  const btnLoader = document.getElementById('btn-loader');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const pagePreview = document.getElementById('page-preview');
  const previewTitle = document.getElementById('preview-title');
  const previewUrl = document.getElementById('preview-url');
  const result = document.getElementById('result');
  const resultSuccess = document.getElementById('result-success');
  const resultError = document.getElementById('result-error');
  const resultTags = document.getElementById('result-tags');
  const resultSummary = document.getElementById('result-summary');
  const resultCategory = document.getElementById('result-category');
  const errorMsg = document.getElementById('error-msg');

  let pageData = null;

  // Run status checks and page extraction in parallel for faster popup load
  const statusCheck = (async () => {
    try {
      const [healthy, connected] = await Promise.all([checkHealth(), getNotionStatus()]);
      if (healthy) {
        statusDot.classList.add(connected ? 'connected' : 'disconnected');
        statusText.textContent = connected
          ? 'Notion connected'
          : 'Notion not connected';
      } else {
        throw new Error('Backend offline');
      }
    } catch {
      statusDot.classList.add('disconnected');
      statusText.textContent = 'Backend not reachable';
    }
  })();

  const pageExtract = (async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content/content.js'],
        });
      } catch {
        // content script might already be injected
      }

      pageData = await chrome.tabs.sendMessage(tab.id, { action: 'extractPageData' });

      previewTitle.textContent = pageData.title || 'Untitled page';
      previewUrl.textContent = pageData.url;
      pagePreview.classList.remove('hidden');
      saveBtn.disabled = false;
    } catch (err) {
      previewTitle.textContent = 'Could not read this page';
      previewUrl.textContent = 'Try refreshing the page';
      pagePreview.classList.remove('hidden');
      console.error('Failed to extract page data:', err);
    }
  })();

  await Promise.all([statusCheck, pageExtract]);

  // Save button click
  saveBtn.addEventListener('click', async () => {
    if (!pageData) return;

    // UI: show loading
    saveBtn.disabled = true;
    saveBtn.classList.add('saving');
    btnText.textContent = 'Analyzing with AI...';
    btnIcon.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    result.classList.add('hidden');
    resultSuccess.classList.add('hidden');
    resultError.classList.add('hidden');

    try {
      const response = await saveKnowledge({
        title: pageData.title,
        url: pageData.url,
        description: pageData.description,
        content: pageData.content,
      });

      // Show success
      result.classList.remove('hidden');
      resultSuccess.classList.remove('hidden');
      saveBtn.classList.remove('saving');
      saveBtn.classList.add('saved');

      // Show summary
      if (response.data?.summary) {
        resultSummary.textContent = response.data.summary;
        resultSummary.classList.remove('hidden');
      }

      // Show category
      if (response.data?.category) {
        resultCategory.textContent = response.data.category;
        resultCategory.classList.remove('hidden');
      }

      // Render tags
      resultTags.innerHTML = '';
      if (response.data?.tags) {
        response.data.tags.forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tag;
          resultTags.appendChild(span);
        });
      }

      btnIcon.innerHTML = '<path d="M5 9l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
      btnIcon.classList.remove('hidden');
      btnText.textContent = 'Saved!';
    } catch (err) {
      result.classList.remove('hidden');
      resultError.classList.remove('hidden');
      saveBtn.classList.remove('saving');
      errorMsg.textContent = err.message || 'Failed to save';
      btnText.textContent = 'Try Again';
      btnIcon.classList.remove('hidden');
      saveBtn.disabled = false;
    } finally {
      btnLoader.classList.add('hidden');
    }
  });
});
