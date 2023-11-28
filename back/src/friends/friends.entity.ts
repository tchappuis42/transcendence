import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friends {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_id: number;

	@Column()
	second_id: number;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn()
	first_User: User;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn()
	second_User: User;

	@Column({ default: false })
	friend_status: boolean;
}