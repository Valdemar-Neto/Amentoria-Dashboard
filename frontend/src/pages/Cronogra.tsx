import { useEffect, useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { Trash2, Clock, Calendar, Target } from 'lucide-react';

export function Cronograma() {
  const { history, deleteSession } = useDashboardData();
  
  
  const [displayLimit, setDisplayLimit] = useState(8);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayLimit(4); // Mobile
      } else {
        setDisplayLimit(8); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedHistory = history ? [...history].reverse() : [];

  return (
    <div className="h-full flex flex-col space-y-8 overflow-hidden">
      <header className="flex-none">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Cronograma e Histórico
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Gerencie suas sessões de estudo e acompanhe sua constância.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 pb-6 overflow-hidden">
        
        {/* COLUNA DE HISTÓRICO */}
        <div className="lg:col-span-2 bg-surface border border-border-subtle rounded-3xl p-6 flex flex-col shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 flex-none">
            <Calendar size={20} className="text-accent" />
            Registro de Atividades
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0 lg:max-h-[70vh]">
            {sortedHistory && sortedHistory.length > 0 ? (
              sortedHistory.slice(0, displayLimit).map((session) => {
                const { subject, category, minutes, date } = session.props;
                const id = session._id;

                return (
                  <div 
                    key={id} 
                    className="flex justify-between items-center p-4 bg-background/40 rounded-2xl border border-border-subtle hover:border-accent/20 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-brand-600/10 text-brand-600 rounded-xl group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <Clock size={20}/>
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">{subject}</p>
                        <p className="text-xs text-text-secondary uppercase tracking-wider font-medium">
                          {category} • {minutes} min
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-text-secondary bg-surface px-2 py-1 rounded-md border border-border-subtle font-medium">
                        {new Date(date).toLocaleDateString('pt-BR')}
                      </span>
                      <button 
                        onClick={() => deleteSession(id)}
                        className="text-text-secondary hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-50">
                <p>Nenhuma sessão registrada.</p>
              </div>
            )}
            
            {/* botao no mobile*/}
            {sortedHistory.length > displayLimit && (
              <button 
                onClick={() => setDisplayLimit(prev => prev + 5)}
                className="w-full py-2 text-xs font-bold text-accent hover:underline text-center"
              >
                Ver sessões anteriores...
              </button>
            )}
          </div>
        </div>

        {/* metas */}
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col overflow-hidden">
            <h3 className="text-lg font-bold flex items-center gap-2 flex-none">
            <Target size={20} className="text-brand-500" /> Próximas Metas
            </h3>

            <div className="flex-1 space-y-4 mt-4">
                <div className="p-4 bg-background/50 rounded-2xl border border-border-subtle">
                    <p className="text-xs text-text-secondary uppercase font-bold tracking-widest mb-1">Total Estudado</p>
                    <p className="text-2xl font-black text-text-primary">
                      {history?.reduce((acc: number, curr: any) => acc + curr.props.minutes, 0)} <span className="text-sm font-normal text-text-secondary">min</span>
                    </p>
                </div>

                <div className="p-4 bg-accent/5 rounded-2xl border border-accent/20">
                    <p className="text-xs text-accent uppercase font-bold tracking-widest mb-2">Sugestão de Hoje</p>
                    <p className="text-sm text-text-primary leading-relaxed">
                        {history?.length > 0 
                        ? `Você tem focado bastante em ${history[history.length-1].props.subject}. Que tal variar o tema hoje?`
                        : "Comece sua jornada registrando sua primeira atividade!"}
                    </p>
                </div>

                <div className="p-4 border-2 border-dashed border-border-subtle rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest">Meta Diária</p>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">30%</span>
                    </div>
                    <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[30%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </div>

                <div className="flex-1 border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Continue registrando seus estudos para liberar esta função!
                  </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}