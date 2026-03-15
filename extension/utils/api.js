const API_BASE = 'http://localhost:3000/api';

async function saveKnowledge(data) {
  const response = await fetch(`${API_BASE}/save-knowledge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Server error: ${response.status}`);
  }

  return response.json();
}

async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  return response.ok;
}

async function getNotionStatus() {
  const response = await fetch(`${API_BASE}/auth/notion/status`);
  const data = await response.json();
  return data.connected;
}
