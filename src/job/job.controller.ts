import { Controller, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/save/:category')
  saveData(@Param('category') category: string) {
    return this.jobService.saveData(category);
  }
}
