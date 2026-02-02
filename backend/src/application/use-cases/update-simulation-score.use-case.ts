import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { IDashboardRepository } from '../../domain/repositories/dashboard-repository';

interface UpdateScoreInput {
  id: string;
  studentId: string;
  score?: number;
  subject?: string;
}

@Injectable()
export class UpdateSimulationScoreUseCase {
  constructor(
    @Inject('IDashboardRepository') 
    private readonly dashboardRepository: IDashboardRepository
  ) {}

  async execute(input: UpdateScoreInput): Promise<void> {
    const score = await this.dashboardRepository.findScoreById(input.id);

    if (!score) {
      throw new NotFoundException('Registro de nota não encontrado.');
    }

    //aluno não pode alterar nota de outro alno
    if (score.studentId !== input.studentId) {
      throw new ForbiddenException('Você não tem permissão para editar este registro.');
    }

    await this.dashboardRepository.updateScore(input.id, {
      score: input.score,
      subject: input.subject,
    });
  }
}