import { Controller, Get, Post, Query, Body, Param, Delete, Inject, UseGuards, Req } from '@nestjs/common';
import { GetDashboardStatsUseCase } from '../../../application/use-cases/get-dashboard-stats.use-case';
import { RegisterStudySessionUseCase } from '../../../application/use-cases/register-study-session.use-case';
import { RegisterSimulationScoreUseCase } from '../../../application/use-cases/register-simulation-score.use-case';
import { GetStudentSessionsUseCase } from '../../../application/use-cases/get-student-sessions.use-case';
import { DeleteStudySessionUseCase } from '../../../application/use-cases/delete-study-session.use-case';
import { IDashboardRepository } from '../../../domain/repositories/dashboard-repository';
import { AuthGuard } from '../guards/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard) // Protege todas as rotas abaixo
export class DashboardController {
  constructor(
    private readonly getDashboardStats: GetDashboardStatsUseCase,
    private readonly registerSession: RegisterStudySessionUseCase,
    private readonly registerScore: RegisterSimulationScoreUseCase,
    private readonly getStudentSessions: GetStudentSessionsUseCase,
    private readonly deleteStudySession: DeleteStudySessionUseCase,

    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  @Get()
  async getStats(
    @Req() request: any, // <--- Pega o request para ler o usuário logado
    @Query('subject') subject?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('q') searchQuery?: string,
    @Query('categories') categories?: string,
  ) {
    // O studentId agora é extraído do Token JWT injetado pelo Guard
    const studentId = request.user.sub;

    return await this.getDashboardStats.execute({
      studentId, // Identidade garantida pelo servidor
      subject,
      searchQuery,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      categories: categories ? categories.split(',') : undefined,
    });
  }

  @Post('sessions')
  async createSession(@Req() request: any, @Body() body: any) {
    // Forçamos o studentId do token para evitar que alguém poste dados para outro user
    await this.registerSession.execute({
      ...body,
      studentId: request.user.sub,
    });
    return { message: 'Sessão registrada com sucesso!' };
  }

  @Post('scores')
  async createScore(@Req() request: any, @Body() body: any) {
    await this.registerScore.execute({
      ...body,
      studentId: request.user.sub,
    });
    return { message: 'Nota registrada com sucesso!' };
  }

  @Get('sessions/history')
  async getHistory(@Req() request: any) {
    const studentId = request.user.sub;
    return await this.getStudentSessions.execute(studentId);
  }

  @Get('subjects')
  async getSubjects(@Req() request: any) {
    const studentId = request.user.sub;
    return await this.dashboardRepository.findUniqueSubjects(studentId);
  }

  @Delete('sessions/:id')
  async delete(@Param('id') id: string) {
    // Nota: Aqui você pode opcionalmente validar se a sessão pertence ao usuário logado no Use Case
    await this.deleteStudySession.execute(id);
    return { message: 'Removido com sucesso' };
  }
}