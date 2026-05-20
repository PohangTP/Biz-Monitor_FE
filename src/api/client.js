const BACKEND_PORT = 8000;

const resolveBase = () => {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return `http://localhost:${BACKEND_PORT}`;
  }
  const safeHost = host.includes(':') ? `[${host}]` : host;
  return `http://${safeHost}:${BACKEND_PORT}`;
};

export const API_BASE = resolveBase();

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export const apiFetch = async (path, options = {}) => {
  const isForm = options.body instanceof FormData;
  const headers = isForm
    ? { ...(options.headers ?? {}) }
    : { 'Content-Type': 'application/json', ...(options.headers ?? {}) };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  let body = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    const msg = body?.detail || body?.message || `요청 실패 (${res.status})`;
    throw new ApiError(msg, res.status, body);
  }
  return body;
};

export const absoluteUrl = (path) =>
  path?.startsWith('http') ? path : `${API_BASE}${path ?? ''}`;
