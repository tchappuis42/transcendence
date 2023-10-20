import { Column, Entity, OneToMany, JoinColumn, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Channel } from './channel.entity';

@Entity()
export class TextChannel extends Channel {
  @Column({ unique: true, length: 8 })
  name: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  owner: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  adminId: User[];
}
