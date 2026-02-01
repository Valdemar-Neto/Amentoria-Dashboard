import { useState } from 'react';
import { X, Save } from 'lucide-react';

interface UpdateScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, newScore: number) => Promise<void>;
  scoreData: { id: string; subject: string; currentScore: number } | null;
}

export function UpdateScoreModal({ isOpen, onClose, onSave, scoreData }: UpdateScoreModalProps) {
  const [newScore, setNewScore] = useState(scoreData?.currentScore || 0);

  if (!isOpen || !scoreData) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border-subtle w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Editar Nota: {scoreData.subject}</h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-hover rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase mb-2 block">Nova Pontuação</label>
            <input 
              type="number" 
              value={newScore}
              onChange={(e) => setNewScore(Number(e.target.value))}
              className="w-full bg-background border border-border-subtle rounded-xl p-4 text-2xl font-bold text-accent focus:ring-2 focus:ring-accent outline-none transition-all"
            />
          </div>

          <button 
            onClick={() => onSave(scoreData.id, newScore)}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Save size={20} /> Salvar Alteração
          </button>
        </div>
      </div>
    </div>
  );
}