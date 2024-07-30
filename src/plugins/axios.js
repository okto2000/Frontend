import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Base URL sekarang menggunakan proxy
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  }
});

// Interceptor untuk menambahkan Authorization header
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
