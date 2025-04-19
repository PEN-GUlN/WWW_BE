import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { Job } from './entity/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetJobsResponse } from './dto/response/get-jobs.response';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';
import { categoryMap } from 'src/comm/enum/category';

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async queryAllJobList(): Promise<GetJobsResponse[]> {
    const jobs = await this.jobRepository.find();

    return jobs.map((job) => ({
      id: job.id,
      company: job.company,
      title: job.title,
      description: job.description,
      workHours: job.workHours,
      careerLevel: job.careerLevel,
      employmentType: job.employmentType,
      salary: job.salary,
      deadline: job.deadline,
    }));
  }

  async saveData(category: string) {
    const dsptcKsco = category;
    const url = `http://www.worldjob.or.kr/openapi/openapi.do?dobType=1&dsptcKsco=${dsptcKsco}&continent=2&epmt61=N&pageIndex=1&showItemListCount=100`;

    const response = await axios.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: process.env.NODE_ENV === 'dev' ? false : true,
      }),
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
      parseTagValue: true,
    });

    const json = parser.parse(response.data);

    const items = json.WORLDJOB.ITEM;
    const itemList = Array.isArray(items) ? items : [items];

    const jobs: Job[] = itemList.map((item: any) => {
      const job = new Job();

      job.title = item.rctntcSj;
      job.description = removeHtmlEntities(item.rctntcSprtQualfCn);
      job.company = item.entNm;
      job.category = categoryMap[dsptcKsco];
      job.occupation = item.dsptcKsco;
      job.careerLevel = item.joDemandCareerStleScd_code;
      job.educationLevel = item.joDemandAcdmcrScd;
      job.employmentType = item.joEmplymStleScd;
      job.workHours = item.wrkHopeHrCn;
      job.salary = item.anslryDscssAt;
      job.deadline = item.rctntcEndDe;
      job.postedDate = item.rctntcBgnDe;
      job.linkUrl = item.linkUrl;
      job.applyUrl = item.directApply;
      job.nationImgUrl = item.nationImgUrl;

      return job;
    });

    await this.jobRepository.save(jobs);
  }
}

function removeHtmlEntities(input: string): string {
  return input.replace(/&[^\s;]+;/g, '');
}
