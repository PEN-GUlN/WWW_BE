import { Category } from 'src/comm/enum/category';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  company: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column()
  ccupation: string;

  @Column()
  careerLevel: string;

  @Column()
  educationLevel: string;

  @Column()
  employmentType: string;

  @Column()
  workHours: string;

  @Column()
  salary: string;

  @Column()
  deadline: Date;

  @Column()
  postedDate: Date;

  @Column()
  linkUrl: string;

  @Column()
  applyUrl: string;

  @Column()
  nationImgUrl: string;
}
