import { Student } from "../../../../domain/entities/student.entity";
import { Student as PrismaStudent} from '@prisma/client';

// Faz a conversão dos dados quando receber o arquivo json do banco
export class PrismaStudentMapper{
    //Convertendo para o banco de dados
    static toPrisma(student: Student){
        return{
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
            createdAt: student.createdAt,
        };
    }

    //convertendo do banco para a Entidade
    static toDoamin(raw: PrismaStudent): Student{
        return Student.create({
            name: raw.name,
            email: raw.email,
            password: raw.password,
        }, raw.id,);
    }
}