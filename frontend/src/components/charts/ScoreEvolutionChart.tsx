import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../../contexts/ThemeContext';

interface ScoreEvolutionProps {
  data?: any[]; // O array charts.scoresEvolution
}

export function ScoreEvolution({ data }: ScoreEvolutionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data || data.length === 0) return <div className="h-62.5 flex items-center justify-center text-slate-500">Sem dados de simulados ainda.</div>;

  const categories = data.map((item: any) => {
      // Formata data simples
      const datePart = item.date.toString().split('T')[0];
      const [m, d] = datePart.split('-');
      return `${d}/${m}`;
  });
  
  const values = data.map((item: any) => item.score);
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const options: Highcharts.Options = {
    chart: { type: 'spline', backgroundColor: 'transparent', height: 250, style: { fontFamily: 'Inter' } },
    title: { text: undefined },
    xAxis: {
      categories: categories,
      lineColor: 'transparent',
      labels: { style: { color: textColor } }
    },
    yAxis: {
      title: { text: undefined },
      gridLineColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      labels: { style: { color: textColor } }
    },
    series: [{
      type: 'spline',
      name: 'Média',
      data: values,
      color: '#22c55e', 
      lineWidth: 3,
      marker: { radius: 4, fillColor: '#22c55e', lineColor: isDark ? '#0f172a' : '#fff', lineWidth: 2 }
    }],
    legend: { enabled: false },
    credits: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}