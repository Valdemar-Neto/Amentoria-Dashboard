import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { Student } from '../../domain/entities/student.entity';
import { Encrypter } from '../gateways/encrypter.gateway';
import { UnauthorizedException } from '@nestjs/common';

// Mocks (Você pode copiar do teste anterior ou criar um arquivo de mocks compartilhado)
class InMemoryStudentsRepository implements IStudentsRepository {
  public items: Student[] = [];
  async create(student: Student): Promise<void> { this.items.push(student); }
  async findByEmail(email: string): Promise<Student | null> { 
    return this.items.find(item => item.email === email) || null; 
  }
  async findById(id: string): Promise<Student | null> { return null; }
  async count(): Promise<number> {return this.items.length}
}
class FakeEncrypter implements Encrypter {
  async encrypt(plainText: string): Promise<string> { return plainText + '-hashed'; }
  // Simula a comparação real: verifica se o hash termina com o sufixo que a gente inventou
  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return plainText + '-hashed' === hashedText;
  }
}

describe('Authenticate User Use Case', () => {
  let studentsRepository: InMemoryStudentsRepository;
  let encrypter: FakeEncrypter;
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    encrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(studentsRepository, encrypter);
  });

  it('should be able to authenticate with correct credentials', async () => {
    // 1. Criar um usuário no "banco"
    const student = Student.create({
      name: 'Aluno Teste',
      email: 'aluno@teste.com',
      password: await encrypter.encrypt('123456'), // Senha já criptografada
    });
    await studentsRepository.create(student);

    // 2. Tentar logar
    const result = await sut.execute({
      email: 'aluno@teste.com',
      password: '123456',
    });

    expect(result.id).toEqual(student.id);
  });

  it('should NOT be able to authenticate with wrong password', async () => {
    const student = Student.create({
      name: 'Aluno Teste',
      email: 'aluno@teste.com',
      password: await encrypter.encrypt('123456'),
    });
    await studentsRepository.create(student);

    await expect(
      sut.execute({
        email: 'aluno@teste.com',
        password: 'senha-errada',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should NOT be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'nao-existe@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});