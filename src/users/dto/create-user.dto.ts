import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
    maxLength: 100,
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @MaxLength(100, { message: 'email must not exceed 100 characters' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
    maxLength: 100,
    minLength: 6,
  })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  @MaxLength(100, { message: 'password must not exceed 100 characters' })
  password: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
    maxLength: 100,
  })
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  @MaxLength(100, { message: 'username must not exceed 100 characters' })
  username: string;
}