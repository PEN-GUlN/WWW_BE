import { Controller, Post, Body, HttpCode, HttpStatus, Session, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequest } from './dto/request/signUp.request';
import { LoginRequest } from './dto/request/login.request';
import { Response } from 'express';

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
  async login(
    @Body() request: LoginRequest,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    {
      const user = await this.authService.login(request);

      res.cookie('SESSION_ID', session.id, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600000,
      });

      return {
        message: '로그인 성공',
        user,
      };
    }
  }

  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy(() => {});
    return { message: '로그아웃 완료' };
  }
}
