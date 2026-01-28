import { SimulationScore } from '../entities/simulation-score.entity';
import { StudySession } from '../entities/study-session.entity';

export interface DashboardFilters {
    studentId?: string; // Opcional, caso queira filtrar por aluno específico
    startDate?: Date;
    endDate?: Date;
    subject?: string; // select/dropdown
    searchQuery?: string; // busca livre
    categories?: string; // filtro checkbox
}

export interface IDashboardRepository {
  // Retorna os dados crus para calcularmos as métricas
    findScores(filters: DashboardFilters): Promise<SimulationScore[]>;
    findSessions(filters: DashboardFilters): Promise<StudySession[]>;
  
  // Poderíamos ter métodos que já retornam agregado, mas vamos começar simples
}