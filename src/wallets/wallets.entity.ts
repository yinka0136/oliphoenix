import { User } from './../auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletType, WalletStatus } from './wallets.enum';
import { type } from 'os';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  walletType: WalletType;
  @Column()
  status: WalletStatus;
  @Column()
  title: string;
  @ManyToOne((type) => User, (user) => user.wallets)
  user: User;
  @Column()
  userId: number;
}
