import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/request/login.request';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'mail', passwordField: 'password' });
  }

  async validate(request: LoginRequest) {
    return this.authService.login(request);
  }
}
