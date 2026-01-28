import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { Student } from '../../domain/entities/student.entity';
import { IHasher } from '../../domain/gateway/cryptography/hasher';
import { IEncrypter } from '../../domain/gateway/cryptography/encrypter';
import { UnauthorizedException } from '@nestjs/common';

// 1. Mock do Repositório
class InMemoryStudentsRepository implements IStudentsRepository {
  public items: Student[] = [];
  async create(student: Student): Promise<void> { this.items.push(student); }
  async findByEmail(email: string): Promise<Student | null> { 
    return this.items.find(item => item.email === email) || null; 
  }
  async findById(id: string): Promise<Student | null> { return null; }
  async count(): Promise<number> { return this.items.length; }
}

// 2. Mock do Hasher (Para Senhas)
class FakeHasher implements IHasher {
  async hash(plain: string): Promise<string> { return plain + '-hashed'; }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain + '-hashed' === hashed;
  }
}

// 3. Mock do Encrypter (Para JWT)
class FakeEncrypter implements IEncrypter {
  // Agora aceita Objeto (payload), conforme a interface nova
  async encrypt(payload: Record<string, unknown>): Promise<string> { 
    return JSON.stringify(payload) + '-fake-token'; 
  }
}

describe('Authenticate Student Use Case', () => {
  let studentsRepository: InMemoryStudentsRepository;
  let hasher: FakeHasher;
  let encrypter: FakeEncrypter;
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    hasher = new FakeHasher();
    encrypter = new FakeEncrypter();
    
    // Agora injetamos as 3 dependências
    sut = new AuthenticateUserUseCase(studentsRepository, hasher, encrypter);
  });

  it('should be able to authenticate with correct credentials', async () => {
    // 1. Criar aluno com senha hashada (usando o FakeHasher)
    const student = Student.create({
      name: 'Aluno Teste',
      email: 'aluno@teste.com',
      password: await hasher.hash('123456'), 
    });
    await studentsRepository.create(student);

    // 2. Tentar logar
    const result = await sut.execute({
      email: 'aluno@teste.com',
      password: '123456',
    });

    // 3. Validar retorno (Agora tem AccessToken)
    expect(result.id).toEqual(student.id);
    expect(result.accessToken).toBeDefined();
    expect(result.accessToken).toContain('-fake-token'); // Confirma que usou o FakeEncrypter
  });

  it('should NOT be able to authenticate with wrong password', async () => {
    const student = Student.create({
      name: 'Aluno Teste',
      email: 'aluno@teste.com',
      password: await hasher.hash('123456'),
    });
    await studentsRepository.create(student);

    await expect(
      sut.execute({
        email: 'aluno@teste.com',
        password: 'senha-errada', // Senha não bate com o hash
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