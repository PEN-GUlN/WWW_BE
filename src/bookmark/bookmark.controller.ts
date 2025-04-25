import { Controller, HttpCode, HttpStatus, Param, Post, Session, UseGuards } from '@nestjs/common';
import { BookmarkService } from './service/bookmark-service';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/save/:jobId')
  @UseGuards(SessionAuthGuard)
  async saveBookmark(@Param('jobId') jobId: number, @Session() session: Record<string, any>) {
    const userMail = session.user.mail;
    await this.bookmarkService.saveBookmark(jobId, userMail);
  }
}
