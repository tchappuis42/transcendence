import { User } from 'src/user/user.entity';
import { Entity, ManyToMany, Column, JoinTable } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class DMChannel extends Channel {
    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, { eager: true })
    @JoinTable()
    user1: User[];

    @ManyToMany(() => User, {  eager: true })
    @JoinTable()
    user2: User[];

    @Column({ default: false })
    block1: boolean;

    @Column({ default: false })
    block2: boolean;
}