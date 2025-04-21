import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { SignupRequest } from 'src/auth/dto/request/signUp.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(request: SignupRequest) {
    const user = this.userRepository.create(request);
    return await this.userRepository.save(user);
  }

  async findOneByEmail(mail: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mail } });
  }
}
