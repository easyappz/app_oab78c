import apiClient from '../utils/axiosConfig';


export const login = (credentials) => apiClient.post('/api/auth/login', credentials);
export const register = (data) => apiClient.post('/api/auth/register', data);
export const getProfile = () => apiClient.get('/api/user/profile');
export const getFeed = () => apiClient.get('/api/posts/feed');
export const createPost = (postData) => apiClient.post('/api/posts', postData);
export const searchUsers = (query) => apiClient.get(`/api/search?query=${query}`);
export const getMessages = () => apiClient.get('/api/messages');

export default apiClient;
