import { Injectable, Inject } from "@nestjs/common";
import { IDashboardRepository } from "src/domain/repositories/dashboard-repository";

@Injectable()
export class DeleteStudySessionUseCase {
  constructor(@Inject('IDashboardRepository') private repo: IDashboardRepository) {}
  async execute(id: string): Promise<void> {
    await this.repo.deleteSession(id);
  }
}