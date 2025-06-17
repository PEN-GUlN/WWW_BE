import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { SignupRequest } from 'src/auth/dto/request/signup.request';
import { Category, categoryMap, categoryNameInKorean } from 'src/comm/enum/category';

@Injectable()
export class CommandUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(request: SignupRequest) {
    const user = this.userRepository.create({
      email: request.email,
      password: request.password,
      interest: this.mapInterestsToCategory(request.interest),
    });

    return await this.userRepository.save(user);
  }

  private mapInterestsToCategory(interests: string[]): string {
    const mappedCategories: Category[] = [];

    interests.forEach((interest) => {
      // interest가 categoryMap에 있는지 확인하고, 맞다면 mappedCategories에 추가
      for (const [key, value] of Object.entries(categoryMap)) {
        if (categoryNameInKorean[value] === interest) {
          mappedCategories.push(value);
          break;
        }
      }
    });

    return mappedCategories.join(',');
  }
}
