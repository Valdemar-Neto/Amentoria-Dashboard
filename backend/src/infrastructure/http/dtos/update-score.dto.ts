import { ApiProperty } from '@nestjs/swagger';

export class UpdateScoreDto {
  @ApiProperty({ example: 950, required: false })
  score?: number;

  @ApiProperty({ example: 'Matemática Avançada', required: false })
  subject?: string;
}