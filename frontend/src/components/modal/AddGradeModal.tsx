import { useState } from 'react';
import { X, Save, Loader2, GraduationCap, ClipboardCheck, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';

interface AddGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddGradeModal({ isOpen, onClose, onSuccess }: AddGradeModalProps) {
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);

  const subjects = [
    "Matemática", "Física", "Química", "Biologia", 
    "História", "Geografia", "Português", "Inglês", 
    "Redação", "Sociologia", "Filosofia"
  ];

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!subject || !score) {
      toast.warning("Preencha a matéria e a nota.");
      return;
    }

    setIsLoading(true);

    try {
      // ✅ AQUI ESTÁ O SEGREDO: Rota certa e conversão para Number
      await api.post('/dashboard/scores', {
        subject,
        score: Number(score), 
        date: new Date(date).toISOString(),
      });

      toast.success("Nota registrada com sucesso!");
      onSuccess(); // Atualiza o gráfico
      onClose();
      setSubject('');
      setScore('');
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar nota.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border-subtle w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent/10 text-accent rounded-xl"><GraduationCap size={22} /></div>
            <div><h2 className="text-xl font-bold text-text-primary">Registrar Nota</h2><p className="text-xs text-text-secondary">Simulados e Provas</p></div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-full text-text-secondary hover:text-text-primary transition-colors"><X size={20} /></button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase ml-1">Disciplina</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
              {subjects.map((sub) => (
                <button key={sub} type="button" onClick={() => setSubject(sub)} className={`p-2 rounded-xl text-xs font-bold border transition-all text-left ${subject === sub ? 'bg-accent text-white border-accent' : 'bg-background/50 border-border-subtle text-text-secondary hover:border-accent/50'}`}>{sub}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary uppercase ml-1">Nota (0-1000)</label>
              <div className="relative"><ClipboardCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} /><input type="number" required placeholder="Ex: 850" min="0" max="1000" value={score} onChange={(e) => setScore(e.target.value)} className="w-full bg-background border border-border-subtle rounded-xl p-3 pl-10 outline-none focus:ring-2 focus:ring-accent text-text-primary font-bold" /></div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary uppercase ml-1">Data</label>
              <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} /><input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-background border border-border-subtle rounded-xl p-3 pl-10 outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm font-medium" /></div>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-600/20 mt-4">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Salvar Resultado</>}
          </button>
        </form>
      </div>
    </div>
  );
}