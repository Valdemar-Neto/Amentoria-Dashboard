import { SimulationScore } from '../entities/simulation-score.entity';
import { StudySession } from '../entities/study-session.entity';

export interface DashboardFilters {
  studentId?: string; 
  startDate?: Date;
  endDate?: Date;
  subject?: string; 
  searchQuery?: string; 
  categories?: string[]; 
}

export abstract class IDashboardRepository {
  abstract findScores(filters: DashboardFilters): Promise<SimulationScore[]>;
  abstract findSessions(filters: DashboardFilters): Promise<StudySession[]>;
  abstract createScore(score: SimulationScore): Promise<void>;
  abstract createSession(session: StudySession): Promise<void>;
  abstract deleteSession(id: string): Promise<void>;
  abstract findUniqueSubjects(studentId: string): Promise<string[]>;
  abstract updateScore(id: string, data: {score?: number, subject?: string}): Promise<void>;
  abstract findScoreById(id: string): Promise<any>;
}