import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  password: string;
}
