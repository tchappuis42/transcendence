import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
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

