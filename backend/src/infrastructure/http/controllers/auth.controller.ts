import { Body, Controller, Post, HttpCode, UnauthorizedException, ConflictException, Get, Query } from "@nestjs/common";
import { RegisterStudentUseCase } from "../../../application/use-cases/register-student.use-case";
import { AuthenticateUserUseCase } from "../../../application/use-cases/authenticate-user.use-case";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { AuthenticateDto } from "../dtos/authenticate-account.dto";
import { GetStudentProfileUseCase } from "../../../application/use-cases/get-student-profile.use-case";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly registerStudent: RegisterStudentUseCase,
        private readonly authenticateStudent: AuthenticateUserUseCase,
        private readonly getStudentProfile: GetStudentProfileUseCase,
    ){}

    @Post('signup')
    @HttpCode(201)
    async create(@Body() body: CreateAccountDto){
        try{
            const output = await this.registerStudent.execute({
                name: body.name,
                email: body.email,
                password: body.password
            });

            return {
                message: 'Student created successfully',
                id: output.id,
            }
        } catch (error:any){
            if(error.message === 'Student already exists.'){
                throw new ConflictException(error.message);
            }
            throw error;
        }
    }


    @Post('login')
    @HttpCode(200)
    async login(@Body() body: AuthenticateDto) {
        try {
            const result = await this.authenticateStudent.execute({
                email: body.email,
                password: body.password,
            });

            return {
                accessToken: result.accessToken,
                user:{
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
  }

    @Get('me')
    async getMe(@Query('id') id: string) {
        return await this.getStudentProfile.execute(id);
    }

}