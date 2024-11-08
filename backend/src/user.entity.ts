import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	nickname: string;

	@Column()
	password: string;

	@Column()
	duck: string;

	@Column()
	created_at: Date;
}
