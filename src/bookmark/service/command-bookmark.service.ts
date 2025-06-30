import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { JobService } from 'src/job/service/job.service';
import { QueryBookmarkService } from './query-bookmark.service';

@Injectable()
export class CommandBookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,
    private readonly queryBookmarkService: QueryBookmarkService,
  ) {}

  async saveBookmark(jobId: number, userEmail: string) {
    const job = await this.jobService.findJobByIdOrThrow(jobId);
    const user = await this.userService.findUserByEmailOrThrow(userEmail);

    this.queryBookmarkService.validateExistBookmark(user.email, jobId);

    const bookmark = new Bookmark();
    bookmark.user = user;
    bookmark.job = job;

    await this.bookmarkRepository.save(bookmark);
  }

  async deleteBookmark(jobId: number, userEmail: string) {
    const user = await this.userService.findUserByEmailOrThrow(userEmail);
    const bookmark = await this.queryBookmarkService.queryBookmarkByJobIdOrThrow(jobId);

    if (user.email != bookmark.user.email) {
      throw new UnauthorizedException('Not your bookmark');
    }

    //해당 객체를 먼저 조회한 뒤 삭제(연관관계 또한 처리 가능)
    await this.bookmarkRepository.remove(bookmark);
  }
}
