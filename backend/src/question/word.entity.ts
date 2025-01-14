import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Meaning } from './meaning.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column({ default: 0 })
  incorrectCount: number;

  @Column({ default: 0 })
  correctCount: number;

  @OneToMany(() => Meaning, (meaning) => meaning.word, { cascade: true })
  meanings: Meaning[];
}
