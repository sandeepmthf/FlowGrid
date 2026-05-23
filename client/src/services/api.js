import axios from 'axios';

const api = axios.create({
  baseURL: '', // Handled by Vite API proxy settings during development
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
