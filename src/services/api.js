/**
 * api.js — LUMIÈRE API Service
 * Saari API calls ek jagah. Kisi bhi page mein import karo.
 *
 * Usage:
 *   import api from '../services/api';
 *   const products = await api.getProducts();
 */

const BASE_URL = 'http://127.0.0.1:8000/api';

const headers = (withAuth = false) => {
  const h = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (withAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

const api = {
  // ─── Products ──────────────────────────────────────────────
  getProducts: () =>
    fetch(`${BASE_URL}/products`, { headers: headers() }).then(r => r.json()),

  getProduct: (id) =>
    fetch(`${BASE_URL}/products/${id}`, { headers: headers() }).then(r => r.json()),

  // ─── Categories ────────────────────────────────────────────
  getCategories: () =>
    fetch(`${BASE_URL}/categories`, { headers: headers() }).then(r => r.json()),

  // ─── Reviews ───────────────────────────────────────────────
  getReviews: () =>
    fetch(`${BASE_URL}/reviews`, { headers: headers() }).then(r => r.json()),

  // ─── FAQs ──────────────────────────────────────────────────
  getFaqs: () =>
    fetch(`${BASE_URL}/faqs`, { headers: headers() }).then(r => r.json()),

  // ─── Pages (Policies) ──────────────────────────────────────
  getPage: (slug) =>
    fetch(`${BASE_URL}/pages/${slug}`, { headers: headers() }).then(r => {
      if (!r.ok) throw new Error('Page not found');
      return r.json();
    }),

  // ─── Site Settings ─────────────────────────────────────────
  getSettings: () =>
    fetch(`${BASE_URL}/site-settings`, { headers: headers() }).then(r => r.json()),

  // ─── Contact ───────────────────────────────────────────────
  sendContact: (data) =>
    fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // ─── Newsletter ────────────────────────────────────────────
  subscribe: (email) =>
    fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email }),
    }),

  // ─── Auth ──────────────────────────────────────────────────
  login: (email, password) =>
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  register: (data) =>
    fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getUser: () =>
    fetch(`${BASE_URL}/user`, { headers: headers(true) }).then(r => r.json()),

  updateUser: (data) =>
    fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: headers(true),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // ─── Orders ────────────────────────────────────────────────
  placeOrder: (data) =>
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getUserOrders: () =>
    fetch(`${BASE_URL}/user/orders`, { headers: headers(true) }).then(r => r.json()),

  trackOrder: (orderId) =>
    fetch(`${BASE_URL}/track/${orderId}`, { headers: headers() }).then(r => {
      if (!r.ok) throw new Error('Order not found');
      return r.json();
    }),
};

export default api;
