import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Feedback visual de carregamento

  const { signIn } = useAuth();
  const navigate = useNavigate();


  async function handleRegister() {
    if (!name || !email || !password) {
        alert("Preencha todos os campos.");
        return;
    }

    setIsLoading(true);
    try {
        console.log("1️⃣ Enviando dados de registro...");
        await api.post('/auth/signup', { name, email, password });
        
        console.log("2️⃣ Registro OK! Tentando login automático...");
        // Adicionamos um pequeno delay para o banco de dados "respirar"
        await new Promise(resolve => setTimeout(resolve, 500));

        const loginResponse = await api.post('/auth/login', { email, password });
        
        console.log("3️⃣ Login OK! Salvando sessão...");
        signIn(loginResponse.data.accessToken, loginResponse.data.user);
        
        console.log("4️⃣ Sucesso total! Redirecionando...");
        navigate('/dashboard');

    } catch (err: any) {
        console.error("❌ Falha no degrau:", err.response?.status);
        console.error("Mensagem detalhada:", err.response?.data);

        // Se o erro for 409, significa que o passo 1 funcionou (usuário já existe)
        // mas o passo 2 falhou ou você clicou duas vezes.
        if (err.response?.status === 409) {
        alert("Este e-mail já foi cadastrado. Tente fazer login.");
        navigate('/login');
        } else {
        alert(err.response?.data?.message || "Erro inesperado no servidor.");
        }
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Lado Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-600 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6 italic">Amentoria.</h1>
          <p className="text-xl text-brand-100">
            Comece hoje a transformar seus dados em aprovação. A organização é o primeiro passo para o sucesso.
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary">Crie sua conta</h2>
            <p className="text-text-secondary mt-2">Junte-se a milhares de alunos focados.</p>
          </div>

          {/* Removido o onSubmit daqui para evitar refresh acidental */}
          <div className="mt-8 space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-text-secondary h-5 w-5" />
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-text-secondary h-5 w-5" />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-text-secondary h-5 w-5" />
                <input
                  type="password"
                  placeholder="Crie uma senha forte"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="button" // Garante que não dispare o submit nativo
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white rounded-xl font-semibold shadow-soft hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="h-5 w-5" /> Criar minha conta
                </>
              )}
            </button>
          </div>

          <p className="text-center text-text-secondary">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-brand-600 font-bold hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}