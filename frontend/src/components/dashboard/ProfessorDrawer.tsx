import { X, Lightbulb, Target, AlertTriangle } from 'lucide-react';

interface ProfessorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function ProfessorDrawer({ isOpen, onClose, data }: ProfessorDrawerProps) {
  if (!isOpen) return null;

  // Lógica de Diagnóstico: Encontrar a matéria com a menor nota média atual
  const subjectsEvolution = data?.charts?.subjectScoresEvolution || [];
  
  const worstSubject = [...subjectsEvolution].sort((a: any, b: any) => {
    const lastScoreA = a.data[a.data.length - 1]?.score || 0;
    const lastScoreB = b.data[b.data.length - 1]?.score || 0;
    return lastScoreA - lastScoreB;
  })[0];

  const worstSubjectName = worstSubject?.subject || 'Física';
  const worstScore = worstSubject?.data[worstSubject?.data.length - 1]?.score || 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-screen w-80 bg-surface border-l border-border-subtle z-70 p-6 shadow-2xl animate-slide-in-right">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="text-amber-500" /> Dica do Tutor
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-hover rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Análise Baseada no Foco (KPI) */}
          <section>
            <h4 className="text-xs font-bold text-text-secondary uppercase mb-3">Análise de Foco</h4>
            <div className="p-4 rounded-xl bg-background border border-border-subtle">
              <p className="text-sm text-text-primary italic leading-relaxed">
                "João, notei que você dedicou <b>{data?.cards?.totalHoursStudied}h</b> aos estudos. 
                Sua matéria favorita é <b>{data?.cards?.mostPopularSubject}</b>. Que tal equilibrar um pouco com as outras?"
              </p>
            </div>
          </section>

          {/* Alerta de Desempenho Baseado no Gráfico de Área */}
          <section>
            <h4 className="text-xs font-bold text-text-secondary uppercase mb-3">Ponto de Atenção</h4>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3">
              <AlertTriangle className="text-red-500 shrink-0" size={18} />
              <p className="text-sm text-text-primary">
                Seu desempenho em <b>{worstSubjectName}</b> está em <b>{worstScore}</b>. É a sua menor média atual.
              </p>
            </div>
          </section>

          {/* Próximo Passo Dinâmico */}
          <section>
            <h4 className="text-xs font-bold text-text-secondary uppercase mb-3">Próximo Passo</h4>
            <div className="flex gap-4 p-3 hover:bg-bg-hover rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-accent/30">
              <div className="p-2 bg-brand-600/10 text-brand-600 rounded-lg group-hover:bg-brand-600 group-hover:text-white transition-all">
                <Target size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Reforçar {worstSubjectName}</p>
                <p className="text-xs text-text-secondary italic">Sugerimos realizar uma bateria de exercícios.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}