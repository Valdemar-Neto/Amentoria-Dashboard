import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { BcryptHasher } from '../../infrastructure/cryptography/bcrypt-hasher';

interface ChangePasswordInput {
  studentId: string;
  oldPassword: string;
  newPassword: string;
}

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject('IStudentsRepository') private studentsRepo: IStudentsRepository,
    private hasher: BcryptHasher,
  ) {}

  async execute(input: ChangePasswordInput): Promise<void> {
    const student = await this.studentsRepo.findById(input.studentId);
    if (!student) throw new UnauthorizedException('Aluno não encontrado.');

    // Verifica se a senha antiga está correta
    const isPasswordValid = await this.hasher.compare(input.oldPassword, student.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('A senha atual está incorreta.');
    }

    // Gera o novo hash e salva
    const hashedNewPassword = await this.hasher.hash(input.newPassword);
    await this.studentsRepo.updatePassword(student.id, hashedNewPassword);
  }
}