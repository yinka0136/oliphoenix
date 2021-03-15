import { IsNotEmpty } from 'class-validator';
import { WalletType } from '../wallets.enum';

export class CreateWalletDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  walletType: WalletType;
}
