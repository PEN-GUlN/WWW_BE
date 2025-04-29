import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { UserService } from './service/user.service';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/mypage')
  @UseGuards(SessionAuthGuard)
  async mypage(@Session() session: Record<string, any>) {
    const userMail = session.user.mail;
    await this.userService.getMyPage(userMail);
  }
}
