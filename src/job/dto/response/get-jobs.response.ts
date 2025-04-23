export class AllJobsResponse {
  jobs: JobResponse[];
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
}
