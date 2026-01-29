import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ example: 'Node.js com NestJS', description: 'Assunto estudado' })
  subject!: string;

  @ApiProperty({ example: 120, description: 'Tempo em minutos' })
  minutes!: number;

  @ApiProperty({ 
    example: 'AULA', 
    enum: ['AULA', 'EXERCICIO', 'REVISAO'],
    description: 'Categoria do estudo' 
  })
  category!: 'AULA' | 'EXERCICIO' | 'REVISAO';

  @ApiProperty({ example: '2026-01-28T10:00:00Z' })
  date!: Date;
}