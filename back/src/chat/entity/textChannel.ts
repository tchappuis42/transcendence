import { Column, Entity, JoinColumn, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Channel } from './channel.entity';
import { MutedUser } from './muet.entity';
import { BannedUser } from './banned.entity';


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

  @Column({ default: true })
  status: boolean;

  @Column()
  password: string;

  @ManyToMany(() => MutedUser, { eager: true })
  @JoinTable()
  muted: MutedUser[];

  @ManyToMany(() => BannedUser, { eager: true })
  @JoinTable()
  banned: BannedUser[];
}
