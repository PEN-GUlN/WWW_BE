export class GetAllJobsResponse {
  jobs: GetJobResponse[];
}

export class GetJobResponse {
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
