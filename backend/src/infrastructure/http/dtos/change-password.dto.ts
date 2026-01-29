import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'senha-antiga-123' })
  oldPassword!: string;

  @ApiProperty({ example: 'nova-senha-456' })
  newPassword!: string;
}