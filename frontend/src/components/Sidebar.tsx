import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Sidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <aside className="w-72 bg-surface border-r border-white/5 flex flex-col h-screen transition-all duration-300">
      
      {/* 1. Header com Logo */}
      <div className="p-8 border-b border-white/5">
        <h1 className="text-4xl font-black text-white leading-tight italic tracking-tighter mb-8 drop-shadow-lg">
            Amentoria<span className="text-accent">.</span>
        </h1>
      </div>

      {/* 2. Navegação Principal */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Plataforma
        </p>

        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/simulados" icon={BookOpen} label="Simulados" />
        <NavItem to="/cronograma" icon={Calendar} label="Cronograma" />
        <NavItem to="/configuracoes" icon={Settings} label="Configurações" />
      </nav>

      {/* 3. Footer do Usuário */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/50 transition-colors group cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="text-slate-500 hover:text-red-400 transition-colors p-1"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

// Sub-componente para os links ficarem limpos no código
function NavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
          isActive
            ? 'bg-brand-600/10 text-white' // Ativo
            : 'text-slate-400 hover:text-white hover:bg-white/5' // Inativo
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Barra lateral acesa quando ativo */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          )}
          
          <Icon 
            size={20} 
            className={`transition-colors ${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-white'}`} 
          />
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
}