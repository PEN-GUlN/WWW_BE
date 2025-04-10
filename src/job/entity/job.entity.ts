import { Category } from 'src/comm/enum/interest';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  company: string;

  @Column({ type: 'enum', enum: Category, nullable: false })
  category: Category;

  @Column({ nullable: false })
  careerLevel: string;

  @Column({ nullable: false })
  educationLevel: string;

  @Column({ nullable: false })
  employmentType: string;

  @Column({ nullable: false })
  workHours: string;

  @Column({ nullable: false })
  salary: string;

  @Column({ nullable: false })
  deadline: Date;

  @Column({ nullable: false })
  postedDate: Date;

  @Column({ nullable: false })
  logo: string;
}
