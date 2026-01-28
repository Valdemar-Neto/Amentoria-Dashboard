import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { Encrypter } from '../gateways/encrypter.gateway';
import { AuthenticateUserInput, AuthenticateUserOutput } from '../dtos/authenticate-user-dto';


@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('IStudentsRepository')
    private readonly studentsRepository: IStudentsRepository,
    @Inject('Encrypter')
    private readonly encrypter: Encrypter,
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const student = await this.studentsRepository.findByEmail(input.email);

    if (!student) {
      // Por segurança, usamos mensagem genérica para não revelar que o email existe
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    //Validar senha (usando a porta do Encrypter)
    const isPasswordValid = await this.encrypter.compare(
      input.password,
      student.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    //Retornar dados do usuário
    return {
      id: student.id,
      name: student.name,
      email: student.email,
    };
  }
}