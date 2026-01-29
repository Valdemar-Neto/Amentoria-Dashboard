// Criando o contexto para geenciar se o usuario está logado e passar para todas as outras rotas
import React, { createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { api } from "../services/api";

interface User{
    id: string;
    name: string;
    email: string;
}

interface AuthContextData{
    user: User | null;
    signIn: (token: string, user: User) => void;
    signOut: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storagedToken = localStorage.getItem('@Amentoria:token');
        const storageUser = localStorage.getItem('@Amentoria:user');

        if(storagedToken && storageUser){
            setUser(JSON.parse(storageUser));
        }
        
        setLoading(false);
    },[]);

    
}