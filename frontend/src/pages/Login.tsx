// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { api } from '../services/api';
// import { LogIn, Mail, Lock, Zap,Loader2 } from 'lucide-react';

// export function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { signIn } = useAuth();
//   const navigate = useNavigate();

//   async function handleSubmit(e: React.FormEvent) {
//     if(!email|| !password) return;
//     setIsLoading(true)
//     e.preventDefault();
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       signIn(response.data.accessToken, response.data.user);
//       navigate('/dashboard');
//     } catch (err) {
//       alert('Erro ao fazer login. Verifique suas credenciais.');
//     }
//   }

//   return (
//     <div className="min-h-screen flex bg-background font-sans selection:bg-brand-900 selection:text-brand-100">
//       {/* Lado Esquerdo - Branding (Esconde no Mobile) */}
//       <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-brand-600 items-center justify-center p-12 text-white">
//         <div className="absolute inset-0 bg-linear-to-br from-brand-900 via-background to-background z-0"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent rounded-full blur-[150px] opacity-10"></div>
//         <div className="relative z-10 max-w-xl">
//           <h1 className="text-6xl font-black text-white leading-tight italic tracking-tighter mb-8">Amentoria<span className="text-accent">.</span></h1>
//           <blockquote className="space-y-4">
//             <p className="text-2xl text-brand-300 font-light leading-relaxed mb-8">
//               Acompanhe sua <span className='text-white'>evolução</span>, analise seus <span className='text-white'>simulados</span> e domine seus <span className='text-white'>estudos</span> em <span className="text-white font-bold border-b-4 border-brand-300">um só lugar.</span>
//             </p>

//             <div className="flex gap-4">
//               <div className="glass-dark px-6 py-3 rounded-full flex items-center gap-2 text-sm text-brand-100">
//                 <Zap size={15} className='text-accent fill-current' ></Zap>
//                 <footer className='text-brand-200'>Dashboard de Alta Performance</footer>
//               </div>
//             </div>
//           </blockquote>
//         </div>
//       </div>

//       {/* Lado Direito - Formulário */}
//       <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-16 bg-surface">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold text-white tracking-tight">Login</h2>
//             <p className="text-text-secondary mt-2">Acesse sua área do aluno</p>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div className="space-y-5">
//               <div className="group">
//                 <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-1 group-focus-within:text-accent transition-colors">E-mail</label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" />
//                   <input
//                     type="email"
//                     placeholder="aluno@amentoria.com"
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-background border border-slate-700 text-white rounded-2xl focus:ring-2 focus:ring-acent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>
            
//               <div className="group">
//                   <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-1 group-focus-within:text-accent transition-colors">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" />
//                     <input
//                       type="password"
//                       placeholder="Sua senha"
//                       required
//                       className="w-full pl-12 pr-4 py-3.5 bg-background border border-slate-700 text-white rounded-2xl focus:ring-2 focus:ring-acent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
//                       value={password}
//                       onChange={e => setPassword(e.target.value)}
//                     />
//                   </div>
//               </div>
//             </div>
            

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full mt-4 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold shadow-shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
//             >
//              {isLoading ? <Loader2 className="animate-spin" /> : <> <LogIn size={20} /> Entrar </>}
//             </button>
//           </form>

//           <p className="mt-8 text-center text-slate-500 text-sm">
//             Não tem uma conta?{' '}
//             <Link to="/register" className="text-accent font-bold hover:text-accent-light transition-colors">
//               Crie agora
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { api } from '../services/api';
// import { Mail, Lock, Loader2, Zap } from 'lucide-react';

// export function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { signIn } = useAuth();
//   const navigate = useNavigate();

//   async function handleSubmit() {
//     if (!email || !password) return;
//     setIsLoading(true);
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       signIn(response.data.accessToken, response.data.user);
//       navigate('/dashboard');
//     } catch (err) {
//       alert('E-mail ou senha incorretos.');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden font-sans selection:bg-brand-500 selection:text-white">
      
//       {/* --- BACKGROUND FX (Ocupa a tela toda agora) --- */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-brand-900 via-background to-background z-0"></div>
      
//       {/* Luzes Neon de Fundo (Mais espalhadas) */}
//       <div className="absolute top-[-10%] left-[20%] w-125 h-125 bg-brand-600 rounded-full blur-[180px] opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-[-10%] right-[20%] w-125 h-125 bg-accent rounded-full blur-[180px] opacity-10"></div>
      
//       {/* Grid sutil para dar textura tech (Opcional) */}
//       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

//       {/* --- CARD CENTRAL (Glassmorphism) --- */}
//       <div className="relative z-10 w-full max-w-md p-8">
        
