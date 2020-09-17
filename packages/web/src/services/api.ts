import axios from 'axios';
import storage from '../util/storage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(response => response, error => {
  if (401 === error.response.status) {
    storage.clearData();
  }
});

export default api;