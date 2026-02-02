import { useState } from 'react';
import { User, Target, Lock, Shield, Save, Calendar, Loader2 } from 'lucide-react';
import { useMe } from '../hooks/useGetMe';
import { api } from '../services/api';
import { toast } from 'sonner';
import { ChangePasswordModal } from '../components/modal/ChangePasswordModal';

export function Configuracoes() {
  const { profile } = useMe();
  
  // Estados para controle de interface
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- Lógica de Alteração de Senha (API Real) ---
  async function handleChangePassword({ oldPass, newPass }: { oldPass: string, newPass: string }) {
    try {
      await api.put('/auth/change-password', {
        oldPassword: oldPass,
        newPassword: newPass
      });

      toast.success("Senha alterada com sucesso!", {
        description: "Utilize sua nova credencial no próximo login."
      });
      
      // A modal fecha automaticamente quando a Promise resolve
    } catch (error: any) {
      console.error("Erro ao mudar senha:", error);
      
      // Tratamento de erro para feedback preciso ao usuário
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("A senha atual informada está incorreta.");
      } else {
        toast.error("Não foi possível alterar a senha.", {
           description: "Tente novamente mais tarde."
        });
      }
      throw error; // Lança o erro para o Modal parar o loading interno dele
    }
  }

  // --- Lógica do Botão Salvar (Simulação de update de perfil por enquanto) ---
  const handleSaveSettings = () => {
    setIsSaving(true);
    // Aqui você futuramente chamaria uma rota PUT /profile
    setTimeout(() => {
        setIsSaving(false);
        toast.success("Preferências salvas com sucesso!");
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in overflow-hidden">
      <header className="flex-none">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Configurações</h1>
        <p className="text-text-secondary ">Ajuste os parâmetros do seu sistema de aprendizado.</p>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8">
        <div className="max-w-4xl space-y-5">
          
          {/* PERFIL */}
          <section className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-accent">
              <div className="p-2 bg-accent/10 rounded-lg">
                <User size={20} />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Perfil do Aluno</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary uppercase ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  readOnly // Adicionado para evitar warning do React
                  value={profile?.name || "Carregando..."} 
                  className="w-full bg-background/50 border border-border-subtle rounded-xl p-3 text-text-primary font-medium outline-none focus:ring-2 focus:ring-accent cursor-default opacity-80" 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary uppercase ml-1">Email</label>
                <input 
                  type="text" 
                  readOnly 
                  value={profile?.email || "..."} 
                  className="w-full bg-background/50 border border-border-subtle rounded-xl p-3 text-text-primary font-medium outline-none focus:ring-2 focus:ring-accent cursor-default opacity-80" 
                />
              </div>

              {/* Data de Criação (Formatada) */}
              <div className="md:col-span-2 p-4 bg-accent/5 border border-accent/10 rounded-2xl flex items-center gap-4 mt-2">
                 <div className="p-2 bg-accent/10 text-accent rounded-lg">
                    <Calendar size={18} />
                 </div>
                 <div>
                    <p className="text-xs text-text-secondary font-medium">Membro desde</p>
                    <p className="text-sm font-bold text-text-primary">
                      {profile?.createdAt 
                        ? new Date(profile.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) 
                        : "--"}
                    </p>
                 </div>
              </div>
            </div>
          </section>

          {/* METAS (LÓGICA DE CONTROLE) */}
          <section className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-emerald-500">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Parâmetros de Metas</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-2xl border border-border-subtle hover:border-emerald-500/30 transition-colors">
                <div>
                  <p className="font-bold text-sm text-text-primary">Meta Diária de Estudo</p>
                  <p className="text-xs text-text-secondary mt-0.5">Defina quantos minutos planeja estudar por dia.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    className="w-20 bg-background border border-border-subtle rounded-lg p-2 text-center font-bold text-text-primary focus:ring-2 focus:ring-emerald-500 outline-none" 
                    defaultValue="180" 
                  />
                  <span className="text-sm text-text-secondary font-medium">min</span>
                </div>
              </div>
            </div>
          </section>

          {/* SENHA E SEGURANÇA */}
          <section className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Segurança</h3>
                <p className="text-xs text-text-secondary font-medium">Credenciais de Acesso</p>
              </div>
            </div>

            <div className="space-y-4 max-w-md">
               <button 
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="w-full flex items-center justify-between p-4 bg-background/50 border border-border-subtle rounded-2xl hover:border-red-500/40 hover:bg-red-500/5 transition-all group cursor-pointer"
               >
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-text-secondary group-hover:text-red-500 transition-colors" />
                    <span className="text-sm font-bold text-text-primary">Redefinir senha de acesso</span>
                  </div>
                  <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded font-bold group-hover:bg-red-500 group-hover:text-white transition-all">ALTERAR</span>
               </button>
            </div>
          </section>

          {/* BOTÃO SALVAR */}
          <div className="flex justify-end">
            <button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-1 transition-all shadow-lg shadow-brand-600/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>

        </div>
      </div>

      {/* MODAL DE TROCA DE SENHA */}
      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onConfirm={handleChangePassword}
      />
    </div>
  );
}