import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { WalletType } from '../wallets.enum';

export class CreateWalletDTO {
   @ApiProperty()
  @IsNotEmpty()
  title: string;
   @ApiProperty()
  @IsNotEmpty()
  walletType: WalletType;
}