//         {/* Cabeçalho fora do card para dar profundidade */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
//             Amentoria<span className="text-accent">.</span>
//           </h1>
//           <p className="text-slate-400">Sua aprovação em Medicina começa aqui.</p>
//         </div>

//         {/* O Card de Vidro */}
//         <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-white/10">
          
//           <div className="space-y-5">
//             <div className="group">
//               <label className="text-xs font-bold uppercase text-slate-400 ml-1 mb-1 group-focus-within:text-accent transition-colors">E-mail</label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={18} />
//                 <input
//                   type="email"
//                   placeholder="aluno@amentoria.com"
//                   className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="group">
//               <label className="text-xs font-bold uppercase text-slate-400 ml-1 mb-1 group-focus-within:text-accent transition-colors">Senha</label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={18} />
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full mt-2 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-(--shadow-glow) hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
//             >
//               {isLoading ? <Loader2 className="animate-spin" /> : (
//                 <> 
//                   <span>Acessar Plataforma</span> 
//                   <Zap size={18} className="text-accent-light group-hover:text-white transition-colors" /> 
//                 </>
//               )}
//             </button>
//           </div>

//           <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
//             <p className="text-slate-400 text-sm">
//               Não tem acesso?{' '}
//               <Link to="/register" className="text-accent font-bold hover:text-accent-light transition-colors">
//                 Criar conta
//               </Link>
//             </p>
//           </div>
//         </div>
        
//         {/* Footerzinho discreto */}
//         <p className="text-center text-slate-600 text-xs mt-8">
//           &copy; 2026 Valdemar. Todos os direitos reservados.
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { LogIn, Mail, Lock, Loader2, Zap } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      signIn(response.data.accessToken, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert('E-mail ou senha incorretos.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden font-sans selection:bg-brand-500 selection:text-white">
      
      {/* --- BACKGROUND FX (Cenário Imersivo) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-brand-900 via-background to-background z-0"></div>
      
      {/* Luzes Neon (Posicionadas estrategicamente atrás dos elementos) */}
      <div className="absolute top-[10%] left-[10%] w-150 h-150 bg-brand-600 rounded-full blur-[300px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[10%] w-125 h-125 bg-accent rounded-full blur-[180px] opacity-10"></div>
      
      {/* Textura Granulada (Noise) para acabamento premium */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

      {/* --- CONTAINER PRINCIPAL (Grid Lado a Lado) --- */}
      <div className="relative z-10 w-full max-w-6xl p-6 lg:p-12 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* === LADO ESQUERDO: Sua Frase de Efeito === */}
        <div className="hidden lg:block relative z-10 max-w-xl animate-fade-in-left">
          <h1 className="text-7xl font-black text-white leading-tight italic tracking-tighter mb-8 drop-shadow-lg">
            Amentoria<span className="text-accent">.</span>
          </h1>
          
          <blockquote className="space-y-6">
            <p className="text-2xl text-brand-200 font-light leading-relaxed">
              Acompanhe sua <span className='text-white font-semibold'>evolução</span>, analise seus <span className='text-white font-semibold'>simulados</span> e domine seus <span className='text-white font-semibold'>estudos</span> em <span className="text-white font-bold border-b-4 border-brand-500 pb-1">um só lugar.</span>
            </p>

            <div className="flex gap-4 pt-4">
              <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 text-sm text-brand-100 border border-brand-500/30 shadow-(--shadow-glow)">
                <Zap size={18} className='text-accent fill-current' />
                <span className='tracking-wide font-medium text-brand-50'>Dashboard de Alta Performance</span>
              </div>
            </div>
          </blockquote>
        </div>

        {/* === LADO DIREITO: O Card de Vidro (Login) === */}
        <div className="w-full max-w-md mx-auto">

          <div className="text-center mb-8 lg:hidden">
              <div className="text-center mb-8">
                  <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Amentoria<span className="text-accent">.</span></h1>
                  <p className="text-slate-400">Sua aprovação em <span className='text-white font-semibold'>Medicina</span> começa aqui.</p>
              </div>
          </div>
          <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
            
            {/* Efeito de brilho ao passar o mouse no card */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Bem-vindo</h2>
              <p className="text-slate-400 text-sm mt-1">Insira suas credenciais para acessar.</p>
            </div>

            <div className="space-y-5 relative z-10">
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

              <div className="group/input">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-1 group-focus-within/input:text-accent transition-colors">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-background/60 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full mt-4 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-(--shadow-glow) hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  <> 
                    <span>Acessar Plataforma</span> 
                    <LogIn size={18} /> 
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm">
                Não tem acesso?{' '}
                <Link to="/register" className="text-accent font-bold hover:text-accent-light transition-colors">
                  Criar Conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}