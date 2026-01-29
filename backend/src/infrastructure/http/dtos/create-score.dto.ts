import { ApiProperty } from "@nestjs/swagger";

export class CreateScoreDto{
    @ApiProperty({example:"Química", description:"Nome da matéria"})
    subject!: string;
    @ApiProperty({example: 850, description:"Valor do simulado entre 0 e 1000"})
    score!: number;
    @ApiProperty({example:"2026-01-28T10:00:00Z", description:"Dia do estudo"})
    date!: Date;
}