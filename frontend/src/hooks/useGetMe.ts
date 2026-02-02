import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useMe(){
    
    const [profile, setProfile] = useState<{name: string, email: string, createdAt: string} | null>(null);

    const fetchProfile = async () => {
        try{
            const response = await api.get('auth/me');
            setProfile(response.data)
        } catch (error) {
            console.log("Erro ao buscar perfil", error);
        }
    }


    useEffect(()=>{
        fetchProfile();
    }, [fetchProfile]);

    return {profile, fetchProfile}
}