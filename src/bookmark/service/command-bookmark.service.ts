import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { JobService } from 'src/job/service/job.service';
import { BookmarkService } from './bookmark-service';

@Injectable()
export class CommandBookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    private readonly userServic: UserService,
    private readonly jobService: JobService,
    private readonly bookmarkService: BookmarkService,
  ) {}

  async saveBookmark(jobId: number, userMail: string) {
    const job = await this.jobService.findJobByIdOrThrow(jobId);
    const user = await this.userServic.findUserByMailOrThrow(userMail);

    this.bookmarkService.validateExistBookmark(user.mail, jobId);

    const bookmark = new Bookmark();
    bookmark.user = user;
    bookmark.job = job;

    await this.bookmarkRepository.save(bookmark);
  }

  async deleteBookmark(bookmarkId: number, userMail: string) {
    const user = await this.userServic.findUserByMailOrThrow(userMail);
    const bookmark = await this.bookmarkService.findBookmarkByIdOrThrow(bookmarkId);

    if (user.mail != bookmark.user.mail) {
      throw new UnauthorizedException('Not your bookmark');
    }

    //해당 객체를 먼저 조회한 뒤 삭제(연관관계 또한 처리 가능)
    await this.bookmarkRepository.remove(bookmark);
  }
}
