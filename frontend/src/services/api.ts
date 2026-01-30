import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Amentoria:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config; 
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response, // Se der sucesso, apenas retorna a resposta
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@Amentoria:token');
      localStorage.removeItem('@Amentoria:user');
    }
    return Promise.reject(error); 
  }
);