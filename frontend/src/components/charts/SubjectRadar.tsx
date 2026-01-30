import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useTheme } from '../../contexts/ThemeContext';

interface SubjectRadarProps {
  data?: any[];
}

export function SubjectRadar({ data }: SubjectRadarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      // Tenta inicializar de forma segura
      if (typeof HighchartsMore === 'function') {
        (HighchartsMore as any)(Highcharts);
      } else if (typeof HighchartsMore === 'object') {
        (HighchartsMore as any)(Highcharts);
      }
    } catch (error) {
      console.warn("HighchartsMore já foi inicializado ou falhou:", error);
    }
  }, []);
  
  const categories = data?.map((d: any) => d.subject) || ['Mat', 'Fís', 'Qui', 'Bio', 'His'];
  const seriesData = data?.map((d: any) => d.hours) || [0, 0, 0, 0, 0];

  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const options: Highcharts.Options = {
    chart: { polar: true, type: 'line', backgroundColor: 'transparent', height: 300, style: { fontFamily: 'Inter' } },
    title: { text: undefined },
    pane: { size: '80%' },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on',
      lineWidth: 0,
      gridLineColor: gridColor,
      labels: { style: { color: textColor, fontWeight: 'bold' } }
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
      gridLineColor: gridColor,
      labels: { enabled: false }
    },
    tooltip: { shared: true, pointFormat: '<span style="color:{series.color}">Dedicação: <b>{point.y}h</b><br/>' },
    series: [{
        type: 'area',
        name: 'Horas Estudadas',
        data: seriesData,
        pointPlacement: 'on',
        fillOpacity: 0.2,
        color: '#06b6d4',
        lineColor: '#06b6d4'
    }],
    legend: { enabled: false },
    credits: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}