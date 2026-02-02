import { Body, Controller, Post, HttpCode, UnauthorizedException, ConflictException, Get, Req, Put} from "@nestjs/common";
import { RegisterStudentUseCase } from "../../../application/use-cases/register-student.use-case";
import { AuthenticateUserUseCase } from "../../../application/use-cases/authenticate-user.use-case";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { AuthenticateDto } from "../dtos/authenticate-account.dto";
import { GetStudentProfileUseCase } from "../../../application/use-cases/get-student-profile.use-case";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { UseGuards } from "@nestjs/common";
import { ChangePasswordUseCase } from "src/application/use-cases/change-password.use-case";
import { ChangePasswordDto } from "../dtos/change-password.dto";


@ApiTags('Authentication') // Separar do auth
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerStudent: RegisterStudentUseCase,
    private readonly authenticateStudent: AuthenticateUserUseCase,
    private readonly getStudentProfile: GetStudentProfileUseCase,
    private readonly putPassword: ChangePasswordUseCase,
  ) {}

  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria uma nova conta de aluno' })
  async create(@Body() body: CreateAccountDto) {
    try {
      const output = await this.registerStudent.execute(body);
      return { message: 'Student created successfully', id: output.id };
    } catch (error: any) {
      console.log("Erro no Use Case:", error.message);
      if (error.message === 'Este e-mail já está em uso.') {
        throw new ConflictException('Este e-mail já está cadastrado.');
      }
      throw error;
    }
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Realiza login e retorna o token JWT' })
  async login(@Body() body: AuthenticateDto) {
    try {
      const result = await this.authenticateStudent.execute(body);
      return {
        accessToken: result.accessToken,
        user: { id: result.id, name: result.name, email: result.email }
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('me')
  @UseGuards(AuthGuard) // protecao 
  @ApiBearerAuth()     
  @ApiOperation({ summary: 'Retorna os dados do aluno logado' })
  async getMe(@Req() request: any) {
    const studentId = request.user.sub;
    return await this.getStudentProfile.execute(studentId);
  }

  @Put('change-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Alterar senha do aluno'})
  async changePassword(@Req() request: any, @Body() body: ChangePasswordDto){
    await this.putPassword.execute({
      studentId: request.user.sub,
      oldPassword: body.oldPassword,
      newPassword: body.newPassword,
    });

    return{ message: 'Senha alterada com sucesso'};
  }


}