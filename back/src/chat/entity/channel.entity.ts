import {
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  TableInheritance,
} from 'typeorm';
import { Msg } from './Msg.entity';
import { User } from 'src/user/user.entity';

@Entity()
@TableInheritance()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, {eager: true })
  @JoinTable()
  users: User[];

  @ManyToMany(() => Msg, { eager: true })
  @JoinTable()
  msgs: Msg[];
}
