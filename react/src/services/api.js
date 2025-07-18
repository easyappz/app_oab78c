import apiClient from '../utils/axiosConfig';

// Wrapping API calls with error handling
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/register', data);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/api/user/profile');
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFeed = async () => {
  try {
    const response = await apiClient.get('/api/posts/feed');
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/api/posts', postData);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await apiClient.get(`/api/search?query=${query}`);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMessages = async () => {
  try {
    const response = await apiClient.get('/api/messages');
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default apiClient;
