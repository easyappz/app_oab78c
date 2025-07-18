import axios from 'axios';

// Настройка Axios для добавления токена в заголовки запросов
const axiosInstance = axios.create({
  baseURL: '/',
});

axiosInstance.interceptors.request.use(
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

export default axiosInstance;
