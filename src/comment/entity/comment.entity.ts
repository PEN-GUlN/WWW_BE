import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 500, nullable: false })
  content: string;

  @Column({ nullable: false })
  created_at: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_mail' })
  user: User;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
