import axios from 'axios'

// ── Centralized Axios instance ────────────────────────────────────────────────
// Set VITE_API_BASE_URL=https://fintrackr-kwri.onrender.com in your .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Attach Bearer token on every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fintrackr_token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

export default api

// ── Auth API ──────────────────────────────────────────────────────────────────
export const authApi = {
  register:       (data) => api.post('/api/auth/register', data),
  login:          (data) => api.post('/api/auth/login', data),
  getMe:          ()     => api.get('/api/auth/me'),
  updateMe:       (data) => api.put('/api/auth/me', data),
  changePassword: (data) => api.put('/api/auth/change-password', data),
}

// ── Transactions API ──────────────────────────────────────────────────────────
export const transactionsApi = {
  getAll: (params)     => api.get('/api/transactions', { params }),
  create: (data)       => api.post('/api/transactions', data),
  update: (id, data)   => api.put(`/api/transactions/${id}`, data),
  delete: (id)         => api.delete(`/api/transactions/${id}`),
}

// ── Categories API ────────────────────────────────────────────────────────────
export const categoriesApi = {
  getAll: (params)     => api.get('/api/categories', { params }),
  create: (data)       => api.post('/api/categories', data),
  update: (id, data)   => api.put(`/api/categories/${id}`, data),
  delete: (id)         => api.delete(`/api/categories/${id}`),
}

// ── Dashboard API ─────────────────────────────────────────────────────────────
export const dashboardApi = {
  getSummary:     (params) => api.get('/api/dashboard/summary', { params }),
  getRecent:      (params) => api.get('/api/dashboard/recent-transactions', { params }),
  getBreakdown:   (params) => api.get('/api/dashboard/category-breakdown', { params }),
  getTrend:       ()       => api.get('/api/dashboard/monthly-trend'),
  getBudgetCards: (params) => api.get('/api/dashboard/budget-cards', { params }),
}

// ── Budgets API ───────────────────────────────────────────────────────────────
export const budgetsApi = {
  getAll:      (params)   => api.get('/api/budgets', { params }),
  create:      (data)     => api.post('/api/budgets', data),
  update:      (id, data) => api.put(`/api/budgets/${id}`, data),
  delete:      (id)       => api.delete(`/api/budgets/${id}`),
  getProgress: (params)   => api.get('/api/budgets/progress', { params }),
}

// ── Savings Goals API ─────────────────────────────────────────────────────────
export const savingsApi = {
  getAll:     (params)   => api.get('/api/savings-goals', { params }),
  create:     (data)     => api.post('/api/savings-goals', data),
  update:     (id, data) => api.put(`/api/savings-goals/${id}`, data),
  delete:     (id)       => api.delete(`/api/savings-goals/${id}`),
  contribute: (id, data) => api.patch(`/api/savings-goals/${id}/contribute`, data),
}

// ── Insights API ──────────────────────────────────────────────────────────────
export const insightsApi = {
  getAll:   (params) => api.get('/api/insights', { params }),
  generate: (data)   => api.post('/api/insights/generate', data),
  markRead: (id)     => api.patch(`/api/insights/${id}/read`),
}

// ── Reports API ───────────────────────────────────────────────────────────────
export const reportsApi = {
  getAll:    ()   => api.get('/api/reports'),
  generate:  (data) => api.post('/api/reports/generate', data),
  getOne:    (id) => api.get(`/api/reports/${id}`),
  exportCsv: (id) => api.get(`/api/reports/${id}/export/csv`, { responseType: 'blob' }),
}
