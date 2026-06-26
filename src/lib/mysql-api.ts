/**
 * ═══════════════════════════════════════════════════════════
 *   ربط الموقع الأمامي (React) مع خادم MySQL
 * ═══════════════════════════════════════════════════════════
 *
 *  هذا الملف يستبدل store.ts عند الرفع على خادم حقيقي
 *  يقوم بالاتصال بـ API الخادم (Node.js + MySQL)
 *
 *  للاستخدام:
 *  1. أنشئ ملف .env في مجلد المشروع:
 *     VITE_API_URL=http://localhost:3000
 *  2. استبدل استدعاءات getStore() و actions بهذا الملف
 */

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000';

// ──── مساعد الطلبات ───
async function api(endpoint: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem('royal_token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const res = await fetch(`${API_URL}/api${endpoint}`, { ...options, headers });
  return res.json();
}

// ──── تسجيل الدخول ───
export async function login(username: string, password: string) {
  const data = await api('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  if (data.token) {
    sessionStorage.setItem('royal_token', data.token);
  }
  return data;
}

export function logout() {
  sessionStorage.removeItem('royal_token');
}

export function isLoggedIn() {
  return !!sessionStorage.getItem('royal_token');
}

// ──── المنتجات ───
export const products = {
  getAll: (params?: Record<string, string>) => {
    const qs = new URLSearchParams(params || {}).toString();
    return api(`/products${qs ? '?' + qs : ''}`);
  },
  getOne: (id: string) => api(`/products/${id}`),
  create: (data: any) => api('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => api(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => api(`/products/${id}`, { method: 'DELETE' }),
};

// ─── الوكلاء ────
export const agents = {
  getAll: (governorate?: string) => {
    const qs = governorate ? `?governorate=${governorate}` : '';
    return api(`/agents${qs}`);
  },
  create: (data: any) => api('/agents', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => api(`/agents/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => api(`/agents/${id}`, { method: 'DELETE' }),
};

// ──── البنرات ───
export const banners = {
  getAll: () => api('/banners'),
  create: (data: any) => api('/banners', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => api(`/banners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => api(`/banners/${id}`, { method: 'DELETE' }),
};

// ──── الرسائل ────
export const messages = {
  getAll: () => api('/messages'),
  create: (data: any) => api('/messages', { method: 'POST', body: JSON.stringify(data) }),
  markRead: (id: string, read: boolean) => api(`/messages/${id}/read`, { method: 'PUT', body: JSON.stringify({ read }) }),
  delete: (id: string) => api(`/messages/${id}`, { method: 'DELETE' }),
};

// ──── الإعدادات ────
export const settings = {
  getAll: () => api('/settings'),
  update: (key: string, value: any) => api(`/settings/${key}`, { method: 'PUT', body: JSON.stringify({ value }) }),
};

// ──── الإحصائيات ───
export const stats = {
  getAll: () => api('/stats'),
};

// ─── رفع الصور ────
export async function uploadImage(file: File): Promise<string> {
  const token = sessionStorage.getItem('royal_token');
  const formData = new FormData();
  formData.append('image', file);
  
  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  return `${API_URL}${data.url}`;
}

// ──── Realtime (Polling كل 5 ثوانٍ) ───
export function setupRealtime(callback: () => void) {
  const interval = setInterval(callback, 5000);
  return () => clearInterval(interval);
}
