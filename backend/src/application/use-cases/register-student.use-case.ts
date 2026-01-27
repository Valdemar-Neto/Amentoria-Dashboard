import { Inject, Injectable } from "@nestjs/common";
import { Student } from '../../domain/entities/student.entity';
import {IStudentsRepository} from '../../domain/repositories/students-repository';
import { RegisterStudentInput, RegisterStudentOutput } from "../dtos/register-student-dto";
import { Encrypter } from "../gateways/encrypter.gateway";
//Permitindo que o Nest injete dependencias

@Injectable()
export class RegisterStudentUseCase{
    constructor(
        @Inject('IStudentsRepository')
        private readonly studensRepository: IStudentsRepository,

        @Inject('Encrypter')
        private readonly encrypter: Encrypter,
    ){}


    async execute(input: RegisterStudentInput): Promise<RegisterStudentOutput>{
        const existingStuden =  await this.studensRepository.findByEmail(input.email);

        if(existingStuden){
            throw new Error("Este e-mail já está em uso.");
        }

        const hashedPassword = await this.encrypter.encrypt(input.password);

        const student = Student.create({
            name: input.name,
            email: input.email,
            password: hashedPassword,
        });

        await this.studensRepository.create(student);

        return{
            id: student.id,
            name: student.name,
            email: student.email,
            createdAt: student.createdAt,
        }
    }

}