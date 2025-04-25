import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './service/bookmark-service';
import { Bookmark } from './entity/bookmark.entity';
import { UserModule } from 'src/user/user.module';
import { JobModule } from 'src/job/job.module';
import { QueryBookmarkService } from './service/query-bookmark.service';
import { CommandBookmarkService } from './service/commend-bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark]), UserModule, JobModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, CommandBookmarkService, QueryBookmarkService],
})
export class BookmarkModule {}
