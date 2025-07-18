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
      // Redirect to login page only if not already on login or register page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
        // Dispatch custom event to notify about session expiration
        const event = new CustomEvent('sessionExpired', { detail: { message: 'Сессия истекла. Пожалуйста, войдите снова.' } });
        window.dispatchEvent(event);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
