import { Inject, Injectable } from '@nestjs/common';
import { IDashboardRepository } from '../../domain/repositories/dashboard-repository';
import { SimulationScore } from '../../domain/entities/simulation-score.entity';

interface RegisterSimulationScoreInput {
  studentId: string;
  subject: string;
  score: number;
  date: Date;
}

@Injectable()
export class RegisterSimulationScoreUseCase {
  constructor(
    @Inject('IDashboardRepository')
    private dashboardRepository: IDashboardRepository
  ) {}

  async execute(input: RegisterSimulationScoreInput): Promise<void> {
    const simulationScore = SimulationScore.create({
      ...input,
      date: new Date(input.date),
    });

    await this.dashboardRepository.createScore(simulationScore);
  }
}