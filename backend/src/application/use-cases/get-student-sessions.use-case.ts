import { Inject, Injectable } from "@nestjs/common";
import { IDashboardRepository } from "src/domain/repositories/dashboard-repository";

@Injectable()
export class GetStudentSessionsUseCase {
  constructor(@Inject('IDashboardRepository') private repo: IDashboardRepository) {}
  async execute(studentId: string) {
    return await this.repo.findSessions({ studentId });
  }
}