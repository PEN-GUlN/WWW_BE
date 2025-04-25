import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { Job } from 'src/job/entity/job.entity';
import { User } from 'src/user/entity/user.entity';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './service/bookmark-service';
import { CommendBookmarkService } from './service/commend-bookmark.service';
import { Bookmark } from './entity/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, User, Job])],
  controllers: [BookmarkController],
  providers: [BookmarkService, CommendBookmarkService],
})
export class BookmarkModule {}
