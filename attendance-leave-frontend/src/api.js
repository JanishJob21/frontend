import axios from 'axios';

const API = axios.create({
  baseURL: process.env.VITE_API_URL
});

// Add a request interceptor to add the auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;