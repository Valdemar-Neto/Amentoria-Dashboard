// Criando o contexto para geenciar se o usuario está logado e passar para todas as outras rotas
import { createContext, useContext, useState, useEffect, type ReactNode} from "react";

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

    function signIn(token: string, user: User){
        localStorage.setItem('@Amentoria:token', token);
        localStorage.setItem('@Amentoria:user', JSON.stringify(user));
        setUser(user)
    }

    function signOut(){
        localStorage.clear();
        setUser(null);
    }

    return(
        <AuthContext.Provider value ={{user, signIn, signOut, isAuthenticated:!!user, loading}}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)