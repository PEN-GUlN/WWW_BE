import { Controller, Get, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/save/:category')
  async saveData(@Param('category') category: string) {
    return await this.jobService.saveData(category);
  }

  @Get('/all')
  async getAllJobs() {
    return await this.jobService.queryAllJobList();
  }
}
