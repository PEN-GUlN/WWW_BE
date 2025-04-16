import { Controller, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobSercice: JobService) {}

  @Post('/save/:category')
  saveData(@Param('category') category: string) {
    return this.jobSercice.saveData(category);
  }
}
