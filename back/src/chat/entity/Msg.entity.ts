import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
 
  export class Msg {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    message: string;
  
    @Column()
    username: string;

    @Column()
    userId: number;
  }

