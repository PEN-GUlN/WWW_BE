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
  @Post('signup')
  async signup(
    @Body() request: SignupRequest,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    await this.authService.signup(request);
    this.setSessionCookie(res, session.id);
    res.status(HttpStatus.CREATED).end();
  }

  @Post('login')
  async login(
    @Body() request: LoginRequest,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const user = await this.authService.login(request);

    session.user = {
      id: user.mail,
    };

    this.setSessionCookie(res, session.id);
    res.status(HttpStatus.OK).end();
  }

  @Post('logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    session.destroy(() => {
      res.clearCookie('SESSION_ID');
      res.status(HttpStatus.NO_CONTENT).end();
    });
  }
}
