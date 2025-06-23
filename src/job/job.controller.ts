import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { JobService } from './service/job.service';
import { CountryCode } from 'src/comm/enum/countryCode';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @HttpCode(201)
  @Post('/save')
  async saveData() {
    return await this.jobService.saveData();
  }

  @Get('/query/all')
  async getAllJobs() {
    return await this.jobService.getAllJobs();
  }

  @Get('/query/:countryCode')
  async getJobsByCountryCode(@Param('countryCode') countryCode: CountryCode) {
    return await this.jobService.getJobsByCountryCode(countryCode);
  }

  @Get('/query/detail/:id')
  async getJobById(@Param('id') id: number) {
    return await this.jobService.getJobById(id);
  }
}
