import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: "512x512bb.jpg" })
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  twoFa: boolean;

  @Column({ nullable: true })
  twoFaSecret: string;

  @Column({ default: false })
  connected: boolean;
}