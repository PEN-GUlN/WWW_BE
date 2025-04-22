import { Controller, Post, Body, HttpCode, HttpStatus, Session, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequest } from './dto/request/signup.request';
import { LoginRequest } from './dto/request/login.request';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setSessionCookie(res: Response, sessionId: string) {
    res.cookie('SESSION_ID', sessionId, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  private sendResponse(res: Response, statusCode: HttpStatus) {
    res.status(statusCode).end();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(
    @Body() request: SignupRequest,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    await this.authService.signup(request);

    this.setSessionCookie(res, session.id);

    this.sendResponse(res, HttpStatus.OK);
  }

  @Post('login')
  async login(
    @Body() request: LoginRequest,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    await this.authService.login(request);

    this.setSessionCookie(res, session.id);

    this.sendResponse(res, HttpStatus.OK);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy(() => {});
  }
}
