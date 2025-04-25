import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BookmarkListResponse, BookmarkResponse } from '../dto/response/bookmark-list.response';
import { JobQueryService } from 'src/job/service/job-query.service';

@Injectable()
export class QueryBookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    private readonly userService: UserService,
    private readonly queryJobService: JobQueryService,
  ) {}

  async queryBookmarksByUser(userMail: string): Promise<BookmarkListResponse> {
    const user = await this.userService.findUserByMailOrThrow(userMail);

    const bookmarks = await this.bookmarkRepository.find({
      where: { user },
      relations: ['job'],
    });

    const bookmarkListResponse = new BookmarkListResponse();
    bookmarkListResponse.bookmarkCnt = bookmarks.length;
    bookmarkListResponse.bookmarks = bookmarks.map(this.mapToBookmarkResponse.bind(this));

    return bookmarkListResponse;
  }

  private mapToBookmarkResponse(bookmark: Bookmark): BookmarkResponse {
    const response = new BookmarkResponse();
    response.id = bookmark.id;
    response.jobInfo = this.queryJobService.mapToJobResponse(bookmark.job);
    return response;
  }

  async findBookmarkByIdOrThrow(bookmarkId: number): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { id: bookmarkId },
      relations: ['user', 'job'],
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return bookmark;
  }

  async validateExistBookmark(mail: string, jobId: number): Promise<void> {
    const exists = await this.bookmarkRepository.exist({
      where: { user: { mail: mail }, job: { id: jobId } },
    });
    if (exists) {
      throw new ConflictException('Already bookmarked');
    }
  }
}
