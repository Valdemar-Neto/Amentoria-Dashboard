import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

// Gráficos Obrigatórios
import { PerformanceChart } from '../components/charts/PerformanceChart'; // ÁREA (#4)
import { ScoreEvolution } from '../components/charts/ScoreEvolutionChart';     // LINHA (#2)
import { StudyDistributionChart } from '../components/charts/StudyDistributionChart'; // PIZZA (#3)

// Gráficos Extras e UI
import { StudyHeatmap } from '../components/charts/StudyHeatmap';
import { DashboardFilters } from '../components/dashboard/DashboardFilters';
import { AddSessionModal } from '../components/dashboard/AddSessionModal';
import { ProfessorDrawer } from '../components/dashboard/ProfessorDrawer'; // <--- NOVO

// Ícones
import { Target, Zap, Trophy, Activity, Loader2, Plus, HelpCircle } from 'lucide-react'; // <--- HelpCircle Adicionado

export function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', searchQuery: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // <--- Estado do Drawer

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

  useEffect(() => {
    fetchAllStats();
  }, []);

  const cards = dashboardData?.cards || {};
  const charts = dashboardData?.charts || {};

  const hasLowPerformance = dashboardData?.charts?.subjectScoresEvolution?.some((subject: any) => {
    const lastScore = subject.data[subject.data.length - 1]?.score;
    return lastScore < 700; // Define o limiar de alerta
  });

  return (
    <div className="space-y-8 pb-10 animate-fade-in relative min-h-screen">
      
      {/* 1. HEADER + BOTÃO DE AÇÃO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Bem-vindo de volta, Amer <span className="text-accent">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-text-secondary mt-1">Confira os indicadores obrigatórios do seu desempenho.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-full font-bold shadow-lg shadow-accent/30 transition-all hover:scale-105"
        >
          <Plus size={20} />
          Registrar Estudo
        </button>
      </div>

      {/* 2. BARRA DE FILTROS */}
      <DashboardFilters 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={fetchAllStats} 
      />

      {/* 3. CARDS DE INDICADORES (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <StatCard title="Horas Totais" value={cards.totalHoursStudied ?? 0} trend="Tempo de Estudo" icon={Activity} color="brand" loading={isLoading} />
        <StatCard title="Média Geral" value={cards.averageScore ?? 0} trend="Pontuação" icon={Trophy} color="accent" loading={isLoading} />
        <StatCard title="Matéria Foco" value={cards.mostPopularSubject ?? '-'} trend="Mais Dedicada" icon={Zap} color="warning" loading={isLoading} />
        <StatCard title="Total Alunos" value={cards.totalStudents ?? 0} trend="Ranking Geral" icon={Target} color="success" loading={isLoading} />
      </div>

      {/* 4. GRID DE GRÁFICOS OBRIGATÓRIOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
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
              <h3>Distribuição Percentual (Pizza)</h3>
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
        className={`fixed bottom-8 right-8 p-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-2xl shadow-brand-600/30 transition-all hover:scale-110 
          flex items-center gap-2 z-40 group ${hasLowPerformance ? 'bg-red-600 hover:bg-red-700 animate-pulse ':'bg-brand-600 hover:bg-brand-700 '} text-white`}
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

      {/* MODAL E DRAWER */}
      <AddSessionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
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
    <div className="bg-surface border border-border-subtle rounded-2xl p-5 transition-all shadow-sm hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
          {loading ? <div className="h-8 w-20 bg-white/5 animate-pulse rounded"/> : <h4 className="text-3xl font-bold text-text-primary">{value}</h4>}
        </div>
        <div className={`p-5 mt-0l5 ml-2 rounded-xl border ${colors[color]}`}><Icon size={22} /></div>
      </div>
      <div className="mt-2 text-xs text-text-secondary font-medium bg-surface/50 inline-block px-2 py-1 rounded">{trend}</div>
    </div>
  );
}