import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CommandUserService } from './service/command-user.service';
import { QueryUserService } from './service/query-user.service';
import { PostModule } from 'src/post/post.module';
import { UserController } from './user.controller';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
import { UserService } from './service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => PostModule),
    forwardRef(() => BookmarkModule),
  ],
  controllers: [UserController],
  providers: [CommandUserService, QueryUserService, UserService],
  exports: [UserService],
})
export class UserModule {}
