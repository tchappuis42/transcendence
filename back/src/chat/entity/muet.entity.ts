import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class MutedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  endOfMute: Date;

  @Column()
  userId: number;

  @Column()
  channel: string;
}