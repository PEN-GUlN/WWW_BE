import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupRequest } from './dto/request/signup.request';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginRequest } from './dto/request/login.request';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(request: SignupRequest) {
    const existingUser = await this.userService.findOneByEmail(request.mail);

    if (existingUser) {
      throw new HttpException('이미 존재하는 이메일입니다.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const newUser = {
      ...request,
      password: hashedPassword,
    };
    await this.userService.create(newUser);
  }

  async login(request: LoginRequest) {
    const existingUser = await this.userService.findOneByEmail(request.mail);

    if (!existingUser) {
      throw new HttpException('이메일이 존재하지 않습니다.', HttpStatus.UNAUTHORIZED);
    }

    const isValid = await bcrypt.compare(request.password, existingUser.password);

    if (!isValid) {
      throw new HttpException('비밀번호가 잘못되었습니다.', HttpStatus.UNAUTHORIZED);
    }
  }
}
