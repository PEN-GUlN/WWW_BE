import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CommandUserService } from './service/command-user.service';
import { QueryUserService } from './service/query-user.service';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CommandUserService, QueryUserService, UserService],
  exports: [UserService],
})
export class UserModule {}
