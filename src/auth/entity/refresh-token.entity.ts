import { Users } from 'src/users/entity/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RefreshTokens extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isRevoked: boolean;

  @Column()
  expireAt: Date;

  @ManyToOne(() => Users, (user) => user.refreshTokens)
  user: Users;
}
