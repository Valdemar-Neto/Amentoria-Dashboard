import { Search, Calendar, Filter } from 'lucide-react';

interface DashboardFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  onSearch: () => void;
}

export function DashboardFilters({ filters, setFilters, onSearch }: DashboardFiltersProps) {
  
  const handleChange = (field: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
      {/* Busca por Texto */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Filtrar por assunto..." 
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle focus:border-accent outline-none text-text-primary transition-all"
          value={filters.searchQuery || ''}
          onChange={(e) => handleChange('searchQuery', e.target.value)}
        />
      </div>

      {/* Seletor de Datas */}
      <div className="flex gap-2">
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Calendar size={18} />
            </div>
            <input 
            type="date" 
            className="pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle focus:border-accent outline-none text-text-primary text-sm"
            value={filters.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            />
        </div>
        <span className="self-center text-text-secondary">até</span>
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Calendar size={18} />
            </div>
            <input 
            type="date" 
            className="pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle focus:border-accent outline-none text-text-primary text-sm"
            value={filters.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            />
        </div>
      </div>

      {/* Botão de Aplicar */}
      <button 
        onClick={onSearch}
        className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-all flex items-center gap-2"
      >
        <Filter size={18} />
        Filtrar
      </button>
    </div>
  );
}