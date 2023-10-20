import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from 'src/user/user.entity';
  
  @Entity()
  export class Msg {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    message: string;
  
    @Column()
    username: string;
  }