import { Inject, Injectable } from '@nestjs/common';
import { IDashboardRepository, DashboardFilters } from '../../domain/repositories/dashboard-repository';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { DashboardStatsOutputs } from '../dtos/dashboard-stats-dto';

@Injectable()
export class GetDashboardStatsUseCase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepository,
    @Inject('IStudentsRepository')
    private readonly studentsRepository: IStudentsRepository, 
  ) {}

async execute(filters: DashboardFilters): Promise<DashboardStatsOutputs> {
    const scores = await this.dashboardRepository.findScores(filters);
    const sessions = await this.dashboardRepository.findSessions(filters);
    
    const totalStudents = this.studentsRepository.count ? await this.studentsRepository.count() : 0;

    // Média Geral
    const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;

    // Horas Totais (Baseado em Sessões)
    const totalMinutes = sessions.reduce((acc, curr) => acc + curr.minutes, 0);
    const totalHours = Math.round(totalMinutes / 60);

    // Mapa de Tempo por Matéria
    const timePerSubject = new Map<string, number>();

    sessions.forEach(session => {
        const currentMinutes = timePerSubject.get(session.subject) || 0;
        timePerSubject.set(session.subject, currentMinutes + session.minutes);
    });

    // Ordenar do maior para o menor
    const sortedByTime = [...timePerSubject.entries()].sort((a, b) => b[1] - a[1]);

    // Matéria mais popular é a que teve mais tempo de estudo
    const mostPopularSubject = sortedByTime.length > 0 ? sortedByTime[0][0] : 'N/A';

    // Gráfico de Barras: Ranking de Matérias 
    const subjectsRanking = sortedByTime.slice(0, 5).map(([subject, minutes]) => ({
        subject,
        hours: Math.round(minutes / 60) // Convertendo para horas 
    }));

    const topSubjects = sortedByTime.slice(0, 4);
    const otherSubjects = sortedByTime.slice(4);
    
    const studyDistribution = topSubjects.map(([subject, minutes]) => ({
        category: subject, 
        hours: Math.round(minutes / 60)
    }));

    if (otherSubjects.length > 0) {
        const otherMinutes = otherSubjects.reduce((acc, curr) => acc + curr[1], 0);
        studyDistribution.push({
            category: 'Outros',
            hours: Math.round(otherMinutes / 60)
        });
    }

    
    const scoresByDate = new Map<string, { total: number, count: number }>();
    scores.forEach(s => {
        const dateStr = s.date instanceof Date ? s.date.toISOString().split('T')[0] : new Date(s.date).toISOString().split('T')[0];
        const current = scoresByDate.get(dateStr) || { total: 0, count: 0 };
        scoresByDate.set(dateStr, { total: current.total + s.score, count: current.count + 1 });
    });

    const scoresEvolution = [...scoresByDate.entries()].map(([date, data]) => ({
        date,
        score: Math.round(data.total / data.count)
    })).sort((a, b) => a.date.localeCompare(b.date));

    
    // Grafico de barras por categoria de estudo
    const timePerCategory = new Map<string, number>();

    sessions.forEach(session => {
        
        const category = session.category || 'OUTROS';
        const currentMinutes = timePerCategory.get(category) || 0;
        timePerCategory.set(category, currentMinutes + session.minutes);
    });

    const categoryDistribution = [...timePerCategory.entries()].map(([category, minutes]) => ({
        category,
        hours: Math.round(minutes / 60)
    }));

    const subjectScoresMap = new Map<string, Map<string, { total: number, count: number }>>();

    scores.forEach(s => {
      const dateStr = s.date instanceof Date ? s.date.toISOString().split('T')[0] : new Date(s.date).toISOString().split('T')[0];
      const subject = s.subject || 'Geral';

      if (!subjectScoresMap.has(subject)) {
          subjectScoresMap.set(subject, new Map());
      }

      const dayMap = subjectScoresMap.get(subject)!;
      const current = dayMap.get(dateStr) || { total: 0, count: 0 };
      dayMap.set(dateStr, { total: current.total + s.score, count: current.count + 1 });
    });

    const subjectScoresEvolution = [...subjectScoresMap.entries()].map(([subject, dayMap]) => ({
        subject,
        data: [...dayMap.entries()]
            .map(([date, data]) => ({ date, score: Math.round(data.total / data.count) }))
            .sort((a, b) => a.date.localeCompare(b.date))
    }));

    return {
      cards: {
        totalStudents,
        averageScore,
        totalHoursStudied: totalHours,
        mostPopularSubject,
      },
      charts: {
        scoresEvolution,
        subjectScoresEvolution,
        subjectsRanking,
        studyDistribution, 
        categoryDistribution,
      }
    };
  }
}