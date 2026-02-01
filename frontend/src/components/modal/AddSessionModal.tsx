import { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Esta função chama o fetchAllStats do Dashboard
}

export function AddSessionModal({ isOpen, onClose, onSuccess }: AddSessionModalProps) {
  const [formData, setFormData] = useState({
    subject: 'Matemática',
    category: 'EXERCICIO',
    minutes: 60,
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/dashboard/sessions', formData);
      
      await onSuccess(); 
      
      onClose();
      
      setFormData({ ...formData, minutes: 60, date: new Date().toISOString().split('T')[0] });
      
    } catch (error) {
      console.error("Erro ao registrar sessão:", error);
      alert('Não foi possível salvar sua sessão de estudo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border-subtle rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-scale-in">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          Registrar Estudo 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Matéria</label>
            <select 
              className="w-full p-3 rounded-lg bg-background border border-border-subtle text-text-primary outline-none focus:border-accent transition-all"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            >
              <option>Matemática</option>
              <option>Física</option>
              <option>Química</option>
              <option>Biologia</option>
              <option>História</option>
              <option>Português</option>
              <option>Geografia</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Tipo</label>
                <select 
                  className="w-full p-3 rounded-lg bg-background border border-border-subtle text-text-primary outline-none focus:border-accent"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="AULA">Aula</option>
                  <option value="EXERCICIO">Exercício</option>
                  <option value="REVISAO">Revisão</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Tempo (min)</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full p-3 rounded-lg bg-background border border-border-subtle text-text-primary outline-none focus:border-accent"
                  value={formData.minutes}
                  onChange={e => setFormData({...formData, minutes: Number(e.target.value)})}
                />
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-text-secondary mb-1">Data do Estudo</label>
             <input 
                type="date"
                className="w-full p-3 rounded-lg bg-background border border-border-subtle text-text-primary outline-none focus:border-accent"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
             />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Check size={20} /> 
                Confirmar Registro
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}