import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdminCreateUserDto {
  @ApiProperty({ example: 'karmansingharora01@gmail.com' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Admin@1234' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ example: 'level1' })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  role: string;
}

export class AdminUpdateUserDto {
  @ApiPropertyOptional({ example: 'karmansingharora01@gmail.com' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'NewPass@123' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'level2' })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  role?: string;
}