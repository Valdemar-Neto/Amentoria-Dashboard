import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function DefaultLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Barra Lateral Fixa */}
      <Sidebar />

      {/* Área de Conteúdo que muda conforme a rota */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}