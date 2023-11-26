import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	scoreOne: number;

	@Column()
	scoreTwo: number;

	@Column()
	idOne: number;

	@Column()
	idTwo: number;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn()
	userOne: User;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn()
	userTwo: User;
}