import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { Job } from '../entity/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

@Injectable()
export class CommandJobService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async saveData(): Promise<void> {
    const url = `https://jobdataapi.com/api/jobs/?page=1&title=python`;
    const response = await axios.get(url);

    // const response = await axios.get(url);
    const data = response.data;
    const jobs: Job[] = [];

    for (const item of data.results) {
      const job = new Job();
      job.id = Number(item.ext_id);
      job.title = item.title;
      job.description = this.removeHtmlEntities(item.description);
      job.companyName = item.company?.name;
      job.companyLogo = item.company?.logo;
      job.companyWebsite = item.company?.website_url;
      job.companyLinkedin = item.company?.linkedin_url;
      job.companyTwitter = item.company?.twitter_handle;
      job.companyGithub = item.company?.github_url;
      job.isAgency = item.company?.is_agency ?? false;
      job.employmentType = item.types[0]?.name;
      job.location = item.location;
      job.hasRemote = item.has_remote ?? false;

      job.cityName = item.cities[0]?.name;
      job.stateName = item.states[0]?.name;
      job.countryName = item.countries[0]?.name;
      job.countryCode = item.countries[0]?.code;
      job.regionName = item.regions[0]?.name;
      job.publishedDate = this.publishedDateToDate(item.published);
      job.applicationUrl = item.application_url;
      job.experienceLevel = item.experience_level;
      job.language = item.language;
      job.salaryMin = item.salary_min;
      job.salaryMax = item.salary_max;
      job.salaryCurrency = item.salary_currency;
    }

    await this.jobRepository.save(jobs);
  }

  private removeHtmlEntities(input: string): string {
    return input.replace(/&[^\s;]+;/g, '');
  }

  private publishedDateToDate(published: string): Date {
    const date = new Date(published);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date format: ${published}`);
    }
    return date;
  }
}
