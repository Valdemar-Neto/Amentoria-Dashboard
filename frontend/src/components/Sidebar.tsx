import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <aside className="w-72 bg-surface border-r border-border-subtle flex flex-col h-screen transition-all duration-300">
      
      {/* 1. Header com Logo */}
      <div className="p-8 border-b border-border-subtle">
        <h1 className="text-4xl font-black text-brand-10 leading-tight italic tracking-tighter mb-8 drop-shadow-lg">
            Amentoria<span className="text-accent">.</span>
        </h1>
      </div>

      {/* 2. Navegação Principal */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="px-4 text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">
          Plataforma
        </p>

        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/simulados" icon={BookOpen} label="Simulados" />
        <NavItem to="/cronograma" icon={Calendar} label="Cronograma" />
        <NavItem to="/configuracoes" icon={Settings} label="Configurações" />
      </nav>

      {/* 3. Toggle dark/light mode */}
      <div className="px-4 mt-auto mb-4">
        <button 
          onClick={toggleTheme} 
          className='w-full flex items-center justify-between p-4 rounded-xl bg-background border border-border-subtle hover:border-accent/50 transition-all group'
        >
            <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon size={20} className="text-brand-400" />
                ) : (
                  <Sun size={20} className="text-amber-500" />
                )}
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  Modo {theme === 'dark' ? 'Escuro' : 'Claro'}
                </span>
            </div>

            <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-brand-900' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`} />
            </div>
        </button>
      </div>

      {/* 4. Footer do Usuário */}
      <div className="p-4 border-t border-border-subtle">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-hover border border-border-subtle hover:border-accent/50 transition-colors group cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text-primary truncate">{user?.name}</p>
            <p className="text-xs text-text-secondary truncate">{user?.email}</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="text-text-secondary hover:text-danger transition-colors p-1"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
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
            size={20} 
            className={`transition-colors ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`} 
          />
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
}