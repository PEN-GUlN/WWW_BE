import { Post } from 'src/post.entity/post.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  mail: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  interest: string;

  @OneToMany(() => Post, (post) => post.user, { lazy: true })
  posts: Post[];
}
