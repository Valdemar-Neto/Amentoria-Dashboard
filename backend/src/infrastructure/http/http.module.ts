import { Inject, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/prisma/database.module";
import { AuthenticateUserUseCase } from "../../application/use-cases/authenticate-user.use-case";
import { BcryptHasher } from "../cryptography/bcrypt-hasher";
import { JwtEncrypter } from "../cryptography/jwt-encrypter";
import { RegisterStudentUseCase } from "src/application/use-cases/register-student.use-case";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
@Module({
    imports: [DatabaseModule, JwtModule.register({global: true, secret: 'secret-key-123', signOptions:{ expiresIn: '1d'}})],
    controllers:[AuthController],
    providers:[

        BcryptHasher,
        JwtEncrypter, 
        {
            provide: RegisterStudentUseCase,
            useFactory: (repo, hasher) => new RegisterStudentUseCase(repo, hasher),
            inject: ['IStudentsRepository', BcryptHasher],
        },
        {
            provide: AuthenticateUserUseCase,
            useFactory: (repo,hasher, encrypter) => new AuthenticateUserUseCase(repo, hasher, encrypter),
            inject: [
                'IStudentsRepository',
                BcryptHasher,
                JwtEncrypter,
            ],
        },
    ]
})

export class HttpModule{}