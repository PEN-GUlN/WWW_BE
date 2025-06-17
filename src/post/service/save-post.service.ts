import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { PostRequest } from '../dto/request/post.request';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class SavePostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async savePost(request: PostRequest, userEmail: string) {
    const user = await this.userService.findUserByEmailOrThrow(userEmail);

    const newPost = new Post();

    newPost.title = request.title;
    newPost.content = request.content;
    newPost.type = request.type;
    newPost.tags = request.tags.join(', ');
    newPost.user = user;

    await this.postRepository.save(newPost);
  }
}
