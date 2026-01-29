import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do aluno' })
  name!: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail para login' })
  email!: string;

  @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)' })
  password!: string;
}