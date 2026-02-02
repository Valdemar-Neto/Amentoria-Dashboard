import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Mail, Lock, User, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleRegister() {
    if (!name || !email || !password) {
      toast.warning('Preencha todos os campos para continuar.');
      return;
    }


    if(password.length<6){
        toast.info('A senha precisa ter pelo menos 6 caracteres.');
    }

    setIsLoading(true);

    const toastId = toast.loading('Criando sua conta...');

    try {
      await api.post('/auth/signup', { name, email, password });
      toast.success('Conta criada com sucesso!', { id: toastId })
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const loginResponse = await api.post('/auth/login', { email, password });
      
      signIn(loginResponse.data.accessToken, loginResponse.data.user);
      navigate('/dashboard');

    } catch (err: any) {
      toast.dismiss(toastId);
      if (err.response?.status === 409) {
        toast.error('Este e-mail já está em uso', {description: 'Tente fazer login ou recuperar a senha.'}),
        navigate('/login');
      } else {
        toast.error('Erro ao criar conta.', {description:err.response?.data?.message || 'Tente novamente mais tarde.', })
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden font-sans selection:bg-brand-500 selection:text-white">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-brand-900 via-background to-background z-0"></div>
      
      <div className="absolute bottom-[10%] left-[5%] w-150 h-150 bg-brand-600 rounded-full blur-[200px] opacity-10 animate-pulse"></div>
      <div className="absolute top-[10%] right-[5%] w-125 h-125 bg-accent rounded-full blur-[180px] opacity-10"></div>
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

      {/* div principal */}
      <div className="relative z-10 w-full max-w-6xl p-6 lg:p-12 grid lg:grid-cols-2 gap-16 items-center">
        
        {/*lado esquerdo*/}
        <div className="hidden lg:block relative z-10 max-w-xl animate-fade-in-right">
          <h1 className="text-7xl font-black text-white leading-tight italic tracking-tighter mb-8 drop-shadow-lg">
            Amentoria<span className="text-accent">.</span>
          </h1>
          
          <blockquote className="space-y-8">
            <p className="text-3xl text-brand-100 font-light leading-snug">
              "Sua evolução não é sorte, é <span className="text-white font-bold border-b-4 border-accent pb-1">consistência.</span>"
            </p>

            {/* vantagens*/}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-2 rounded-lg bg-brand-500/20 text-accent border border-brand-500/30">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-lg">Cronograma inteligente e adaptável</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-2 rounded-lg bg-brand-500/20 text-accent border border-brand-500/30">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-lg">Análise de dados da sua performance</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-2 rounded-lg bg-brand-500/20 text-accent border border-brand-500/30">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-lg">Mentoria com quem já foi aprovado</span>
              </div>
            </div>
          </blockquote>
        </div>

        {/* lado direito*/}
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8 lg:hidden">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Amentoria<span className="text-accent">.</span></h1>
                    <p className="text-slate-400">Sua aprovação em <span className='text-white font-semibold'>Medicina</span> começa aqui.</p>
                </div>
            </div>
          <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">

          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>            
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Comece agora</h2>
              <p className="text-slate-400 text-sm mt-1">Junte-se a milhares de alunos aprovados.</p>
            </div>

            <div className="space-y-5 relative z-10">
              
              {/* Nome */}
              <div className="group/input">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-1 group-focus-within/input:text-accent transition-colors">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Ex: João Valldir"
                    className="w-full pl-12 pr-4 py-3.5 bg-background/60 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              {/*Email */}
              <div className="group/input">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-1 group-focus-within/input:text-accent transition-colors">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="aluno@amentoria.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-background/60 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="group/input">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-1 group-focus-within/input:text-accent transition-colors">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="Crie uma senha forte"
                    className="w-full pl-12 pr-4 py-3.5 bg-background/60 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full mt-4 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-(--shadow-glow) hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  <> 
                    <span>Criar Minha Conta</span> 
                    <ArrowRight size={18} /> 
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-accent font-bold hover:text-accent-light transition-colors">
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}