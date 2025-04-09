import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: false })
  category: string;

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
