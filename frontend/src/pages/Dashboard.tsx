import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

// Gráficos Obrigatórios
import { PerformanceChart } from '../components/charts/PerformanceChart';
import { StudyDistributionChart } from '../components/charts/StudyDistributionChart';

// Gráficos Extras, UI e Modais
import { DashboardFilters } from '../components/dashboard/DashboardFilters';
import { AddSessionModal } from '../components/modal/AddSessionModal';
import { AddGradeModal } from '../components/modal/AddGradeModal'; // [NOVO IMPORT]
import { ProfessorDrawer } from '../components/dashboard/ProfessorDrawer';

// Ícones (Adicionei GraduationCap)
import { Target, Zap, Trophy, Activity, Loader2, Plus, HelpCircle, NotebookPen } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado inicial dos filtros
  const initialFilters = { startDate: '', endDate: '', searchQuery: '' };
  const [filters, setFilters] = useState(initialFilters);
  
  // Estados dos Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false); // [NOVO ESTADO]
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function fetchAllStats() {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.searchQuery) params.append('q', filters.searchQuery);

      const response = await api.get(`/dashboard?${params.toString()}`);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Função para limpar filtros
  async function handleClearFilters() {
    setFilters(initialFilters);
    setIsLoading(true);
    try {
        const response = await api.get('/dashboard');
        setDashboardData(response.data);
    } catch (error) {
        console.error("Erro ao limpar filtros:", error);
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllStats();
  }, []);

  const cards = dashboardData?.cards || {};
  const charts = dashboardData?.charts || {};

  const hasLowPerformance = dashboardData?.charts?.subjectScoresEvolution?.some((subject: any) => {
    const lastScore = subject.data[subject.data.length - 1]?.score;
    return lastScore < 700;
  });

  return (
    <div className="space-y-7 animate-fade-in relative">
      
      {/* 1. HEADER + BOTÕES DE AÇÃO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Bem-vindo de volta, <span className="text-accent">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-text-secondary">Confira os indicadores obrigatórios do seu desempenho.</p>
        </div>

        {/* GRUPO DE BOTÕES [ATUALIZADO] */}
        <div className="flex gap-3 ">
          {/* Botão Lançar Nota [NOVO] */}
          <button 
            onClick={() => setIsGradeModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-surface border border-border-subtle hover:border-accent text-text-primary hover:text-accent rounded-full font-bold shadow-sm transition-all active:scale-95"
          >
            <NotebookPen size={20} />
            Lançar Nota
          </button>

          {/* Botão Registrar Estudo (Mantido igual) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-full font-bold shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Registrar Estudo
          </button>
        </div>
      </div>

      {/* 2. BARRA DE FILTROS */}
      <DashboardFilters 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={fetchAllStats} 
        onClear={handleClearFilters}
      />

      {/* 3. CARDS DE INDICADORES (KPIs) */}
      <div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Horas Totais" value={cards.totalHoursStudied ?? 0} trend="Tempo de Estudo" icon={Activity} color="brand" loading={isLoading} />
        <StatCard title="Média Geral" value={cards.averageScore ?? 0} trend="Pontuação" icon={Trophy} color="accent" loading={isLoading} />
        <StatCard title="Matéria Foco" value={cards.mostPopularSubject ?? '-'} trend="Mais Dedicada" icon={Zap} color="warning" loading={isLoading} />
        <StatCard title="Total Alunos" value={cards.totalStudents ?? 0} trend="Ranking Geral" icon={Target} color="success" loading={isLoading} />
      </div>

      {/* 4. GRID DE GRÁFICOS OBRIGATÓRIOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
        
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-6">Tendências de Estudo (Disciplinas)</h3>
            {isLoading ? <LoadingSpinner /> : <PerformanceChart data={charts.subjectScoresEvolution} />}
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="space-y-6">
          <div className="bg-surface border border-border-subtle rounded-3xl shadow-sm">
            <div className="text-lg font-bold text-text-primary mt-6 text-center ">
              <h3>Distribuição Percentual</h3>
            </div>
            <div className="mt-12 mb-12">
              {isLoading ? <LoadingSpinner /> : <StudyDistributionChart data={charts.studyDistribution} />}
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO FLUTUANTE DO DRAWER */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2 z-40 group ${hasLowPerformance ? 'bg-red-600 hover:bg-red-700 animate-pulse text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'}`}
      >
        <HelpCircle size={24} /> 
        {hasLowPerformance && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          {hasLowPerformance ? 'Alerta do Tutor' : 'Dica do Professor'}
        </span>
      </button>

      {/* MODAL SESSÃO */}
      <AddSessionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchAllStats} 
      />

      {/* MODAL NOTA [NOVO RENDER] */}
      <AddGradeModal 
        isOpen={isGradeModalOpen} 
        onClose={() => setIsGradeModalOpen(false)} 
        onSuccess={fetchAllStats} 
      />

      <ProfessorDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        data={dashboardData}
      />

    </div>
  );
}

// Helpers
function LoadingSpinner() {
  return <div className="h-62.5 flex items-center justify-center"><Loader2 className="animate-spin text-accent" /></div>;
}

function StatCard({ title, value, trend, icon: Icon, color, loading }: any) {
  const colors: any = {
    accent: "text-accent bg-accent/10 border-accent/20",
    brand: "text-brand-600 bg-brand-600/10 border-brand-600/20",
    warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-4 md:p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="min-w-0"> {/* min-w-0 evita que o texto quebre o layout */}
          <p className="text-text-secondary text-xs md:text-sm font-medium mb-1 truncate">
            {title}
          </p>
          {loading ? (
            <div className="h-8 w-16 bg-white/5 animate-pulse rounded" />
          ) : (
            <h4 className="text-2xl md:text-3xl font-bold text-text-primary truncate">
              {value}
            </h4>
          )}
        </div>
        
        {/* Ícone menor no mobile */}
        <div className={`p-3 md:p-4 rounded-xl border shrink-0 ${colors[color]}`}>
          <Icon size={20} className="md:w-6 md:h-6" />
        </div>
      </div>
      
      <div className="mt-3 text-[10px] md:text-xs text-text-secondary font-medium bg-background/50 inline-block px-2 py-1 rounded w-fit">
        {trend}
      </div>
    </div>
  );
}