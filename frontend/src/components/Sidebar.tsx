import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-surface border-r border-slate-200 flex flex-col h-screen">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-brand-600 italic">Amentoria.</h1>
      </div>

      <nav className="flex-1 px-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-brand-50 text-brand-600 rounded-xl font-bold">
          <LayoutDashboard size={20} /> Dashboard
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <p className="text-sm font-bold px-4">{user?.name}</p>
        <button 
          onClick={() => { signOut(); navigate('/login'); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-danger hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} /> Sair
        </button>
      </div>
    </aside>
  );
}