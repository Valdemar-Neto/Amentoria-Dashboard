import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HeatmapModule from 'highcharts/modules/heatmap';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';

export function StudyHeatmap() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (typeof HeatmapModule === 'function') {
        (HeatmapModule as any)(Highcharts);
      } else if (typeof HeatmapModule === 'object') {
        (HeatmapModule as any)(Highcharts);
      }
    } catch (e) {
       console.warn("Heatmap já inicializado");
    }

    async function fetchHistory() {
      try {
        const response = await api.get('/dashboard/sessions/history');
        const sessions = response.data; 

        const dailyCounts: Record<string, number> = {};
        
        if (sessions && Array.isArray(sessions)) {
          sessions.forEach((session: any) => {
            const dataObj = session.props ? session.props : session;
            const dateStr = dataObj.date || dataObj.createdAt;
            
            if (dateStr) {
              const date = new Date(dateStr).setHours(0,0,0,0);
              dailyCounts[date] = (dailyCounts[date] || 0) + 1;
            }
          });
        }

        const formattedData = Object.entries(dailyCounts).map(([timestamp, count]) => [
          Number(timestamp),
          count > 4 ? 4 : count 
        ]);

        setChartData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar histórico para o Heatmap", error);
      }
    }
    
    fetchHistory();
  }, []);

  const options: Highcharts.Options = {
    chart: { 
      type: 'heatmap', 
      backgroundColor: 'transparent', 
      height: 180, 
      style: { fontFamily: 'Inter, sans-serif' } 
    },
    title: { text: undefined },
    xAxis: { 
      type: 'datetime', 
      visible: false 
    },
    yAxis: { 
      visible: false,
      startOnTick: false,
      endOnTick: false 
    },
    colorAxis: {
      min: 0,
      max: 4,
      stops: [
        [0, isDark ? '#1e293b' : '#f1f5f9'], 
        [0.25, isDark ? '#164e63' : '#cffafe'], 
        [0.5, '#06b6d4'],                      
        [0.75, '#22d3ee'],
        [1, '#7c3aed']                         
      ]
    },
    tooltip: {
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      style: { color: isDark ? '#fff' : '#0f172a' },
      formatter: function (this: any) {
        return `<b>${Highcharts.dateFormat('%e %b, %Y', this.x)}</b><br>Sessões: ${this.point.value}`;
      }
    },
    series: [{
      type: 'heatmap',
      name: 'Estudos',
      data: chartData,
      colsize: 24 * 36e5, 
      borderWidth: 2,
      borderColor: isDark ? '#0f172a' : '#fff', 
      borderRadius: 2
    }],
    credits: { enabled: false },
    legend: { enabled: false }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}