import { Injectable } from '@nestjs/common';
import { CommendBookmarkService } from './commend-bookmark.service';

@Injectable()
export class BookmarkService {
  constructor(readonly commendBookmarkService: CommendBookmarkService) {}

  async saveBookmark(jobId: number, userMail: string): Promise<void> {
    await this.commendBookmarkService.saveBookmark(jobId, userMail);
  }
}
