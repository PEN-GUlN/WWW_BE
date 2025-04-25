import { Injectable } from '@nestjs/common';
import { CommandJobService } from './command-job.service';
import { Category } from 'src/comm/enum/category';
import { QueryJobService } from './query-job.service';

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
    return this.queryJobService.queryAllJobList();
  }

  async getJobsByCategory(category: Category) {
    return this.queryJobService.queryJobListByCategory(category);
  }

  async getJobById(id: number) {
    return this.queryJobService.queryJobById(id);
  }
}
