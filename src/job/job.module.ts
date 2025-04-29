import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { JobController } from './job.controller';
import { JobService } from './service/job.service';
import { Job } from './entity/job.entity';
import { QueryJobService } from './service/query-job.service';
import { CommandJobService } from './service/command-job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), HttpModule],

  controllers: [JobController],
  providers: [JobService, QueryJobService, CommandJobService],
  exports: [JobService],
})
export class JobModule {}
