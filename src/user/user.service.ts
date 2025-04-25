import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUserByMailOrThrow(mail: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ mail });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async existOneByMail(mail: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ mail });
    return !!user;
  }
}
