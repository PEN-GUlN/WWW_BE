import { Injectable } from '@nestjs/common';
import { QueryBookmarkService } from './query-bookmark.service';
import { CommandBookmarkService } from './command-bookmark.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly commandBookmarkService: CommandBookmarkService,
    private readonly queryBookmarkService: QueryBookmarkService,
  ) {}

  async saveBookmark(jobId: number, userMail: string) {
    await this.commandBookmarkService.saveBookmark(jobId, userMail);
  }

  async deleteBookmark(bookmarkId: number, userMail: string) {
    await this.commandBookmarkService.deleteBookmark(bookmarkId, userMail);
  }

  async queryMyBookmarks(userMail: string) {
    return await this.queryBookmarkService.queryBookmarksByUser(userMail);
  }
}
