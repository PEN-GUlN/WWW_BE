import { Injectable } from '@nestjs/common';
import { CommandJobService } from './command-job.service';
import { Category } from 'src/comm/enum/category';
import { QueryJobService } from './query-job.service';
import { Job } from '../entity/job.entity';

@Injectable()
export class JobService {
  constructor(
    private readonly commandJobService: CommandJobService,
    private readonly queryJobService: QueryJobService,
  ) {}

  async saveData(category: string) {
    return this.commandJobService.saveData(category);
  }

  async getAllJobs() {
    return await this.queryJobService.queryAllJobList();
  }

  async getJobsByCategory(category: Category) {
    return await this.queryJobService.queryJobListByCategory(category);
  }

  async getJobById(id: number) {
    return await this.queryJobService.queryJobById(id);
  }

  mapToJobResponse(job: Job) {
    return this.queryJobService.mapToJobResponse(job);
  }

  async findJobByIdOrThrow(jobId: number) {
    return await this.queryJobService.queryJobByIdOrThrow(jobId);
  }
}
