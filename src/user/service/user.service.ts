import { QueryUserService } from './query-user.service';
import { MyPageResponse } from '../dto/my-page-response';
import { Injectable } from '@nestjs/common';
import { SignupRequest } from 'src/auth/dto/request/signup.request';
import { CommandUserService } from './command-user.service';

@Injectable()
export class UserService {
  constructor(
    private readonly queryUserService: QueryUserService,
    private readonly commandUserService: CommandUserService,
  ) {}

  async create(request: SignupRequest) {
    return await this.commandUserService.saveUser(request);
  }

  async getMyPage(userMail: string): Promise<MyPageResponse> {
    return await this.queryUserService.queryMyPage(userMail);
  }

  async findUserByMailOrThrow(userMail: string) {
    return await this.queryUserService.queryUserByMailOrThrow(userMail);
  }

  async existByMail(userMail: string) {
    return await this.queryUserService.existByMail(userMail);
  }
}
