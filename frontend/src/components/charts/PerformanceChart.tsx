import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../../contexts/ThemeContext';

interface PerformanceChartProps {
  data?: Array<{ subject: string; data: Array<{ date: string; score: number }> }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data || data.length === 0) {
    return <div className="h-80 flex items-center justify-center text-slate-500">Sem dados de matérias.</div>;
  }

  const categories = data[0].data.map(d => {
    const [ , m, day] = d.date.split('-'); 
    return `${day}/${m}`;
  });

  const series: Highcharts.SeriesOptionsType[] = data.map(item => ({
    type: 'areaspline',
    name: item.subject,
    data: item.data.map(d => d.score),
    fillOpacity: 0.1,
  }));

  const textColor = isDark ? '#94a3b8' : '#64748b';

  const options: Highcharts.Options = {
    chart: { type: 'areaspline', backgroundColor: 'transparent', height: 350 },
    title: { text: undefined },
    xAxis: { 
        categories, 
        labels: { style: { color: textColor } },
        gridLineWidth: 0,
        // ✅ CORREÇÃO: O crosshair funciona melhor quando definido no Eixo X
        crosshair: {
            width: 1,
            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            dashStyle: 'Dash'
        }
    },
    yAxis: { 
        title: { text: 'Pontuação' },
        gridLineColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        labels: { style: { color: textColor } }
    },
    colors: ['#06b6d4', '#7c3aed', '#22c55e', '#f59e0b', '#ef4444'],
    tooltip: { 
      shared: true 
      // Removido 'crosshair' daqui para evitar o erro de tipo
    },
    plotOptions: {
      areaspline: {
        marker: { enabled: false, states: { hover: { enabled: true } } }
      }
    },
    series: series,
    legend: { itemStyle: { color: textColor } },
    credits: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}