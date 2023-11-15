import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" })
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

  @Column({ default: 500 })
  score: number;
}