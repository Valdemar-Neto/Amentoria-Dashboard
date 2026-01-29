import { ApiProperty } from "@nestjs/swagger";
export class AuthenticateDto{
    @ApiProperty({ example: 'joao@email.com', description: 'E-mail para login' })
    email!: string;
    @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)' })
    password!: string;
}