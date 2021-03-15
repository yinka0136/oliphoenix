import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { WalletStatus, WalletType } from '../wallets.enum';

export class GetWalletsFilterDTO {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  search: string;
   @ApiProperty()
  @IsOptional()
  @IsIn([WalletStatus.DONE, WalletStatus.IN_PROGRESS, WalletStatus.OPEN])
  status: WalletStatus;
   @ApiProperty()
  @IsOptional()
  @IsIn([WalletType.DOLLAR, WalletType.NAIRA])
  walletType: WalletType;
}
