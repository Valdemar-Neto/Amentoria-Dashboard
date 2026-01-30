import { useDashboardData } from '../hooks/useDashboardData';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { Loader2, GraduationCap } from 'lucide-react';

export function Materiais() {
  const { data, loading } = useDashboardData();

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={40} /></div>;

  // Lógica para encontrar matérias com média abaixo de 600 no subjectScoresEvolution
  const subjectsAtRisk = data?.charts?.subjectScoresEvolution?.filter((item: any) => {
    const lastScore = item.data[item.data.length - 1]?.score;
    return lastScore < 700; // Define o limiar de "atenção"
  }) || [];

  return (
    <div className="h-full flex flex-col space-y-6 overflow-hidden">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Central de Materiais</h1>
          <p className="text-text-secondary">Direcionamento baseado no seu desempenho real.</p>
        </div>
        <div className="hidden md:block bg-brand-600/10 px-4 py-2 rounded-xl border border-brand-600/20">
          <span className="text-sm font-medium text-brand-600">Foco do Dia: {data?.cards?.mostPopularSubject}</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Lado Esquerdo: Sugestões Críticas */}
        <div className="flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <GraduationCap className="text-accent" /> Prioridades de Estudo
          </h3>
          
          {subjectsAtRisk.length > 0 ? (
            subjectsAtRisk.map((s: any) => (
              <RecommendationCard 
                key={s.subject}
                subject={s.subject}
                reason={`Sua última média foi ${s.data[s.data.length - 1].score}. Está abaixo da meta.`}
                action="Ver Videoaula de Reforço"
              />
            ))
          ) : (
            <div className="p-8 border-2 border-dashed border-border-subtle rounded-2xl text-center">
              <p className="text-text-secondary">Parabéns! Suas notas estão acima da média em todas as frentes. 🎉</p>
            </div>
          )}
        </div>

        {/* Lado Direito: Biblioteca Geral (Placeholder) */}
        <div className="bg-surface border border-border-subtle rounded-3xl p-6">
          <h3 className="font-bold mb-4">Acesso Rápido</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-background rounded-2xl border border-border-subtle flex flex-col items-center justify-center hover:border-accent transition-all cursor-pointer">
              <span className="text-2xl mb-2">📚</span>
              <span className="text-sm font-medium">E-books</span>
            </div>
            <div className="h-32 bg-background rounded-2xl border border-border-subtle flex flex-col items-center justify-center hover:border-accent transition-all cursor-pointer">
              <span className="text-2xl mb-2">🎥</span>
              <span className="text-sm font-medium">Videoaulas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}