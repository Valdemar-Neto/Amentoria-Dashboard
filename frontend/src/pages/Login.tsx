import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { LogIn, Mail, Lock } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      signIn(response.data.accessToken, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Lado Esquerdo - Branding (Esconde no Mobile) */}
      <div className="hidden lg:flex lg:w-3/5 bg-brand-600 items-center justify-center p-12 text-white">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-brand- rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-6xl font-black text-white leading-tight italic tracking-tighter mb-8">Amentoria<span className="text-brand-300">.</span></h1>
          <blockquote className="space-y-4">
            <p className="text-2xl text-brand-100 font-medium leading-relaxed ">
              Acompanhe sua evolução, analise seus simulados e domine seus estudos em <span className="text-white font-bold border-b-4 border-brand-300">um só lugar.</span>
            </p>

            <footer className='text-brand-200'>Dashboard de Alta Performance</footer>
          </blockquote>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary">Bem-vindo de volta!</h2>
            <p className="text-text-secondary mt-2">Acesse sua conta para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-text-secondary h-5 w-5" />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-text-secondary h-5 w-5" />
                <input
                  type="password"
                  placeholder="Sua senha"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold shadow-soft hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <LogIn h-5 w-5 /> Entrar no sistema
            </button>
          </form>

          <p className="text-center text-text-secondary">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-brand-600 font-bold hover:underline">
              Crie agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}