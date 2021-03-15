import { Wallet } from './../wallets/wallets.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { type } from 'os';
@Entity()
@Unique(['user_name'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_name: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @OneToMany((type) => Wallet, (wallet) => wallet.user, { eager: true })
  wallets: Wallet[];
}
