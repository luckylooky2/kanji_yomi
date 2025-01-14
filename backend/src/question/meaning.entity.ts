import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Word } from './word.entity';

@Entity()
export class Meaning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meaning: string;

  @Column()
  difficulty: string;

  @ManyToOne(() => Word, (word) => word.meanings, { onDelete: 'CASCADE' })
  word: Word;
}
