import { useDashboardData } from '../hooks/useDashboardData';
import { CategoryChart } from '../components/charts/CategoryChart';       // BARRAS
import { StudyDistributionChart } from '../components/charts/StudyDistributionChart'; // PIZZA
import { StudyHeatmap } from '../components/charts/StudyHeatmap';

export function Cronograma() {
  const { data, loading } = useDashboardData();
  const charts = data?.charts || {};

  if (loading) return null;

  return (
    <div className="h-full flex flex-col space-y-4 overflow-hidden ">
      <div className="bg-surface border border-border-subtle rounded-3xl p-9 flex-none mt-7">
        <h3 className="font-bold mb-4">Mapa de Constância</h3>
        <StudyHeatmap />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 flex flex-col">
          <h3 className="font-bold mb-4">Comparação entre Categorias (Barras)</h3>
          <div className="flex-1 min-h-0">
             <CategoryChart data={charts.categoryDistribution} />
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-3xl p-6 flex flex-col">
          <h3 className="font-bold mb-4">Distribuição de Matérias (Pizza)</h3>
          <div className="flex-1 min-h-0">
             <StudyDistributionChart data={charts.studyDistribution} />
          </div>
        </div>
      </div>
    </div>
  );
}