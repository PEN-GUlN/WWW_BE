import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupRequest } from './dto/request/signup.request';
import { LoginRequest } from './dto/request/login.request';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(request: SignupRequest): Promise<void> {
    const existingUser = await this.userService.existOneByMail(request.mail);

    if (existingUser) {
      throw new HttpException('이미 존재하는 이메일입니다.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);

    await this.userService.create({
      ...request,
      password: hashedPassword,
    });
  }

  async login(request: LoginRequest): Promise<User> {
    const user = await this.userService.findUserByMailOrThrow(request.mail);

    const isValid = await bcrypt.compare(request.password, user.password);

    if (!isValid) {
      throw new HttpException('비밀번호가 잘못되었습니다.', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
