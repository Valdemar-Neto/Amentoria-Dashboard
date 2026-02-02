import { useState } from 'react';
import { X, Lock, ShieldCheck, Loader2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { oldPass: string, newPass: string }) => Promise<void>;
}

export function ChangePasswordModal({ isOpen, onClose, onConfirm }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.warning("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm({ oldPass: oldPassword, newPass: newPassword });
      // se for true, limpa os caches
      setOldPassword('');
      setNewPassword('');
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border-subtle w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
        
        {/* forms */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-600/10 text-brand-600 rounded-xl">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Alterar Senha</h2>
              <p className="text-xs text-text-secondary">Segurança da conta</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-full text-text-secondary hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary uppercase ml-1">Senha Atual</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="password" 
                required
                placeholder="Sua senha antiga"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-background/50 border border-border-subtle rounded-xl p-3 pl-11 outline-none focus:ring-2 focus:ring-accent transition-all text-text-primary" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary uppercase ml-1">Nova Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="password" 
                required
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-background/50 border border-border-subtle rounded-xl p-3 pl-11 outline-none focus:ring-2 focus:ring-accent transition-all text-text-primary" 
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-600/20 mt-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <ShieldCheck size={18} />
                Confirmar Alteração
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}