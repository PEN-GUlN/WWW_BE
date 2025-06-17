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

  async getMyPage(userEmail: string): Promise<MyPageResponse> {
    return await this.queryUserService.queryMyPage(userEmail);
  }

  async findUserByEmailOrThrow(userEmail: string) {
    return await this.queryUserService.queryUserByEmailOrThrow(userEmail);
  }

  async existByEmail(userEmail: string) {
    return await this.queryUserService.existByEmail(userEmail);
  }
}
