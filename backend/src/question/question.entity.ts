import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column()
  meaning: string;

  @Column()
  difficulty: string;
}
