import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from './entity/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), HttpModule],

  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
