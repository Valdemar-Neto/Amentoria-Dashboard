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

    // Gráfico de Barras: Ranking de Matérias (Top 5 por dedicação)
    const subjectsRanking = sortedByTime.slice(0, 5).map(([subject, minutes]) => ({
        subject,
        hours: Math.round(minutes / 60) // Convertendo para horas para ficar bonito no gráfico
    }));

    // Gráfico de Pizza: Distribuição de Estudo (Top 4 + Outros)
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

    // Gráfico de Linha: Evolução das Notas
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

    return {
      cards: {
        totalStudents,
        averageScore,
        totalHoursStudied: totalHours,
        mostPopularSubject,
      },
      charts: {
        scoresEvolution,
        subjectsRanking,
        studyDistribution, 
      }
    };
  }
}