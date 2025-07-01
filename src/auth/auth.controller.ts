import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Session,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequest } from './dto/request/signup.request';
import { LoginRequest } from './dto/request/login.request';
import { Response } from 'express';
import { SessionAuthGuard } from './session-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() request: SignupRequest, @Session() session: Record<string, any>) {
    await this.authService.signup(request);

    session.user = {
      id: request.email,
    };

    session.save();
  }

  @Post('login')
  async login(@Body() request: LoginRequest, @Session() session: Record<string, any>) {
    const user = await this.authService.login(request);

    session.user = {
      id: user.email,
    };

    session.save();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  @UseGuards(SessionAuthGuard)
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    session.destroy(() => {
      res.clearCookie('connect.sid').end();
    });
  }

  @Get('status')
  @UseGuards(SessionAuthGuard)
  checkStatus(@Session() session: Record<string, any>, @Res() res: Response) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    if (!session.user) {
      return res.status(401).json({ isLoggedIn: false });
    }
    return res.status(200).json({ isLoggedIn: true });
  }
}
