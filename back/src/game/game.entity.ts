import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	scoreOne: number;

	@Column()
	scoreTwo: number;

	@Column()
	playerOne: string;

	@Column()
	playerTwo: string;

	@ManyToOne(() => User)
	userOne: User

	@ManyToOne(() => User)
	userTwo: User
}