import axios from 'axios';

// Axios instance configuration
const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Avoid redundant notification if already handled by ProtectedRoute
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        // Dispatch custom event to notify about session expiration
        const event = new CustomEvent('sessionExpired', { detail: { message: 'Сессия истекла. Пожалуйста, войдите снова.' } });
        window.dispatchEvent(event);
      }
    } else if (error.response && error.response.data && error.response.data.message) {
      // Dispatch custom event for other API errors
      const event = new CustomEvent('apiError', { detail: { message: error.response.data.message, status: error.response.status } });
      window.dispatchEvent(event);
    } else if (error.message) {
      // Handle network or other errors
      const event = new CustomEvent('apiError', { detail: { message: 'Произошла ошибка сети. Пожалуйста, попробуйте позже.', status: 0 } });
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
