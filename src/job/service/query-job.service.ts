import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../entity/job.entity';
import { Repository } from 'typeorm';
import { Category, categoryNameInKorean } from 'src/comm/enum/category';
import { AllJobsResponse, JobResponse } from '../dto/response/get-jobs.response';
import { JobDetailResponse } from '../dto/response/get-job-detail.response';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class QueryJobService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async queryAllJobList(): Promise<AllJobsResponse> {
    const jobs = await this.jobRepository.find({
      order: {
        id: 'DESC',
      },
    });
    const jobList: JobResponse[] = jobs.map((job) => this.mapToJobResponse(job));

    return { jobs: jobList };
  }

  async queryJobListByCategory(category: Category): Promise<AllJobsResponse> {
    const jobs = await this.jobRepository.find({
      where: { category },
      order: {
        id: 'DESC',
      },
    });

    const jobList: JobResponse[] = jobs.map((job) => this.mapToJobResponse(job));

    return { jobs: jobList };
  }

  async queryJobById(id: number): Promise<JobDetailResponse> {
    const job = await this.queryJobByIdOrThrow(id);

    return {
      id: job.id,
      title: job.title,
      description: job.description,
      company: job.company,
      category: categoryNameInKorean[job.category],
      careerLevel: job.careerLevel,
      educationLevel: job.educationLevel,
      employmentType: job.employmentType,
      workHours: job.workHours,
      salary: job.salary,
      location: job.location,
      deadline: this.getDeadlineStatus(job.deadline),
      postedDate: job.postedDate.toISOString(),
      linkUrl: job.linkUrl,
      applyUrl: job.applyUrl,
      nationImgUrl: job.nationImgUrl,
    };
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

  mapToJobResponse(job: Job): JobResponse {
    return {
      id: job.id,
      company: job.company,
      title: job.title,
      description: job.description,
      workHours: job.workHours,
      careerLevel: job.careerLevel,
      employmentType: job.employmentType,
      salary: job.salary,
      deadline: this.getDeadlineStatus(job.deadline),
    };
  }

  async queryJobByIdOrThrow(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }
}
