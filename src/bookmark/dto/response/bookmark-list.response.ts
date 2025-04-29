import { JobResponse } from 'src/job/dto/response/get-jobs.response';

export class BookmarkListResponse {
  bookmarkCnt: number;
  bookmarks: BookmarkResponse[];
}

export class BookmarkResponse {
  id: number;
  jobInfo: JobResponse;
  response: Promise<JobResponse>;
}
