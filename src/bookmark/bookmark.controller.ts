import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:bookmarkId')
  @UseGuards(SessionAuthGuard)
  async deleteBookmark(
    @Param('bookmarkId') bookmarkId: number,
    @Session() session: Record<string, any>,
  ) {
    const userMail = session.user.mail;
    return await this.bookmarkService.deleteBookmark(bookmarkId, userMail);
  }

  @Get('/my')
  @UseGuards(SessionAuthGuard)
  async getMyBookmrks(@Session() session: Record<string, any>) {
    const userMail = session.user.mail;

    return await this.bookmarkService.queryMyBookmarks(userMail);
  }
}
