
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({unique : true})
  email: string;

  @Column({ default: "512x512bb.jpg" })
  avatar: string;

  @Column({ default: false })
  connected: boolean;

  @Column()
  @Exclude()
  password: string;
}