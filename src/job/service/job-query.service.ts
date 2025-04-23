import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../entity/job.entity';
import { Repository } from 'typeorm';
import { Category, categoryNameInKorean } from 'src/comm/enum/category';
import { AllJobsResponse, JobResponse } from '../dto/response/get-jobs.response';
import { JobDetailResponse } from '../dto/response/get-job-detail.response';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class JobQueryService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async queryAllJobList(): Promise<AllJobsResponse> {
    const jobs = await this.jobRepository.find();

    const jobList: JobResponse[] = jobs.map((job) => this.mapToJobResponse(job));

    return { jobs: jobList };
  }

  async queryJobListByCategory(category: Category): Promise<AllJobsResponse> {
    const jobs = await this.jobRepository.find({
      where: { category },
    });

    const jobList: JobResponse[] = jobs.map((job) => this.mapToJobResponse(job));

    return { jobs: jobList };
  }

  async queryJobById(id: number): Promise<JobDetailResponse> {
    const job = await this.jobRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundException('채용 공고를 찾을 수 없습니다.');
    }

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

  private mapToJobResponse(job: Job): JobResponse {
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
}
