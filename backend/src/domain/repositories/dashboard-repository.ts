import { SimulationScore } from '../entities/simulation-score.entity';
import { StudySession } from '../entities/study-session.entity';

export interface DashboardFilters {
  studentId?: string; // Opcional, caso queira filtrar por aluno específico
  startDate?: Date;
  endDate?: Date;
  subject?: string; // select/dropdown
  searchQuery?: string; // busca livre
  categories?: string[]; // filtro checkbox
}

export abstract class IDashboardRepository {
  // Retorna os dados crus para calcularmos as métricas
  abstract findScores(filters: DashboardFilters): Promise<SimulationScore[]>;
  abstract findSessions(filters: DashboardFilters): Promise<StudySession[]>;

  // Função para criar nova sessao e novas notas
  abstract createScore(score: SimulationScore): Promise<void>;
  abstract createSession(session: StudySession): Promise<void>;

  //funcao para deletar sessao e buscar por um unica materia
  abstract deleteSession(id: string): Promise<void>;
  abstract findUniqueSubjects(studentId: string): Promise<string[]>;

  // funcao para atualizar nota e validacao antes de enviar
  abstract updateScore(id: string, data: {score?: number, subject?: string}): Promise<void>;
  abstract findScoreById(id: string): Promise<any>;
}