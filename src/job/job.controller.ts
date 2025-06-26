import { Controller, Get, HttpCode, Param, Post, Session } from '@nestjs/common';
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
  async getAllJobs(@Session() session: Record<string, any>) {
    const userEmail = session.user.email;
    return await this.jobService.getAllJobs(userEmail);
  }

  @Get('/query/:countryCode')
  async getJobsByCountryCode(
    @Param('countryCode') countryCode: CountryCode,
    @Session() session: Record<string, any>,
  ) {
    const userEmail = session.user.email;
    return await this.jobService.getJobsByCountryCode(userEmail, countryCode);
  }

  @Get('/query/detail/:id')
  async getJobById(@Param('id') id: number, @Session() session: Record<string, any>) {
    const userEmail = session.user.email;
    return await this.jobService.getJobById(userEmail, id);
  }
}
