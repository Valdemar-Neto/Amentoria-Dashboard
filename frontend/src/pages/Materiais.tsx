import { useDashboardData } from '../hooks/useDashboardData';
import { useState, useMemo } from 'react';
import { BookOpen, Video, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// 1. Definindo as Interfaces para o TypeScript
interface Material {
  title: string;
  type: string;
  icon: any;
}

interface Recommendation {
  subject: string;
  status: 'urgent' | 'good';
  score: number;
  materials: Material[];
}

export function Materiais() {
  const { subjects, data, loading } = useDashboardData();
  const [selectedSubject, setSelectedSubject] = useState('Todas');

  const recommendations = useMemo(() => {
    const scores = data?.charts?.subjectScoresEvolution || [];
    
    const baseRecommendations: Recommendation[] = scores.map((s: any) => {
      const lastScore = s.data[s.data.length - 1]?.score || 0;
      const status = lastScore < 700 ? 'urgent' : 'good';

      return {
        subject: s.subject,
        status,
        score: lastScore,
        materials: [
          { title: `Teoria Completa: ${s.subject}`, type: 'PDF', icon: FileText },
          { title: `Resolução de Exercícios Nível Difícil`, type: 'Video', icon: Video },
          { title: `Flashcards de Revisão Ativa`, type: 'Prática', icon: BookOpen },
        ]
      };
    });

    if (selectedSubject === 'Todas') return baseRecommendations;
    return baseRecommendations.filter(r => r.subject === selectedSubject);
  }, [data, selectedSubject]);

  // 2. Tratando o aviso de 'loading' (agora ele é lido aqui)
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <header className="flex-none ">
        <h1 className="text-3xl font-bold text-text-primary">Materiais de Estudo</h1>
        <p className="text-text-secondary mt-1">Sugestões baseadas no seu desempenho real.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto custom-scrollbar flex-none">
        <button 
          onClick={() => setSelectedSubject('Todas')}
          className={`px-5 py-1 rounded-full border transition-all whitespace-nowrap font-medium ${selectedSubject === 'Todas' ? 'bg-accent text-white border-accent' : 'bg-surface border-border-subtle text-text-secondary hover:border-accent/50'}`}
        >
          Todas
        </button>
        {subjects.map((sub: string) => (
          <button 
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-5 py-1 rounded-full border transition-all whitespace-nowrap font-medium ${selectedSubject === sub ? 'bg-accent text-white border-accent' : 'bg-surface border-border-subtle text-text-secondary hover:border-accent/50'}`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* ✅ Tipagem adicionada no parâmetro 'rec' */}
          {recommendations.map((rec: Recommendation) => (
            <div key={rec.subject} className="bg-surface border border-border-subtle rounded-3xl p-3 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{rec.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {rec.status === 'urgent' ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-md">
                        <AlertCircle size={12} /> REFORÇO NECESSÁRIO
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                        <CheckCircle2 size={12} /> BOM DESEMPENHO
                      </span>
                    )}
                    <span className="text-xs text-text-secondary font-medium">Média: {rec.score} pts</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 space-x-0">
                {/* ✅ Tipagem adicionada nos parâmetros 'item' e 'idx' */}
                {rec.materials.map((item: Material, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-background/50 rounded-2xl border border-border-subtle hover:border-accent/40 transition-all group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className=" bg-accent/10 text-accent rounded-lg group-hover:bg-accent group-hover:text-white transition-all gap-10">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{item.title}</p>
                        <p className="text-[10px] text-text-secondary uppercase tracking-widest">{item.type}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold ml-2 text-accent group-hover:underline">ACESSAR</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}