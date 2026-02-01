import { Inject, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/prisma/database.module";
import { AuthenticateUserUseCase } from "../../application/use-cases/authenticate-user.use-case";
import { BcryptHasher } from "../cryptography/bcrypt-hasher";
import { JwtEncrypter } from "../cryptography/jwt-encrypter";
import { RegisterStudentUseCase } from "src/application/use-cases/register-student.use-case";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { DashboardController } from "./controllers/dashboard.controller";
import { GetDashboardStatsUseCase } from "../../application/use-cases/get-dashboard-stats.use-case";
import { RegisterStudySessionUseCase } from "../..//application/use-cases/register-study-session.use-case";
import { RegisterSimulationScoreUseCase } from "../../application/use-cases/register-simulation-score.use-case";
import { GetStudentProfileUseCase } from "../../application/use-cases/get-student-profile.use-case";
import { GetStudentSessionsUseCase } from "../../application/use-cases/get-student-sessions.use-case";
import { DeleteStudySessionUseCase } from "../../application/use-cases/delete-study-session.use-case";
import { ChangePasswordUseCase } from "src/application/use-cases/change-password.use-case";
import { UpdateSimulationScoreUseCase } from "src/application/use-cases/update-simulation-score.use-case";
@Module({
    imports: [DatabaseModule, JwtModule.register({global: true, secret: process.env.SECRET_KEY, signOptions:{ expiresIn: '7d'}})],
    controllers:[AuthController,DashboardController],
    providers:[

        BcryptHasher,
        JwtEncrypter,
        RegisterStudentUseCase, 
        AuthenticateUserUseCase, 
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
        {
            provide: GetDashboardStatsUseCase,
            useFactory: (dashrepo, studentRepo) => new GetDashboardStatsUseCase(dashrepo,studentRepo),
            inject: ['IDashboardRepository','IStudentsRepository']
        },
        {
            provide: RegisterStudySessionUseCase,
            useFactory: (repo) => new RegisterStudySessionUseCase(repo),
            inject: ['IDashboardRepository'],
        },
        {
            provide: RegisterSimulationScoreUseCase,
            useFactory: (repo) => new RegisterSimulationScoreUseCase(repo),
            inject: ['IDashboardRepository'],

        },
        {
            provide: GetStudentProfileUseCase,
            useFactory: (studentsRepo) => new GetStudentProfileUseCase(studentsRepo),
            inject: ['IStudentsRepository'], // Ele depende do repositório de alunos
        },
        {
            provide: GetStudentSessionsUseCase,
            useFactory: (repo) => new GetStudentSessionsUseCase(repo),
            inject: ['IDashboardRepository'],
        },

        {
            provide: DeleteStudySessionUseCase,
            useFactory: (repo) => new DeleteStudySessionUseCase(repo),
            inject: ['IDashboardRepository'],
        },
        {
            provide: ChangePasswordUseCase,
            useFactory: (repo, hasher) => new ChangePasswordUseCase(repo, hasher),
            inject: ['IStudentsRepository', BcryptHasher],
        },
        {
            provide: UpdateSimulationScoreUseCase,
            useFactory: (repo) => new UpdateSimulationScoreUseCase(repo),
            inject: ['IDashboardRepository']
        }
    ]
})

export class HttpModule{}