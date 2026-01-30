
// Gráficos Obrigatórios
import { ScoreEvolution } from '../components/charts/ScoreEvolutionChart';     // LINHA (#2)
import { CategoryChart } from '../components/charts/CategoryChart'; 
import { SubjectRadar } from '../components/charts/SubjectRadar';

import {  Loader2 } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';

export function Simulados() {

const { data, loading}  = useDashboardData();


  const charts = data?.charts || {};
  return (
    <div className="h-full flex flex-col mt-6 space-y-9">
      <header>
        <h1 className="text-3xl font-bold">Análise de Simulados</h1>
      </header>

      {/* Grid que se ajusta à altura disponível */}
      {/* 4. GRID DE GRÁFICOS OBRIGATÓRIOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUNA ESQUERDA (Foco em Tendências e Evolução) */}
        <div className="lg:col-span-4 space-y-6">
          

          {/* GRÁFICO DE LINHA (#2) */}
          <div className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-6">Evolução ao Longo do Tempo (Simulado)</h3>
            {loading ? <LoadingSpinner /> : <ScoreEvolution data={charts.scoresEvolution} />}
          </div>

        </div>

        {/* COLUNA DIREITA (Análise por Categorias e Radar) */}
        <div className="lg:col-span-1 space-y-5 ">
          
          {/* GRÁFICO DE BARRAS (#1) */}
          <div className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-4 text-center">Comparação entre Categorias (Barras)</h3>
            {loading ? <LoadingSpinner /> : <CategoryChart data={charts.categoryDistribution} />}
          </div>

            <div className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-text-primary mb-4 text-center">Equilíbrio de Matérias (Radar)</h3>
                {loading ? <LoadingSpinner /> : <SubjectRadar data={charts.subjectsRanking} />}
            </div>

        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return <div className="h-62.5 flex items-center justify-center"><Loader2 className="animate-spin text-accent" /></div>;
}