import { Student } from "src/domain/entities/student.entity";
import { SimulationScore } from "../../../../domain/entities/simulation-score.entity";
import { SimulationScore as PrismaScore } from "@prisma/client";

// Faz a conversao dos dados quando reecber o json do banco de dados
export class PrismaSimulationScoreMapper {
  static toDomain(raw: PrismaScore): SimulationScore {
    return SimulationScore.create(
      {
        studentId: raw.studentId,
        score: raw.score,
        subject: raw.subject,
        date: raw.date,
      },
      raw.id,
    );
  }

  static toPrisma(score: SimulationScore) {
    return {
      id: score.id,
      studentId: score.studentId,
      score: score.score,
      subject: score.subject,
      date: score.date,
    };
  }
}