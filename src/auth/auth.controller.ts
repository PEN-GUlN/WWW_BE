import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequest } from './dto/request/signUp.request';
import { LocalAuthGuard } from './auth.guardt';
import { LoginRequest } from './dto/request/login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    return this.authService.signup(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginRequest, @Session() session: Record<string, any>) {
    const user = await this.authService.login(loginDto.mail, loginDto.password);

    session.user = user;

    return { message: '로그인 성공', user };
  }

  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy(() => {});
    return { message: '로그아웃 완료' };
  }
}
