import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import { In, Repository } from 'typeorm';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { Job } from 'src/job/entity/job.entity';

@Injectable()
export class CommendBookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveBookmark(jobId: number, userMail: string): Promise<void> {
    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const user = await this.userRepository.findOneBy({ mail: userMail });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const bookmark = new Bookmark();
    bookmark.user = user;
    bookmark.job = job;

    await this.bookmarkRepository.save(bookmark);
  }
}
