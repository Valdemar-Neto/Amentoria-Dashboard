import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { IEncrypter } from '../../domain/gateway/cryptography/encrypter';
import { IHasher } from '../../domain/gateway/cryptography/hasher';
import { AuthenticateUserInput, AuthenticateUserOutput } from '../dtos/authenticate-user-dto';


@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('IStudentsRepository')
    private readonly studentsRepository: IStudentsRepository,
    @Inject('IHasher')
    private readonly hasher: IHasher,
    @Inject('IEncrypter')
    private readonly encrypter: IEncrypter,
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const student = await this.studentsRepository.findByEmail(input.email);

    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //Validar senha
    const isPasswordValid = await this.hasher.compare(
      input.password,
      student.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const token = await this.encrypter.encrypt({
        sub: student.id,
    });

    //Retornar dados do usuário
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      accessToken: token, 
    };
  }
}