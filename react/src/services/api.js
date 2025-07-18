import apiClient from '../utils/axiosConfig';
import { useNotification } from '../contexts/NotificationContext';

// Custom hook to handle API errors globally
const useApiErrorHandler = () => {
  const { showNotification } = useNotification();
  
  const handleError = (error) => {
    if (error.response && error.response.status === 401) {
      showNotification('Сессия истекла. Пожалуйста, войдите снова.', 'error');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      showNotification('Произошла ошибка. Попробуйте позже.', 'error');
    }
    return Promise.reject(error);
  };
  return handleError;
};

// Wrapping API calls with error handling
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export const register = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/register', data);
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/api/user/profile');
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export const getFeed = async () => {
  try {
    const response = await apiClient.get('/api/posts/feed');
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/api/posts', postData);
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await apiClient.get(`/api/search?query=${query}`);
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export const getMessages = async () => {
  try {
    const response = await apiClient.get('/api/messages');
    return response;
  } catch (error) {
    const handleError = useApiErrorHandler();
    return handleError(error);
  }
};

export default apiClient;
