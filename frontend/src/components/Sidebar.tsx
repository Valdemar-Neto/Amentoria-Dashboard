// import { NavLink, useNavigate } from 'react-router-dom';
// import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, User, Sun, Moon, GraduationCap } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useTheme } from '../contexts/ThemeContext';

// export function Sidebar() {
//   const { user, signOut } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   function handleSignOut() {
//     signOut();
//     navigate('/login');
//   }

//   return (
//     <aside className="w-72 bg-surface border-r border-border-subtle flex flex-col h-screen transition-all duration-300">
      
//       {/* 1. Header com Logo */}
//       <div className="p-8 border-b border-border-subtle">
//         <h1 className="text-4xl font-black text-brand-10 leading-tight italic tracking-tighter mb-8 drop-shadow-lg">
//             Amentoria<span className="text-accent">.</span>
//         </h1>
//       </div>

//       {/* 2. Navegação Principal */}
//       <nav className="flex-1 px-4 py-8 space-y-2">
//         <p className="px-4 text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">
//           Plataforma
//         </p>

//         <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
//         <NavItem to="/simulados" icon={BookOpen} label="Simulados" />
//         <NavItem to="/materiais" icon={GraduationCap} label="Materiais" />
//         <NavItem to="/cronograma" icon={Calendar} label="Cronograma" />
//         <NavItem to="/configuracoes" icon={Settings} label="Configurações" />
//       </nav>

//       {/* 3. Toggle dark/light mode */}
//       <div className="px-4 mt-auto mb-4">
//         <button 
//           onClick={toggleTheme} 
//           className='w-full flex items-center justify-between p-4 rounded-xl bg-background border border-border-subtle hover:border-accent/50 transition-all group'
//         >
//             <div className="flex items-center gap-3">
//                 {theme === 'dark' ? (
//                   <Moon size={20} className="text-brand-400" />
//                 ) : (
//                   <Sun size={20} className="text-amber-500" />
//                 )}
//                 <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
//                   Modo {theme === 'dark' ? 'Escuro' : 'Claro'}
//                 </span>
//             </div>

//             <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-brand-900' : 'bg-slate-300'}`}>
//                 <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`} />
//             </div>
//         </button>
//       </div>

//       {/* 4. Footer do Usuário */}
//       <div className="p-4 border-t border-border-subtle">
//         <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-hover border border-border-subtle hover:border-accent/50 transition-colors group cursor-pointer">
//           <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
//             {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-bold text-text-primary truncate">{user?.name}</p>
//             <p className="text-xs text-text-secondary truncate">{user?.email}</p>
//           </div>
//           <button 
//             onClick={handleSignOut}
//             className="text-text-secondary hover:text-danger transition-colors p-1"
//             title="Sair"
//           >
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function NavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
//           isActive
//             ? 'bg-brand-600/10 text-brand-600 dark:text-white' 
//             : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover' 
//         }`
//       }
//     >
//       {({ isActive }) => (
//         <>
//           {isActive && (
//             <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
//           )}
          
//           <Icon 
//             size={20} 
//             className={`transition-colors ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`} 
//           />
//           <span className="font-medium">{label}</span>
//         </>
//       )}
//     </NavLink>
//   );
// }


