export class JobListResponse {
  jobs: JobResponse[];
  jobCnt: number;
}

export class JobResponse {
  'id': number;
  'title': string;
  'company': string;
  'companyLogo': string;
  'isAgency': boolean;
  'employmentType': string;
  'location': string;
  'publishedDate': number;
  'experienceLevel': string;
  'isBookmarked': boolean;
}
