import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Calendar, Settings, 
  LogOut, User, Sun, Moon, GraduationCap, 
  ChevronLeft, ChevronRight, Menu, X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <>
      {/* menu tres listras no mobile */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-60 bg-surface border border-border-subtle p-2 rounded-lg text-text-primary shadow-md active:scale-95 transition-transform"
      >
        <Menu size={24} />
      </button>

      {/* evita o overlay*/}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-65 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* sidebar no desktop*/}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-70 flex flex-col h-dvh bg-surface border-r border-border-subtle 
          transition-all duration-300 ease-in-out
          
          ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'} 
          
          lg:relative lg:translate-x-0 
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
        `}
      >
        
        {/* botao toogle desktop*/}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-10 bg-surface border border-border-subtle text-text-secondary hover:text-accent p-1.5 rounded-full shadow-lg hover:scale-110 transition-all z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* botao para fechar no mobile */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute right-4 top-6 text-text-secondary"
        >
          <X size={24} />
        </button>

      {/* Header com Logo */}
      <div className={`p-6 border-b border-border-subtle flex items-center ${isCollapsed ? 'lg:justify-center' : ''} transition-all shrink-0`}>
        
        
        {isCollapsed ? (
          <h1 className="hidden lg:block text-3xl font-black text-brand-10 italic tracking-tighter animate-fade-in">
            A<span className="text-accent">.</span>
          </h1>
        ) : (
          <h1 className="hidden lg:block text-4xl font-black text-brand-10 leading-tight italic tracking-tighter drop-shadow-lg whitespace-nowrap overflow-hidden animate-fade-in">
            Amentoria<span className="text-accent">.</span>
          </h1>
        )}
        <h1 className="lg:hidden text-4xl font-black text-brand-10 italic tracking-tighter">
          Amentoria<span className="text-accent">.</span>
        </h1>

      </div>

        {/* campos presentes */}
        <nav className="flex-1 px-3 py-8 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {(!isCollapsed || isMobileOpen) && (
            <p className="px-4 text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 animate-fade-in">
              Plataforma
            </p>
          )}

          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} mobileOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />
          <NavItem to="/simulados" icon={BookOpen} label="Simulados" isCollapsed={isCollapsed} mobileOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />
          <NavItem to="/materiais" icon={GraduationCap} label="Materiais" isCollapsed={isCollapsed} mobileOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />
          <NavItem to="/cronograma" icon={Calendar} label="Cronograma" isCollapsed={isCollapsed} mobileOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />
          <NavItem to="/configuracoes" icon={Settings} label="Configurações" isCollapsed={isCollapsed} mobileOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />
        </nav>

        {/* botao de theme */}
        <div className="px-3 mt-auto mb-4">
          <button 
            onClick={toggleTheme} 
            className={`
              w-full flex items-center p-3 rounded-xl bg-background border border-border-subtle hover:border-accent/50 transition-all group
              ${isCollapsed ? 'lg:justify-center' : 'justify-between'}
            `}
          >
              <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon size={20} className="text-brand-400 shrink-0" />
                  ) : (
                    <Sun size={20} className="text-amber-500 shrink-0" />
                  )}
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
                      Modo {theme === 'dark' ? 'Escuro' : 'Claro'}
                    </span>
                  )}
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-brand-900' : 'bg-slate-300'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`} />
                </div>
              )}
          </button>
        </div>

        {/* footerbar*/}
        <div className="p-4 border-t border-border-subtle overflow-hidden shrink-0">
        <div className={`
            flex items-center rounded-xl bg-bg-hover border border-border-subtle hover:border-accent/50 transition-all group cursor-pointer
            ${isCollapsed ? 'justify-center p-2' : 'gap-3 p-3'}
        `}>
          
          {/* logo */}
          <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-brand-600/20">
            {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
          </div>

          {/* informacoes do usuaio */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-bold text-text-primary truncate">{user?.name}</p>
              <p className="text-xs text-text-secondary truncate max-w-30">{user?.email}</p>
            </div>
          )}

          {/* logout */}
          {!isCollapsed ? (
            <button 
              onClick={handleSignOut}
              className="text-text-secondary hover:text-red-500 transition-colors p-1"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          ) : (
             null
          )}
        </div>
          {/* Logout Inferior no mo*/}
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
    </>
  );
}

function NavItem({ to, icon: Icon, label, isCollapsed, mobileOpen, onClick }: any) {
  const showText = !isCollapsed || mobileOpen;

  return (
    <NavLink to={to}
      onClick={onClick}
      title={isCollapsed && !mobileOpen ? label : ''}
      className={({ isActive }) =>
        `flex items-center ${!showText ? 'lg:justify-center px-2' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
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
          <Icon size={22} className={`shrink-0 ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`} />
          <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${showText ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:hidden'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}