import { Controller, Post, Body, HttpCode, HttpStatus, Session, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequest } from './dto/request/signup.request';
import { LoginRequest } from './dto/request/login.request';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() request: SignupRequest, @Session() session: Record<string, any>) {
    await this.authService.signup(request);

    session.user = {
      id: request.mail,
    };
    session.save();
  }

  @Post('login')
  async login(@Body() request: LoginRequest, @Session() session: Record<string, any>) {
    const user = await this.authService.login(request);

    session.user = {
      id: user.mail,
    };
    session.save();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    session.destroy(() => {
      res.clearCookie('SESSION_ID').end();
    });
  }
}
