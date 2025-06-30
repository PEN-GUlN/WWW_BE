import { Controller, Get, HttpCode, Param, Post, Session, UseGuards } from '@nestjs/common';
import { JobService } from './service/job.service';
import { CountryCode } from 'src/comm/enum/countryCode';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @HttpCode(201)
  @Post('/save')
  async saveData() {
    return await this.jobService.saveData();
  }

  @Get('/query/all')
  @UseGuards(SessionAuthGuard)
  async getAllJobs(@Session() session: Record<string, any>) {
    const userEmail = session.user.id;
    return await this.jobService.getAllJobs(userEmail);
  }

  @Get('/query/:countryCode')
  @UseGuards(SessionAuthGuard)
  async getJobsByCountryCode(
    @Param('countryCode') countryCode: CountryCode,
    @Session() session: Record<string, any>,
  ) {
    const userEmail = session.user.id;
    return await this.jobService.getJobsByCountryCode(userEmail, countryCode);
  }

  @Get('/query/detail/:id')
  @UseGuards(SessionAuthGuard)
  async getJobById(@Param('id') id: number, @Session() session: Record<string, any>) {
    const userEmail = session.user.id;
    return await this.jobService.getJobById(userEmail, id);
  }
}
