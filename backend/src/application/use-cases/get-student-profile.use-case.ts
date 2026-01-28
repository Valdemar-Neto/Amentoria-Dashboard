import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IStudentsRepository } from "../../domain/repositories/students-repository";

@Injectable()
export class GetStudentProfileUseCase {
  constructor(@Inject('IStudentsRepository') private studentsRepo: IStudentsRepository) {}

  async execute(id: string) {
    const student = await this.studentsRepo.findById(id);
    if (!student) throw new NotFoundException('Aluno não encontrado');
    
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt
    };
  }
}