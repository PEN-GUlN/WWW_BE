import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookmarkListResponse, BookmarkResponse } from '../dto/response/bookmark-list.response';
import { UserService } from 'src/user/service/user.service';
import { Job } from 'src/job/entity/job.entity';

@Injectable()
export class QueryBookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async queryBookmarksByUser(userEmail: string): Promise<BookmarkListResponse> {
    const user = await this.userService.findUserByEmailOrThrow(userEmail);

    const bookmarks = await this.bookmarkRepository.find({
      where: { user: { email: userEmail } },
      relations: ['job', 'user'],
    });

    const bookmarkListResponse = new BookmarkListResponse();
    bookmarkListResponse.bookmarkCnt = bookmarks.length;
    bookmarkListResponse.bookmarks = bookmarks.map((bookmark) =>
      this.mapToBookmarkResponse(bookmark),
    );

    return bookmarkListResponse;
  }

  private mapToBookmarkResponse(bookmark: Bookmark): BookmarkResponse {
    const response = new BookmarkResponse();
    response.id = bookmark.id;
    response.jobInfo = this.mapToJobResponse(bookmark.job, true);
    return response;
  }

  private mapToJobResponse(job: Job, isBookmarked: boolean) {
    return {
      id: job.id,
      title: job.title,
      company: job.companyName,
      companyLogo: job.companyLogo,
      isAgency: job.isAgency,
      employmentType: job.employmentType,
      location: job.location,
      countryCode: job.countryCode,
      publishedDate: this.getDaysSincePublished(job.publishedDate),
      experienceLevel: job.experienceLevel,
      isBookmarked,
    };
  }

  private getDaysSincePublished(publishedDate: Date): number {
    const today = new Date();
    const diffTime = today.getTime() - publishedDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  async queryBookmarkByJobIdOrThrow(jobId: number): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { job: { id: jobId } },
      relations: ['user', 'job'],
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return bookmark;
  }

  async validateExistBookmark(userEmail: string, jobId: number): Promise<void> {
    const exists = await this.bookmarkRepository.exists({
      where: { user: { email: userEmail }, job: { id: jobId } },
    });

    if (exists) {
      throw new ConflictException('Already bookmarked');
    }
  }

  async queryBookmarkByUserAndJob(userEmail: string, jobId: number): Promise<Bookmark | null> {
    return await this.bookmarkRepository.findOne({
      where: { user: { email: userEmail }, job: { id: jobId } },
      relations: ['user', 'job'],
    });
  }
}
