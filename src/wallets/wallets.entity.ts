import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WalletType, WalletStatus } from './wallets.enum';

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
}
