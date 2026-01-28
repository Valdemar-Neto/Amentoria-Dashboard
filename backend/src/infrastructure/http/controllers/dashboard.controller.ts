import { Controller, Get, Post, Query, Body, Param, Delete, Inject, UseGuards, Req } from '@nestjs/common';
import { GetDashboardStatsUseCase } from '../../../application/use-cases/get-dashboard-stats.use-case';
import { RegisterStudySessionUseCase } from '../../../application/use-cases/register-study-session.use-case';
import { RegisterSimulationScoreUseCase } from '../../../application/use-cases/register-simulation-score.use-case';
import { GetStudentSessionsUseCase } from '../../../application/use-cases/get-student-sessions.use-case';
import { DeleteStudySessionUseCase } from '../../../application/use-cases/delete-study-session.use-case';
import { IDashboardRepository } from '../../../domain/repositories/dashboard-repository';
import { AuthGuard } from '../guards/auth.guard';
import { 
  ApiTags, 
  ApiBearerAuth, 
  ApiOperation, 
  ApiQuery, 
  ApiResponse, 
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Dashboard') // Agrupa as rotas no Swagger UI
@ApiBearerAuth()      // Ativa a autenticação JWT no Swagger
@UseGuards(AuthGuard)
@Controller('dashboard')
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
  @ApiOperation({ summary: 'Obter estatísticas resumidas para os gráficos do dashboard' })
  @ApiQuery({ name: 'subject', required: false, description: 'Filtrar por matéria específica' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Data de início (ISO Format)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Data de fim (ISO Format)' })
  async getStats(
    @Req() request: any,
    @Query('subject') subject?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('q') searchQuery?: string,
    @Query('categories') categories?: string,
  ) {
    const studentId = request.user.sub;

    return await this.getDashboardStats.execute({
      studentId,
      subject,
      searchQuery,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      categories: categories ? categories.split(',') : undefined,
    });
  }

  @Post('sessions')
  @ApiOperation({ summary: 'Registrar uma nova sessão de estudo' })
  @ApiResponse({ status: 201, description: 'Sessão registrada com sucesso.' })
  async createSession(@Req() request: any, @Body() body: any) {
    await this.registerSession.execute({
      ...body,
      studentId: request.user.sub,
    });
    return { message: 'Sessão registrada com sucesso!' };
  }

  @Post('scores')
  @ApiOperation({ summary: 'Registrar a nota de um simulado' })
  async createScore(@Req() request: any, @Body() body: any) {
    await this.registerScore.execute({
      ...body,
      studentId: request.user.sub,
    });
    return { message: 'Nota registrada com sucesso!' };
  }

  @Get('sessions/history')
  @ApiOperation({ summary: 'Listar histórico completo de sessões do aluno' })
  async getHistory(@Req() request: any) {
    const studentId = request.user.sub;
    return await this.getStudentSessions.execute(studentId);
  }

  @Get('subjects')
  @ApiOperation({ summary: 'Listar todas as matérias únicas já estudadas pelo aluno' })
  async getSubjects(@Req() request: any) {
    const studentId = request.user.sub;
    return await this.dashboardRepository.findUniqueSubjects(studentId);
  }

  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Remover um registro de sessão de estudo' })
  @ApiParam({ name: 'id', description: 'UUID da sessão de estudo' })
  async delete(@Param('id') id: string) {
    await this.deleteStudySession.execute(id);
    return { message: 'Removido com sucesso' };
  }
}