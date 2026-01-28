import { Module } from "@nestjs/common";    
import { PrismaService } from "./prisma.service";
import { PrismaStudentRepository } from "./repositories/prisma-student-repository";
import { PrismaDashboardRepository } from "./repositories/prisma-dashboard-repository";


//Responsavel por entregar um repositorio de estudantes

@Module({
    providers:[
        PrismaService,
        //repositorio de alunos
        {
            provide: 'IStudentsRepository',
            useClass: PrismaStudentRepository,
        },

        //repositorio de dashboard
        {
            provide: 'IDashboardRepository',
            useClass: PrismaDashboardRepository,
        },
    ],

    exports: [
        PrismaService,
        'IStudentsRepository',
        'IDashboardRepository',
    ],
})

export class DatabaseModule{}

