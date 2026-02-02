import { Inject, Injectable } from '@nestjs/common';
import { IDashboardRepository } from '../../domain/repositories/dashboard-repository';
import { StudySession } from '../../domain/entities/study-session.entity';

interface RegisterStudySessionInput {
  studentId: string;
  subject: string;
  minutes: number;
  category: 'AULA' | 'EXERCICIO' | 'REVISAO';
  date: Date;
}

@Injectable()
export class RegisterStudySessionUseCase {
  constructor(
    @Inject('IDashboardRepository')
    private dashboardRepository: IDashboardRepository
  ) {}

  async execute(input: RegisterStudySessionInput): Promise<void> {
    
    const session = StudySession.create({
      ...input,
      date: new Date(input.date),
    });

    await this.dashboardRepository.createSession(session);
  }
}