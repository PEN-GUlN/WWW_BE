import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @Length(8, 20)
  @IsNotEmpty()
  password: string;
}
