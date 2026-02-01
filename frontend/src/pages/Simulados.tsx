// import { ScoreEvolution } from '../components/charts/ScoreEvolutionChart';
// import { CategoryChart } from '../components/charts/CategoryChart';
// import { SubjectRadar } from '../components/charts/SubjectRadar';

// import { Loader2 } from 'lucide-react';
// import { useDashboardData } from '../hooks/useDashboardData';

// export function Simulados() {
//   const { data, loading } = useDashboardData();
//   const charts = data?.charts || {};

//   return (
//     <div className="h-full w-full flex flex-col space-y-6 animate-fade-in overflow-hidden">
      
//       {/* 1. HEADER - Mais compacto para sobrar espaço pros gráficos */}
//       <header className="flex-none  mt-8">
//         <h1 className="text-3xl font-bold text-text-primary tracking-tight">
//           Análise de Simulados
//         </h1>
//         <p className="text-text-secondary mt-1">
//           Desempenho detalhado e equilíbrio de competências.
//         </p>
//       </header>

//       {/* 2. GRID PRINCIPAL - Ocupa o restante da tela */}
//       <div className="flex-1 grid grid-cols-12 grid-rows-2 gap-6 min-h-0 pb-6">
        
//         {/* COLUNA ESQUERDA: Evolução (Larga e Alta) */}
//         <div className="col-span-12 lg:col-span-8 row-span-2 flex flex-col space-y-6">
          
//           {/* Evolução de Notas (60% da altura da coluna) */}
//           <div className="flex-[1.2] bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col">
//             <h3 className="text-lg font-bold text-text-primary mb-4">
//               Evolução ao Longo do Tempo
//             </h3>
//             <div className="flex-1 min-h-0">
//               {loading ? <LoadingSpinner /> : <ScoreEvolution data={charts.scoresEvolution} />}
//             </div>
//           </div>

//           {/* Comparação por Categorias (40% da altura da coluna) */}
//           <div className="flex-1 bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col">
//             <h3 className="text-lg font-bold text-text-primary mb-4">
//               Distribuição por Categoria de Estudo
//             </h3>
//             <div className="flex-1 min-h-0">
//               {loading ? <LoadingSpinner /> : <CategoryChart data={charts.categoryDistribution} />}
//             </div>
//           </div>
//         </div>

//         {/* COLUNA DIREITA: Radar e Histórico (Mais estreita) */}
//         <div className="col-span-12 lg:col-span-4 row-span-2 flex flex-col space-y-6">
          
//           {/* Radar de Equilíbrio */}
//           <div className="flex-1 bg-surface border border-border-subtle rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center">
//             <h3 className="text-lg font-bold text-text-primary mb-6 text-center">
//               Equilíbrio de Matérias                        
//             </h3>
//             <div className="w-full flex-1 min-h-0 flex items-center justify-center">
//               {loading ? <LoadingSpinner /> : <SubjectRadar data={charts.subjectsRanking} />}
//             </div>
//           </div>

//           {/* NOVO: Card de Resumo para preencher espaço e dar harmonia */}
//           <div className="h-70 bg-accent/5 border border-accent/20 rounded-3xl p-6 flex flex-col justify-center">
//             <p className="text-accent font-bold uppercase text-xs tracking-widest mb-2">Insight de Simulado</p>
//             <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
//                 {charts.scoresEvolution?.slice(-8).reverse().map((score: any, idx: number) => (
//                   <div key={idx} className="flex justify-between items-center p-3 bg-background/50 rounded-xl border border-border-subtle hover:border-accent/30 transition-colors">
//                      <span className="text-xs font-semibold">{new Date(score.date).toLocaleDateString('pt-BR')}</span>
//                      <span className="text-sm font-bold text-accent">{score.score} pts</span>
//                   </div>
//                 ))}
//              </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// function LoadingSpinner() {
//   return <div className="h-full w-full flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={32} /></div>;
// }

import { useState } from 'react';
import { ScoreEvolution } from '../components/charts/ScoreEvolutionChart';
import { CategoryChart } from '../components/charts/CategoryChart';
import { SubjectRadar } from '../components/charts/SubjectRadar';
import { Loader2, History, LineChart } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import { UpdateScoreModal } from '../components/UpdateScoreModal';

export function Simulados() {
  const { data, loading, updateScore } = useDashboardData();
  const charts = data?.charts || {};

  // Estados para gerenciar o Modal de Edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScore ] = useState<{id: string, subject: string, currentScore: number} | null>(null);

  return (
    <div className="h-full w-full flex flex-col space-y-6 animate-fade-in overflow-hidden">
      
      <header className="flex-none mt-8">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Análise de Simulados
        </h1>
        <p className="text-text-secondary mt-1">
          Desempenho detalhado e equilíbrio de competências por matéria.
        </p>
      </header>

      {/* Grid Principal */}
      <div className="flex-1 grid grid-cols-12 grid-rows-2 gap-6 min-h-0 pb-6">
        
        {/* COLUNA ESQUERDA: Evolução e Categorias */}
        <div className="col-span-12 lg:col-span-8 row-span-2 flex flex-col space-y-6">
          <div className="flex-[1.2] bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <LineChart size={20} className="text-accent" />
              Evolução ao Longo do Tempo
            </h3>
            <div className="flex-1 min-h-0">
              {loading ? <LoadingSpinner /> : <ScoreEvolution data={charts.scoresEvolution} />}
            </div>
          </div>

          <div className="flex-1 bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              Distribuição por Categoria de Estudo
            </h3>
            <div className="flex-1 min-h-0">
              {loading ? <LoadingSpinner /> : <CategoryChart data={charts.categoryDistribution} />}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Radar e Histórico com Ações */}
        <div className="col-span-12 lg:col-span-4 row-span-2 flex flex-col space-y-6">
          <div className="flex-1 bg-surface border border-border-subtle rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-text-primary mb-6 text-center">
              Equilíbrio de Matérias
            </h3>
            <div className="w-full flex-1 min-h-0 flex items-center justify-center">
              {loading ? <LoadingSpinner /> : <SubjectRadar data={charts.subjectsRanking} />}
            </div>
          </div>

          {/* Histórico Recente com botões de EDITAR e DELETAR */}
          <div className="h-70 bg-accent/5 border border-accent/20 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <History size={16} className="text-accent" />
              <p className="text-accent font-bold uppercase text-xs tracking-widest">Histórico de Notas</p>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {charts.scoresEvolution?.slice(-10).reverse().map((score: any, idx: number) => (
                  <div key={score._id || idx} className="flex justify-between items-center p-3 bg-background/50 rounded-xl border border-border-subtle hover:border-accent/30 transition-all group">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-text-secondary">
                          {new Date(score.props?.date || score.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-sm font-bold text-text-primary truncate max-w-30">
                          {score.props?.subject || 'Simulado'}
                        </span>
                     </div>
                     
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-accent">{score.props?.score || score.score} pts</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Modal renderizado no final para garantir o Z-INDEX */}
      <UpdateScoreModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (id, val) => {
          await updateScore(id, val);
          setIsModalOpen(false);
        }}
        scoreData={selectedScore}
      />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="animate-spin text-accent" size={32} />
    </div>
  );
}