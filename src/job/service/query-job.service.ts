import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../entity/job.entity';
import { Repository } from 'typeorm';
import { CountryCode } from 'src/comm/enum/countryCode';
import { JobListResponse, JobResponse } from '../dto/response/get-jobs.response';
import { JobDetailResponse } from '../dto/response/get-job-detail.response';
import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { BookmarkService } from 'src/bookmark/service/bookmark-service';

@Injectable()
export class QueryJobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @Inject(forwardRef(() => BookmarkService))
    private readonly bookmarkService: BookmarkService,
  ) {}

  async queryAllJobList(userEmail: string): Promise<JobListResponse> {
    const jobs = await this.jobRepository.find({
      order: { publishedDate: 'DESC' },
    });
    const jobList: JobResponse[] = await Promise.all(
      jobs.map(async (job) => {
        const isBookmarked = await this.bookmarkService.isBookmarked(userEmail, job.id);
        return this.mapToJobResponse(job, isBookmarked);
      }),
    );
    const jobCnt = jobs.length;
    return { jobs: jobList, jobCnt };
  }

  async queryJobListByCountryCode(
    userEmail: string,
    countryCode: CountryCode,
  ): Promise<JobListResponse> {
    const jobs = await this.jobRepository.find({
      where: { countryCode },
      order: { id: 'DESC' },
    });
    const jobList: JobResponse[] = await Promise.all(
      jobs.map(async (job) => {
        const isBookmarked = await this.bookmarkService.isBookmarked(userEmail, job.id);
        return this.mapToJobResponse(job, isBookmarked);
      }),
    );
    const jobCnt = jobs.length;
    return { jobs: jobList, jobCnt };
  }

  async queryJobById(
    userEmail: string,
    id: number,
  ): Promise<JobDetailResponse & { isBookmarked: boolean }> {
    const job = await this.queryJobByIdOrThrow(id);
    const isBookmarked = await this.bookmarkService.isBookmarked(userEmail, job.id);
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      company: job.companyName,
      companyLogo: job.companyLogo,
      companyWebsite: job.companyWebsite,
      companyLinkedin: job.companyLinkedin,
      companyTwitter: job.companyTwitter,
      companyGithub: job.companyGithub,
      isAgency: job.isAgency,
      employmentType: job.employmentType,
      location: job.location,
      hasRemote: job.hasRemote,
      countryCode: job.countryCode,
      countryName: job.countryName,
      stateName: job.stateName,
      cityName: job.cityName,
      regionName: job.regionName,
      publishedDate: job.publishedDate.toISOString().split('T')[0],
      applicationUrl: job.applicationUrl,
      experienceLevel: job.experienceLevel,
      language: job.language,
      isBookmarked,
    };
  }

  private getDaysSincePublished(publishedDate: Date): number {
    const today = new Date();
    const diffTime = today.getTime() - publishedDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  public mapToJobResponse(job: Job, isBookmarked: boolean): JobResponse {
    return {
      id: job.id,
      title: job.title,
      company: job.companyName,
      companyLogo: job.companyLogo,
      isAgency: job.isAgency,
      employmentType: job.employmentType,
      location: job.location,
      publishedDate: this.getDaysSincePublished(job.publishedDate),
      experienceLevel: job.experienceLevel,
      isBookmarked,
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
