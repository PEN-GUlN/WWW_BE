import { Controller, Get, Param, Post } from '@nestjs/common';
import { JobService } from './service/job.service';
import { Category } from 'src/comm/enum/category';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/save/:category')
  async saveData(@Param('category') category: string) {
    return await this.jobService.saveData(category);
  }

  @Get('/query/all')
  async getAllJobs() {
    return await this.jobService.getAllJobs();
  }

  @Get('/query/:category')
  async getJobsByCategory(@Param('category') category: Category) {
    return await this.jobService.getJobsByCategory(category);
  }

  @Get('/query/detail/:id')
  async getJobById(@Param('id') id: number) {
    return await this.jobService.getJobById(id);
  }
}