import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, User, Sun, Moon, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Estado para controlar se está colapsada ou não
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <aside 
      className={`
        relative bg-surface border-r border-border-subtle flex flex-col h-screen 
        transition-all duration-300 ease-in-out z-50
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}
    >
      
      {/* BOTÃO TOGGLE (FLUTUANTE) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-surface border border-border-subtle text-text-secondary hover:text-accent p-1.5 rounded-full shadow-lg hover:scale-110 transition-all z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* 1. Header com Logo */}
      <div className={`p-6 border-b border-border-subtle flex items-center ${isCollapsed ? 'justify-center' : ''} transition-all`}>
        {isCollapsed ? (
           // Logo Pequena (Apenas o Ícone/Inicial)
           <h1 className="text-3xl font-black text-brand-10 italic tracking-tighter drop-shadow-lg animate-fade-in">
             A<span className="text-accent">.</span>
           </h1>
        ) : (
           // Logo Completa
           <h1 className="text-4xl font-black text-brand-10 leading-tight italic tracking-tighter drop-shadow-lg whitespace-nowrap overflow-hidden animate-fade-in">
             Amentoria<span className="text-accent">.</span>
           </h1>
        )}
      </div>

      {/* 2. Navegação Principal */}
      <nav className="flex-1 px-3 py-8 space-y-2 overflow-x-hidden">
        {!isCollapsed && (
          <p className="px-4 text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 animate-fade-in">
            Plataforma
          </p>
        )}

        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
        <NavItem to="/simulados" icon={BookOpen} label="Simulados" isCollapsed={isCollapsed} />
        <NavItem to="/materiais" icon={GraduationCap} label="Materiais" isCollapsed={isCollapsed} />
        <NavItem to="/cronograma" icon={Calendar} label="Cronograma" isCollapsed={isCollapsed} />
        <NavItem to="/configuracoes" icon={Settings} label="Configurações" isCollapsed={isCollapsed} />
      </nav>

      {/* 3. Toggle dark/light mode */}
      <div className="px-3 mt-auto mb-4">
        <button 
          onClick={toggleTheme} 
          className={`
            w-full flex items-center p-3 rounded-xl bg-background border border-border-subtle hover:border-accent/50 transition-all group
            ${isCollapsed ? 'justify-center' : 'justify-between'}
          `}
          title={isCollapsed ? `Modo ${theme === 'dark' ? 'Escuro' : 'Claro'}` : ''}
        >
            <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon size={20} className="text-brand-400 shrink-0" />
                ) : (
                  <Sun size={20} className="text-amber-500 shrink-0" />
                )}
                
                {/* Texto some se colapsado */}
                {!isCollapsed && (
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
                    Modo {theme === 'dark' ? 'Escuro' : 'Claro'}
                  </span>
                )}
            </div>

            {/* Toggle Switch (Some se colapsado para economizar espaço) */}
            {!isCollapsed && (
              <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-brand-900' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`} />
              </div>
            )}
        </button>
      </div>

      {/* 4. Footer do Usuário */}
      <div className="p-4 border-t border-border-subtle overflow-hidden">
        <div className={`
            flex items-center rounded-xl bg-bg-hover border border-border-subtle hover:border-accent/50 transition-all group cursor-pointer
            ${isCollapsed ? 'justify-center p-2' : 'gap-3 p-3'}
        `}>
          
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-brand-600/20">
            {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
          </div>

          {/* Info do Usuário (Texto) */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-bold text-text-primary truncate">{user?.name}</p>
              <p className="text-xs text-text-secondary truncate max-w-30">{user?.email}</p>
            </div>
          )}

          {/* Botão Logout */}
          {!isCollapsed ? (
            <button 
              onClick={handleSignOut}
              className="text-text-secondary hover:text-red-500 transition-colors p-1"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          ) : (
             // Se colapsado, o clique no container inteiro pode fazer logout ou mantemos sem ação
             // Opção: Transformar o container em logout ou adicionar um tooltip.
             // Vamos deixar simples: Se colapsado, não mostra o botão de logout explícito para não poluir, 
             // mas o usuário pode expandir para sair.
             null
          )}
        </div>
        
        {/* Botão de Logout extra para quando está colapsado (opcional, abaixo do avatar) */}
        {isCollapsed && (
             <button 
             onClick={handleSignOut}
             className="w-full mt-2 flex justify-center text-text-secondary hover:text-red-500 transition-colors p-2"
             title="Sair"
           >
             <LogOut size={18} />
           </button>
        )}
      </div>
    </aside>
  );
}

// Componente NavItem Ajustado
function NavItem({ to, icon: Icon, label, isCollapsed }: { to: string; icon: any; label: string; isCollapsed: boolean }) {
  return (
    <NavLink
      to={to}
      title={isCollapsed ? label : ''} // Tooltip nativo quando colapsado
      className={({ isActive }) =>
        `flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
          isActive
            ? 'bg-brand-600/10 text-brand-600 dark:text-white' 
            : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover' 
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          )}
          
          <Icon 
            size={22} 
            className={`transition-colors shrink-0 ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`} 
          />
          
          {/* Texto com animação de opacidade/width para sumir suavemente */}
          <span className={`
            font-medium whitespace-nowrap transition-all duration-300 overflow-hidden
            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
          `}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}