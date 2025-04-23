import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../entity/job.entity';
import { Repository } from 'typeorm';
import { GetAllJobsResponse, GetJobResponse } from '../dto/response/get-jobs.response';
import { Category } from 'src/comm/enum/category';

export class JobQueryService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async queryAllJobList(): Promise<GetAllJobsResponse> {
    const jobs = await this.jobRepository.find();

    const jobList: GetJobResponse[] = jobs.map((job) => ({
      id: job.id,
      company: job.company,
      title: job.title,
      description: job.description,
      workHours: job.workHours,
      careerLevel: job.careerLevel,
      employmentType: job.employmentType,
      salary: job.salary,
      deadline: this.getDeadlineStatus(job.deadline),
    }));

    return { jobs: jobList };
  }

  async queryJobListByCategory(category: Category): Promise<GetAllJobsResponse> {
    const jobs = await this.jobRepository.find({
      where: { category },
    });

    const jobList: GetJobResponse[] = jobs.map((job) => ({
      id: job.id,
      company: job.company,
      title: job.title,
      description: job.description,
      workHours: job.workHours,
      careerLevel: job.careerLevel,
      employmentType: job.employmentType,
      salary: job.salary,
      deadline: this.getDeadlineStatus(job.deadline),
    }));

    return { jobs: jobList };
  }

  private getDeadlineStatus(deadline: Date): string {
    const today = new Date();

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return '마감';
    }

    return `D-${diffDays}`;
  }
}
