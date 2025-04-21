import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupRequest } from './dto/request/signUp.request';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginRequest } from './dto/request/login.request';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(request: SignupRequest) {
    const existingUser = await this.userRepository.findOne({
      where: { mail: request.mail },
    });
    if (existingUser) {
      throw new HttpException('이미 존재하는 이메일입니다.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const newUser = this.userRepository.create({
      mail: request.mail,
      password: hashedPassword,
      interest: request.interest,
    });

    await this.userRepository.save(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(request: LoginRequest) {
    const user = await this.userRepository.findOne({
      where: { mail: request.mail },
    });
    if (!user) {
      throw new HttpException('이메일이 존재하지 않습니다.', HttpStatus.UNAUTHORIZED);
    }
    const isValid = await bcrypt.compare(request.password, user.password);
    if (!isValid) {
      throw new HttpException('비밀번호가 잘못되었습니다.', HttpStatus.UNAUTHORIZED);
    }
    const { password: _, ...userWithoutPassword } = user; //user값중에 password를 제외한 나머지 값들만 가져오도록
    return userWithoutPassword;
  }
}
