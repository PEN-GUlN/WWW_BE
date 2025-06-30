import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { JobController } from './job.controller';
import { JobService } from './service/job.service';
import { Job } from './entity/job.entity';
import { QueryJobService } from './service/query-job.service';
import { CommandJobService } from './service/command-job.service';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
// import { BookmarkService } from 'src/bookmark/service/bookmark-service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), HttpModule, forwardRef(() => BookmarkModule)],
  controllers: [JobController],
  providers: [JobService, QueryJobService, CommandJobService],
  exports: [JobService],
})
export class JobModule {}
