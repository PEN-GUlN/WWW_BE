import { Injectable } from '@nestjs/common';
import { CommandJobService } from './command-job.service';
import { CountryCode } from 'src/comm/enum/countryCode';
import { QueryJobService } from './query-job.service';
import { Job } from '../entity/job.entity';

@Injectable()
export class JobService {
  constructor(
    private readonly commandJobService: CommandJobService,
    private readonly queryJobService: QueryJobService,
  ) {}

  async saveData() {
    return this.commandJobService.saveData();
  }

  async getAllJobs(userEmail: string) {
    return await this.queryJobService.queryAllJobList(userEmail);
  }

  async getJobsByCountryCode(userEmail: string, countryCode: CountryCode) {
    return await this.queryJobService.queryJobListByCountryCode(userEmail, countryCode);
  }

  async getJobById(userEmail: string, id: number) {
    return await this.queryJobService.queryJobById(userEmail, id);
  }

  mapToJobResponse(job: Job, isBookmarked: boolean) {
    return this.queryJobService.mapToJobResponse(job, isBookmarked);
  }

  async findJobByIdOrThrow(jobId: number) {
    return await this.queryJobService.queryJobByIdOrThrow(jobId);
  }
}
