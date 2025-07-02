import axios from 'axios';
import store from './redux/store';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
