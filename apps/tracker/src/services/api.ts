import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach auth token
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('brandpulse-auth');
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      if (state?.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    } catch {
      // Skip
    }
  }
  return config;
});

// Response interceptor for 401 handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const stored = localStorage.getItem('brandpulse-auth');
      if (stored) {
        try {
          const { state } = JSON.parse(stored);
          if (state?.refreshToken && !error.config._retry) {
            error.config._retry = true;
            const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken: state.refreshToken,
            });
            const newState = {
              ...state,
              accessToken: res.data.data.accessToken,
              refreshToken: res.data.data.refreshToken,
            };
            localStorage.setItem('brandpulse-auth', JSON.stringify({ state: newState }));
            error.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
            return api(error.config);
          }
        } catch {
          localStorage.removeItem('brandpulse-auth');
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  },
);
