import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function DefaultLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary">
      {/* sidebar fixa*/}
      <Sidebar />
      <main className="flex-1 overflg:overflow-hidden overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}