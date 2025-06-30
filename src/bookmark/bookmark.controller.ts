import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  @Post('/status')
  @UseGuards(SessionAuthGuard)
  async setBookmark(
    @Body() body: { jobId: number; status: boolean },
    @Session() session: Record<string, any>,
  ) {
    const userEmail = session.user.id;

    if (body.status === true) {
      await this.bookmarkService.saveBookmark(body.jobId, userEmail);
      return { message: 'Bookmarked' };
    } else {
      await this.bookmarkService.deleteBookmark(body.jobId, userEmail);
      return { message: 'Bookmark removed' };
    }
  }

  @Get('/my')
  @UseGuards(SessionAuthGuard)
  async getMyBookmarks(@Session() session: Record<string, any>) {
    const userEmail = session.user.id;

    return await this.bookmarkService.findBookmarksByUser(userEmail);
  }
}
