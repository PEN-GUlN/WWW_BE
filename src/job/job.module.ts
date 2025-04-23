import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { JobController } from './job.controller';
import { JobService } from './service/job.service';
import { Job } from './entity/job.entity';
import { JobQueryService } from './service/job-query.service';
import { JobSaveService } from './service/job-save.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), HttpModule],

  controllers: [JobController],
  providers: [JobService, JobQueryService, JobSaveService],
})
export class JobModule {}
