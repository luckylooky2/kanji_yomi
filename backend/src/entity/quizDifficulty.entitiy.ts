import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizDifficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['N5', 'N4', 'N3', 'N2', 'N1'] })
  difficulty: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.difficulty, { onDelete: 'CASCADE' })
  quiz: Quiz;
}
