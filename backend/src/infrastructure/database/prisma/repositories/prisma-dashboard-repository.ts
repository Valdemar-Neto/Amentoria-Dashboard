import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IDashboardRepository, DashboardFilters } from '../../../../domain/repositories/dashboard-repository';
import { SimulationScore } from '../../../../domain/entities/simulation-score.entity';
import { StudySession } from '../../../../domain/entities/study-session.entity';
import { PrismaSimulationScoreMapper } from '../mappers/prisma-simulation-score-mapper';
import { PrismaStudySessionMapper } from '../mappers/prisma-study-session-mapper';

@Injectable()
export class PrismaDashboardRepository implements IDashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause(filters: DashboardFilters) {
    // Começamos apenas com o ID do aluno
    const where: any = {
      studentId: filters.studentId,
    };

    // 1. Filtro de Data
    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = filters.startDate;
      if (filters.endDate) where.date.lte = filters.endDate;
    }

    // 2. Busca por Texto (Search Query) - Prioridade sobre o Subject simples
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      where.subject = {
        contains: filters.searchQuery,
        mode: 'insensitive',
      };
    } 
    // 3. Se NÃO tiver busca, mas tiver Select (Dropdown), usa o Select
    else if (filters.subject) {
      where.subject = filters.subject;
    }

    return where;
  }

  async findScores(filters: DashboardFilters): Promise<SimulationScore[]> {
    const where = this.buildWhereClause(filters);

    const rawScores = await this.prisma.simulationScore.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    return rawScores.map(PrismaSimulationScoreMapper.toDomain);
  }

  async findSessions(filters: DashboardFilters): Promise<StudySession[]> {
    const where = this.buildWhereClause(filters);

    // 4. Filtro de Categorias (Checkbox)
    // Validamos se é um Array E se tem itens dentro
    if (Array.isArray(filters.categories) && filters.categories.length > 0) {
      where.category = { in: filters.categories };
    }

    const rawSessions = await this.prisma.studySession.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    return rawSessions.map(PrismaStudySessionMapper.toDomain);
  }

  async createScore(score: SimulationScore): Promise<void> {
    const data = PrismaSimulationScoreMapper.toPrisma(score);
    await this.prisma.simulationScore.create({ data });
  }

  async createSession(session: StudySession): Promise<void> {
    const data = PrismaStudySessionMapper.toPrisma(session);
    await this.prisma.studySession.create({ data });
  }

  async deleteSession(id: string): Promise<void> {
    await this.prisma.studySession.delete({ where: { id } });
  }

  async findUniqueSubjects(studentId: string): Promise<string[]> {
    const sessions = await this.prisma.studySession.findMany({
      where: { studentId },
      distinct: ['subject'],
      select: { subject: true }
    });
    return sessions.map(s => s.subject);
  }

  async updateScore(id: string, data: { score?: number; subject?: string; }): Promise<void> {
      await this.prisma.simulationScore.update({
        where: {id},
        data,
      });
  }

  async findScoreById(id: string): Promise<any> {
      return await this.prisma.simulationScore.findUnique({where:{id}});
  }
}