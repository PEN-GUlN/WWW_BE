import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignupRequest } from 'src/auth/dto/request/signup.request';

@Injectable()
export class CommandUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(request: SignupRequest) {
    const user = this.userRepository.create(request);

    return await this.userRepository.save(user);
  }
}
