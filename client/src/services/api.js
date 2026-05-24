import axios from 'axios';

// Use Vite environment variable for the API base URL in production.
// Set VITE_API_URL in Vercel to the full backend URL (for example: https://your-backend.onrender.com/api)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // fallback to '' for local dev (Vite proxy handles /api)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add authorization headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
