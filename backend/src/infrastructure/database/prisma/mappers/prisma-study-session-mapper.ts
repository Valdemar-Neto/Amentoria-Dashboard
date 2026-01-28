import { StudySession } from "../../../../domain/entities/study-session.entity";
import { StudySession as PrismaSession } from "@prisma/client";

// Faz a conversao dos dados de estudos quando receber o arquivo json

type SessionCategory = 'AULA'|'EXERCICIO'|'REVISAO';
export class PrismaStudySessionMapper{
    static toDomain(raw: PrismaSession): StudySession{

        let validCategory: SessionCategory = 'AULA';

        if(raw.category === 'AULA' || raw.category === 'EXERCICIO' || raw.category === 'REVISAO'){
            validCategory = raw.category as SessionCategory;
        }

        return StudySession.create(
            {
                studentId: raw.studentId,
                minutes: raw.minutes,
                subject: raw.subject,
                category: validCategory,
                date: raw.date,
            }, 
            raw.id,
        );
    }

    static toPrisma(session: StudySession) {
        return {
        id: session.id,
        studentId: session.studentId,
        minutes: session.minutes,
        subject: session.subject,
        category: session.category,
        date: session.date,
        };
    }
}