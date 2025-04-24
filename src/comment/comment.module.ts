import { Module } from '@nestjs/common';
import { Comment } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [],
  providers: [],
})
export class CommentModule {}
