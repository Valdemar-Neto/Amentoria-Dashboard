import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../../contexts/ThemeContext';

interface StudyDistributionChartProps {
  data?: any[]; // Recebe charts.studyDistribution
}

export function StudyDistributionChart({ data }: StudyDistributionChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Fallback se não tiver dados
  const chartData = data && data.length > 0 
    ? data.map((d: any) => ({ name: d.category, y: d.hours }))
    : [{ name: 'Sem dados', y: 1 }];

  const textColor = isDark ? '#cbd5e1' : '#475569';

  const options: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: 'transparent', height: 300, style: { fontFamily: 'Inter' } },
    title: { text: undefined },
    pane: { size: '100%' },
    plotOptions: {
      pie: {
        innerSize: '40%', 
        borderWidth: 0,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: false }, // Limpa o visual
        showInLegend: true
      }
    },
    tooltip: { pointFormat: '<b>{point.y} horas</b> ({point.percentage:.1f}%)' },
    legend: {
      itemStyle: { color: textColor, fontWeight: '500' },
      itemHoverStyle: { color: isDark ? '#fff' : '#000' },
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    colors: ['#06b6d4', '#7c3aed', '#f59e0b', '#22c55e', '#ef4444', '#64748b'], // Cores da marca
    series: [{
      type: 'pie',
      name: 'Tempo',
      data: chartData
    }],
    credits: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}