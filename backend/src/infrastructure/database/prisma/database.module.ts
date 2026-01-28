import { Module } from "@nestjs/common";    
import { PrismaService } from "./prisma.service";
import { PrismaStudentRepository } from "./repositories/prisma-student-repository";


//Responsavel por entregar um repositorio de estudantes

@Module({
    providers:[
        PrismaService,
        {
            provide: 'IStudentsRepository',
            useClass: PrismaStudentRepository,
        },
    ],

    exports: [
        PrismaService,
        'IStudentsRepository',
    ],
})

export class DatabaseModule{}

