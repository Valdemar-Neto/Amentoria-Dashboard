import { Student } from '../entities/student.entity';

export interface IStudentsRepository {
  create(student: Student): Promise<void>;
  findByEmail(email: string): Promise<Student | null>;
  findById(id: string): Promise<Student | null>;
  count(): Promise<number>;
  updatePassword(id: string, passwordHash:string): Promise<void>;
}