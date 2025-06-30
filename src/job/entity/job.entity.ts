import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  companyLogo: string;

  @Column({ nullable: true })
  companyWebsite: string;

  @Column({ nullable: true })
  companyLinkedin: string;

  @Column({ nullable: true })
  companyTwitter: string;

  @Column({ nullable: true })
  companyGithub: string;

  @Column({ default: false })
  isAgency: boolean;

  // Employment
  @Column({ nullable: true })
  employmentType: string;

  @Column()
  location: string;

  @Column({ default: false })
  hasRemote: boolean;

  // Cities, States, Countries, Regions (flattened for now)
  @Column({ nullable: true })
  cityName: string;

  @Column({ nullable: true })
  stateName: string;

  @Column({ nullable: true })
  countryName: string;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  regionName: string;

  // Dates
  @Column({ type: 'timestamp', nullable: true })
  publishedDate: Date;

  // URLs
  @Column({ nullable: true })
  applicationUrl: string;

  // Etc
  @Column({ nullable: true })
  experienceLevel: string;

  @Column({ nullable: true })
  language: string;

  @Column({ type: 'decimal', nullable: true })
  salaryMin: number;

  @Column({ type: 'decimal', nullable: true })
  salaryMax: number;

  @Column({ nullable: true })
  salaryCurrency: string;
}
