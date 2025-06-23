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

  async getAllJobs() {
    return await this.queryJobService.queryAllJobList();
  }

  async getJobsByCountryCode(countryCode: CountryCode) {
    return await this.queryJobService.queryJobListByCountryCode(countryCode);
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
