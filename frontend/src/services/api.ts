import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// ✅ INTERCEPTOR DE REQUISIÇÃO (Envia o token ANTES de bater no servidor)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Amentoria:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config; // IMPORTANTE: Sempre retornar o config
}, (error) => {
  return Promise.reject(error);
});

// ✅ INTERCEPTOR DE RESPOSTA (Trata erros globais)
api.interceptors.response.use(
  (response) => response, // Se der sucesso, apenas retorna a resposta
  (error) => {
    // Se o servidor retornar 401 (Não autorizado), podemos deslogar o user
    if (error.response?.status === 401) {
      localStorage.removeItem('@Amentoria:token');
      localStorage.removeItem('@Amentoria:user');
      // window.location.href = '/login'; // Opcional: redireciona forçado
    }
    return Promise.reject(error); // IMPORTANTE: Passa o erro para o catch do componente
  }
);