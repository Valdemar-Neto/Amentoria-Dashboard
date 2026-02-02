// import { Outlet } from 'react-router-dom';
// import { Sidebar } from '../components/Sidebar';

// export function DefaultLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden bg-background text-text-primary">
//       {/* Barra Lateral Fixa */}
//       <Sidebar />

//       {/* Área de Conteúdo que muda conforme a rota */}
//       <main className="flex-1 flex flex-col">
//         <div className="max-w-7xl mx-auto">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function DefaultLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary">
      {/* Barra Lateral Fixa - No desktop ela fica aqui */}
      <Sidebar />

      {/* Área de Conteúdo - Destravando o scroll */}
      <main className="flex-1 overflg:overflow-hidden overflow-x-hidden">
        {/* Adicionei 'p-4 md:p-8' para o conteúdo não colar na borda no celular */}
        <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}