import axios from 'axios';
import config from './config.json';

export const api = axios.create({
  baseURL: `http://localhost:${config.BACKEND_PORT}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});
