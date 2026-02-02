// import { Search, Calendar, Filter, X} from 'lucide-react';

// interface DashboardFiltersProps {
//   filters: any;
//   setFilters: (filters: any) => void;
//   onSearch: () => void;
//   onClear: () => void; // [NOVO] Prop recebida
// }

// export function DashboardFilters({ filters, setFilters, onSearch, onClear }: DashboardFiltersProps) {
  
//   const handleChange = (field: string, value: string) => {
//     setFilters((prev: any) => ({ ...prev, [field]: value }));
//   };

//   // Verifica se existe algum filtro ativo (se string não for vazia)
//   const hasActiveFilters = filters.searchQuery || filters.startDate || filters.endDate;

//   return (
//     <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in items-end md:items-center">
      
//       {/* Busca por Texto */}
//       <div className="relative flex-1 w-full">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//         <input 
//           type="text" 
//           placeholder="Filtrar por assunto..." 
//           className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle focus:border-accent outline-none text-text-primary transition-all"
//           value={filters.searchQuery || ''}
//           onChange={(e) => handleChange('searchQuery', e.target.value)}
//         />
//       </div>

//       {/* Grupo de Datas e Botões */}
//       <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
//         <div className="flex gap-2 min-w-max">
//            {/* Data Início */}
//            <div className="relative">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
//                   <Calendar size={18} />
//               </div>
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle focus:border-accent outline-none text-text-primary text-sm"
//                 value={filters.startDate || ''}
//                 onChange={(e) => handleChange('startDate', e.target.value)}
//               />
//           </div>
//           <span className="self-center text-text-secondary">até</span>
          
//           {/* Data Fim */}
//           <div className="relative">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
//                   <Calendar size={18} />
//               </div>
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle focus:border-accent outline-none text-text-primary text-sm"
//                 value={filters.endDate || ''}
//                 onChange={(e) => handleChange('endDate', e.target.value)}
//               />
//           </div>
//         </div>

//         {/* Botão de Aplicar Filtro */}
//         <button 
//           onClick={onSearch}
//           className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95"
//         >
//           <Filter size={18} />
//           <span className="hidden lg:inline">Filtrar</span>
//         </button>

//         {/* [NOVO] Botão de Limpar (Só aparece se houver filtros) */}
//         {hasActiveFilters && (
//           <button 
//             onClick={onClear}
//             className="px-3 py-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 rounded-xl font-medium transition-all flex items-center gap-2 animate-in fade-in slide-in-from-right-2 active:scale-95"
//             title="Limpar todos os filtros"
//           >
//             <X size={18} />
//             <span className="hidden lg:inline">Limpar</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { Search, Calendar, Filter, X } from 'lucide-react';

interface DashboardFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function DashboardFilters({ filters, setFilters, onSearch, onClear }: DashboardFiltersProps) {
  
  const handleChange = (field: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  const hasActiveFilters = filters.searchQuery || filters.startDate || filters.endDate;

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
        
        {/* 1. Busca por Texto (Ocupa o resto do espaço no PC, 100% no Mobile) */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
          <input 
            type="text" 
            placeholder="Filtrar por assunto..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border-subtle focus:border-accent outline-none text-text-primary transition-all placeholder:text-text-secondary/60"
            value={filters.searchQuery || ''}
            onChange={(e) => handleChange('searchQuery', e.target.value)}
          />
        </div>

        {/* 2. Container de Datas e Botões (Full width no Mobile) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          
          {/* Datas em Grid (Lado a lado no Mobile e Desktop) */}
          <div className="grid grid-cols-2 gap-3 w-full  sm:gap-7 sm:w-56">
            {/* Data Início */}
            <div className="relative w-full">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Calendar size={18} />
               </div>
               <input 
                 type="date" 
                 className="w-full pl-10 pr-2 py-2.5 rounded-xl bg-background border border-border-subtle focus:border-accent outline-none text-text-primary text-sm min-w-0"
                 value={filters.startDate || ''}
                 onChange={(e) => handleChange('startDate', e.target.value)}
               />
            </div>
            
            {/* Data Fim */}
            <div className="relative w-full">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Calendar size={18} />
               </div>
               <input 
                 type="date" 
                 className="w-full pl-10 pr-2 py-2.5 rounded-xl bg-background border border-border-subtle focus:border-accent outline-none text-text-primary text-sm min-w-0"
                 value={filters.endDate || ''}
                 onChange={(e) => handleChange('endDate', e.target.value)}
               />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 w-full sm:w-auto">
             <button 
               onClick={onSearch}
               className="flex-1 sm:flex-none px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 whitespace-nowrap"
             >
               <Filter size={18} />
               {/* Texto visível no mobile para facilitar o clique */}
               <span className="inline">Filtrar</span>
             </button>

             {hasActiveFilters && (
               <button 
                 onClick={onClear}
                 className="px-3 py-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 rounded-xl font-medium transition-all flex items-center justify-center gap-2 active:scale-95"
                 title="Limpar filtros"
               >
                 <X size={18} />
                 <span className="sm:hidden">Limpar</span>
               </button>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}