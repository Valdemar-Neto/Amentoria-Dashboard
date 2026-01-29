import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
})

// configurando objeto do axios para lidar com erros de autenticacao
api.interceptors.response.use((config) => {

    const token = localStorage.getItem('@Amentoria:token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    throw config;
})