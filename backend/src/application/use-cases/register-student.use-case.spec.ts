import { RegisterStudentUseCase } from './register-student.use-case';
import { IStudentsRepository } from '../../domain/repositories/students-repository';
import { Student } from '../../domain/entities/student.entity';
import { Encrypter } from '../gateways/encrypter.gateway';

// Mock simples do Repositório
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
    const student = this.items.find(item => item.id === id);
    return student || null;
  }
}

class FakeEncrypter implements Encrypter{
    async encrypt(plainText: string): Promise<string> {
        return plainText.concat('-hashed');
    }

    async compare(plainText: string, hashedText: string): Promise<boolean> {
        return plainText.concat('-hashed') == hashedText;
    }
}

describe('Register Student Use Case', () => {
  let studentsRepository: InMemoryStudentsRepository;
  let encrypter: FakeEncrypter;
  let sut: RegisterStudentUseCase; 

  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    encrypter = new FakeEncrypter();
    sut = new RegisterStudentUseCase(studentsRepository, encrypter);
  });

  it('should be able to register a new student', async () => {
    const response = await sut.execute({
      name: 'Futuro Médico',
      email: 'medicina@enem.com',
      password: '12345678'
    });

    expect(response.id).toBeDefined();
    expect(response.name).toEqual('Futuro Médico');
    // Verifica se realmente salvou no repositório fake
    expect(studentsRepository.items).toHaveLength(1); 
  });

  it('should NOT be able to register with same email twice', async () => {
    const input = {
      name: 'Concorrente',
      email: 'mesmo@email.com',
      password: '12345678'
    };

    // Adiciona o primeiro
    await sut.execute(input);

    // Tenta adicionar o segundo igual
    await expect(sut.execute(input)).rejects.toThrow('Este e-mail já está em uso.');
  });

  it('should be able to register a new student with hashed password', async () => {
    const response = await sut.execute({
      name: 'Futuro Médico',
      email: 'medicina@enem.com',
      password: 'senha-secreta'
    });

    expect(response.id).toBeDefined();
    
    // Verificamos se no "banco" a senha foi salva hashada
    const studentInDb = studentsRepository.items[0];
    expect(studentInDb.password).toEqual('senha-secreta-hashed');
  });
});