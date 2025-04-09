import { Category } from 'src/comm/enum/category';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('post')
export class Post {
  id: number;
  title: string;
  content: string;

  @Column({ type: 'enum', enum: Category, nullable: false })
  type: Category;

  @ManyToOne(() => User, (user) => user.posts, { lazy: true, cascade: true })
  user: User;
}
