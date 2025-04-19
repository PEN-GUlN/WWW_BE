import { Type } from 'src/comm/enum/type';
import { User } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;
}
