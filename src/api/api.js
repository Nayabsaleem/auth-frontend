import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function register(payload){ return api.post('/auth/register', payload); }
export async function login(payload){ return api.post('/auth/login', payload); }
export async function getProfile(userId){ return api.get(`/profiles/${userId}`); }
export async function createOrUpdateProfile(data){ 
  if (data._id) return api.put(`/profiles/${data._id}`, data);
  return api.post('/profiles', data);
}
export default api;
