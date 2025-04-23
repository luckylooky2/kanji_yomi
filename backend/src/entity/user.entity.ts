import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  passwordHash?: string;

  @Column({ type: 'varchar', length: 20, default: 'local' })
  provider: string; // 'local' (admin) 또는 'google', 'github' 등

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  providerId?: string; // OAuth 유저의 고유 ID, ID/PW 방식(admin)은 NULL

  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string; // 'admin' 또는 'user'

  @Column({ type: 'text', nullable: true })
  profilePicture?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;
}
