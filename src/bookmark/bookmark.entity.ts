import { Job } from 'src/job/entity/job.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookmark')
export class Bookmark {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  job: Job;
}
