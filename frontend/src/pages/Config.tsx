import { User, Target, Lock, Shield, Save, Calendar } from 'lucide-react';
import { useMe } from '../hooks/useGetMe';

export function Configuracoes() {

    const {profile, fetchProfile} = useMe();

    
  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in overflow-hidden">
      <header className="flex-none pt-8">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Configurações</h1>
        <p className="text-text-secondary mt-1">Ajuste os parâmetros do seu sistema de aprendizado.</p>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8">
        <div className="max-w-4xl space-y-6">
          
          {/* PERFIL */}
          <section className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-accent">
              <User size={20} />
              <h3 className="text-lg font-bold text-text-primary">Perfil do Aluno</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary uppercase">Nome Completo</label>
                <input type="text" value={profile?.name} className="w-full bg-background border border-border-subtle rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Seu nome" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary uppercase">Email</label>
                <input type="text" value={profile?.email} className="w-full bg-background border border-border-subtle rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent" defaultValue="UFRN" />
              </div>
              {/* Data de Criação (Formatada) */}
              <div className="md:col-span-2 p-4 bg-accent/5 border border-accent/10 rounded-2xl flex items-center gap-4">
                 <div className="p-2 bg-accent/10 text-accent rounded-lg">
                    <Calendar size={18} />
                 </div>
                 <div>
                    <p className="text-xs text-text-secondary font-medium">Membro desde</p>
                    <p className="text-sm font-bold text-text-primary">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : "--"}
                    </p>
                 </div>
              </div>
            </div>
          </section>

          {/* METAS (LÓGICA DE CONTROLE) */}
          <section className="bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-emerald-500">
              <Target size={20} />
              <h3 className="text-lg font-bold text-text-primary">Parâmetros de Metas</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-2xl border border-border-subtle">
                <div>
                  <p className="font-bold text-sm">Meta Diária de Estudo</p>
                  <p className="text-xs text-text-secondary">Defina quantos minutos planeja estudar por dia.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" className="w-20 bg-background border border-border-subtle rounded-lg p-2 text-center font-bold" defaultValue="180" />
                  <span className="text-sm text-text-secondary font-medium">min</span>
                </div>
              </div>
            </div>
          </section>

          {/* SENHA */}

          <section className="bg-surface border border-border-subtle rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl">
                <Shield size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Segurança</h3>
                <p className="text-xs text-text-secondary uppercase tracking-widest font-semibold">Alterar Senha</p>
              </div>
            </div>

            <div className="space-y-4 max-w-md">
               <button className="w-full flex items-center justify-between p-4 bg-background/50 border border-border-subtle rounded-2xl hover:border-accent/40 transition-all group">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-text-secondary group-hover:text-accent transition-colors" />
                    <span className="text-sm font-bold">Redefinir senha de acesso</span>
                  </div>
                  <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded font-bold">ALTERAR</span>
               </button>
            </div>
          </section>

          {/* BOTÃO SALVAR */}
          <div className="flex justify-end pt-4">
            <button className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-brand-600/20">
              <Save size={20} /> Salvar Alterações
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}