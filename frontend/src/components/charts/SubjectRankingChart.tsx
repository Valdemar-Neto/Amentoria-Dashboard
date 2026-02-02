import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../../contexts/ThemeContext';

interface SubjectRankingProps {
  data?: any[]; // Recebe charts.subjectsRanking
}

export function SubjectRankingChart({ data }: SubjectRankingProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const categories = data?.map(d => d.subject) || [];
  const values = data?.map(d => d.hours) || [];

  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  const options: Highcharts.Options = {
    chart: { type: 'bar', backgroundColor: 'transparent', height: 280, style: { fontFamily: 'Inter' } },
    title: { text: undefined },
    xAxis: {
      categories: categories,
      gridLineWidth: 0,
      lineColor: gridColor,
      labels: { style: { color: isDark ? '#f8fafc' : '#0f172a', fontWeight: '600' } }
    },
    yAxis: {
      title: { text: 'Horas Totais', style: { color: textColor } },
      gridLineColor: gridColor,
      labels: { style: { color: textColor } }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        colorByPoint: true,
        dataLabels: { enabled: true, format: '{y}h', style: { color: isDark ? '#fff' : '#000' } }
      }
    },
    colors: ['#7c3aed', '#8b25ca', '#a855f7', '#c084fc', '#d8b4fe'], // cores da mentoria
    series: [{
      type: 'bar',
      name: 'Dedicação',
      data: values,
      showInLegend: false
    }],
    tooltip: { valueSuffix: ' horas' },
    credits: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}