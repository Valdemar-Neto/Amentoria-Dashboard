import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../../contexts/ThemeContext';

interface CategoryChartProps {
  data?: any[]; // Recebe charts.categoryDistribution
}

export function CategoryChart({ data }: CategoryChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const categories = data?.map(d => d.category) || ['AULA', 'EXERCICIO', 'REVISAO'];
  const values = data?.map(d => d.hours) || [0, 0, 0];

  const options: Highcharts.Options = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 300 },
    title: { text: undefined },
    xAxis: {
      categories: categories,
      labels: { style: { color: isDark ? '#94a3b8' : '#64748b' } }
    },
    yAxis: {
      title: { text: 'Horas' },
      gridLineColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
    },
    plotOptions: {
      column: { borderRadius: 8, colorByPoint: true }
    },
    colors: ['#7c3aed', '#06b6d4', '#22c55e'],
    series: [{ type: 'column', name: 'Horas', data: values, showInLegend: false }],
    credits: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}