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

	@ManyToOne(() => User)
	playerOne: User

	@ManyToOne(() => User)
	playertwo: User
}