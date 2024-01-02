import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Socket } from 'socket.io';
@Entity()
export class User {
  
  @PrimaryColumn()
  id: number

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @Exclude()
  identifiant: string;

  @Column({ default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" })
  avatar: string;

  @Column({nullable: true})
  @Exclude()
  password: string;

  @Column({ default: false })
  twoFa: boolean;

  @Column({ nullable: true })
  @Exclude()
  twoFaSecret: string;

  @Column({ type: 'simple-json', default: [] })
  @Exclude()
  socket: string[];

  @Column({ type: 'simple-json', default: [] })
  @Exclude()
  blockedId: number[];

  @Column({ default: 500 })
  score: number;

  @Column({ default: 0 })
  status: number;
}