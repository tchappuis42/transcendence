import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity()
  export class BannedUser {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'timestamptz' })
    endOfBan: Date;
  
    @Column()
    userId: number;
  
    @Column()
    channel: string;
  }