import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { PostRequest } from '../dto/request/post.request';

@Injectable()
export class SavePostService {
  constructor(
    @InjectRepository(Post) private readonly postRepostiory: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async savePost(request: PostRequest, userMail: string) {
    const user = await this.userRepository.findOneBy({ mail: userMail });

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    const newPost = new Post();

    newPost.title = request.title;
    newPost.content = request.content;
    newPost.type = request.type;
    newPost.user = user;

    await this.postRepostiory.save(newPost);
  }
}
