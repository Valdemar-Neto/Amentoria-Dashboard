import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IStudentsRepository } from "../../../../domain/repositories/students-repository";
import { Student } from "../../../../domain/entities/student.entity";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

// Responsavel por implementar a inteface PrismaStudentRepository e gravar no Banco de Dados
@Injectable()
export class PrismaStudentRepository implements IStudentsRepository{
    constructor(private readonly prisma: PrismaService){}

    async create(student: Student): Promise<void>{
        const data =  PrismaStudentMapper.toPrisma(student);

        await this.prisma.student.create({
            data,
        }); 
    }

    async findByEmail(email: string): Promise<Student | null> {
        const raw = await this.prisma.student.findUnique({
            where: {email},
        });

        if(!raw) return null;

        return PrismaStudentMapper.toDoamin(raw);
    }

    async findById(id: string): Promise<Student | null> {
        const raw = await this.prisma.student.findUnique({
            where: {id}
        })

        if(!raw) return null;

        return PrismaStudentMapper.toDoamin(raw);
    }

    async count(): Promise<number>{
        return this.prisma.student.count();
    }

    async updatePassword(id: string, passwordHash: string): Promise<void> {
        await this.prisma.student.update({
            where: {id}, 
            data: {password: passwordHash}
        })
    }

}