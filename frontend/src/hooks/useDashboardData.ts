import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useDashboardData() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // para o dashboard
      const statsRes = await api.get('/dashboard');
      setData(statsRes.data);

      // para as sessoes
      const historyRes = await api.get('/dashboard/sessions/history');
      setHistory(historyRes.data);

      // materias
      const subjectsRes = await api.get('/dashboard/subjects');
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados globais:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // deletar sessao
  const deleteSession = async (id: string) => {
    await api.delete(`/dashboard/sessions/${id}`);
    await fetchData(); // Recarrega tudo para manter os gráficos sincronizados
  };

  // funcao atualizar nota
  const updateScore = async (id: string, score: number) => {
    await api.put(`/dashboard/scores/${id}`, { score });
    await fetchData();
  };

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, history, subjects, loading, refresh: fetchData, deleteSession, updateScore };
}