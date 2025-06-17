export class AllJobsResponse {
  jobs: JobResponse[];
  jobCnt: number;
}

export class JobResponse {
  id: number;
  company: string;
  title: string;
  description: string;
  workHours: string;
  careerLevel: string;
  employmentType: string;
  salary: string;
  deadline: string;
  location: string;
  nationImgUrl: string;
}
