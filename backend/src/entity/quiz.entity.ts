import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuizDifficulty } from './quizDifficulty.entitiy';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startTimestamp: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTimestamp: Date | null;

  @Column({ nullable: true })
  userId: number | null;

  @OneToMany(() => QuizDifficulty, (quizDifficulty) => quizDifficulty.quiz, {
    cascade: true, // quiz 생성 시 자동으로 quizDifficulty도 저장
  })
  difficulty: QuizDifficulty[];

  @Column()
  round: number;
}
