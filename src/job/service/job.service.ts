import { Injectable } from '@nestjs/common';
import { JobSaveService } from './job-save.service';
import { JobQueryService } from './job-query.service';
import { Category } from 'src/comm/enum/category';

@Injectable()
export class JobService {
  constructor(
    private readonly jobSaveService: JobSaveService,
    private readonly jobQueryService: JobQueryService,
  ) {}

  async saveData(category: string) {
    return this.jobSaveService.saveData(category);
  }

  async getAllJobs() {
    return this.jobQueryService.queryAllJobList;
  }

  async getJobsByCategory(category: Category) {
    return this.jobQueryService.queryJobListByCategory(category);
  }
}
