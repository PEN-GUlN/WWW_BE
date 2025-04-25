import { Injectable } from '@nestjs/common';
import { CommendBookmarkService } from './commend-bookmark.service';
import { QueryBookmarkService } from './query-bookmark.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly commendBookmarkService: CommendBookmarkService,
    private readonly queryBookmarkService: QueryBookmarkService,
  ) {}

  async saveBookmark(jobId: number, userMail: string) {
    await this.commendBookmarkService.saveBookmark(jobId, userMail);
  }

  async deleteBookmark(bookmarkId: number, userMail: string) {
    await this.commendBookmarkService.deleteBookmark(bookmarkId, userMail);
  }

  async queryMyBookmarks(userMail: string) {
    await this.queryBookmarkService.queryBookmarksByUser(userMail);
  }
}
