import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  interest: string[];
}
