import { Post } from 'src/post/entity/post.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  mail: string;

  password: string;

  interest: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  posts: Post[];
}
