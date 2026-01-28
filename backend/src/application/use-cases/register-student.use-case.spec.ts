import { RegisterStudentUseCase } from './register-student.use-case';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { Student } from '../../domain/entities/student.entity';
import { IHasher } from '../../domain/gateway/cryptography/hasher'; // <--- Nova Interface

// Mock do Repositório
class InMemoryStudentsRepository implements IStudentsRepository {
  public items: Student[] = [];

  async create(student: Student): Promise<void> {
    this.items.push(student);
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find(item => item.email === email);
    return student || null;
  }

  async findById(id: string): Promise<Student | null> {
    return this.items.find(item => item.id === id) || null;
  }

  async count(): Promise<number> {
    return this.items.length;
  }
}

// Mock do Hasher (Implementa IHasher, não IEncrypter)
class FakeHasher implements IHasher {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }
  // O RegisterUseCase não usa o compare, mas a interface obriga a ter
  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed;
  }
}

describe('Register Student Use Case', () => {
  let studentsRepository: InMemoryStudentsRepository;
  let hasher: FakeHasher;
  let sut: RegisterStudentUseCase; 

  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    hasher = new FakeHasher();
    // Agora o construtor espera (Repo, Hasher), e é isso que estamos passando!
    sut = new RegisterStudentUseCase(studentsRepository, hasher);
  });

  it('should be able to register a new student', async () => {
    const response = await sut.execute({
      name: 'Futuro Médico',
      email: 'medicina@enem.com',
      password: '12345678'
    });

    expect(response.id).toBeDefined();
    expect(response.name).toEqual('Futuro Médico');
    expect(studentsRepository.items).toHaveLength(1); 
  });

  it('should NOT be able to register with same email twice', async () => {
    const input = {
      name: 'Concorrente',
      email: 'mesmo@email.com',
      password: '12345678'
    };

    await sut.execute(input);
    
    await expect(sut.execute(input)).rejects.toThrow('Este e-mail já está em uso.');
  });

  it('should be able to register a new student with hashed password', async () => {
    const response = await sut.execute({
      name: 'Futuro Médico',
      email: 'medicina@enem.com',
      password: 'senha-secreta'
    });

    expect(response.id).toBeDefined();
    
    const studentInDb = studentsRepository.items[0];
    expect(studentInDb.password).toEqual('senha-secreta-hashed');
  });
});