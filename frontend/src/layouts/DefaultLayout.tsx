import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function DefaultLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-text-primary">
      {/* Barra Lateral Fixa */}
      <Sidebar />

      {/* Área de Conteúdo que muda conforme a rota */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}