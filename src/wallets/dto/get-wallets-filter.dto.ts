import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { WalletStatus, WalletType } from '../wallets.enum';

export class GetWalletsFilterDTO {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsIn([WalletStatus.DONE, WalletStatus.IN_PROGRESS, WalletStatus.OPEN])
  status: WalletStatus;
  @IsOptional()
  @IsIn([WalletType.DOLLAR, WalletType.NAIRA])
  walletType: WalletType;
}
