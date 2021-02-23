import { WalletStatusValidationPipe } from './pipes/wallets-status-validation.pipe';
import { WalletStatus, WalletType } from './wallets.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDTO } from './dto/create-wallets.dto';
import { GetWalletsFilterDTO } from './dto/get-wallets-filter.dto';
import { Wallet } from './wallets.entity';

@Controller('wallets')
export class WalletsController {
  constructor(private _wallets: WalletsService) {}

  // @Get()
  // @UsePipes(ValidationPipe)
  // getWallets(@Query() GetWalletsFilterDTO: GetWalletsFilterDTO): Wallet[] {
  //   if (Object.keys(GetWalletsFilterDTO).length) {
  //     return this._wallets.getWalletsByFilter(GetWalletsFilterDTO);
  //   }
  //   return this._wallets.getAllWallets();
  // }
  @Post()
  @UsePipes(ValidationPipe)
  async createWallet(
    @Body() createWalletDTO: CreateWalletDTO,
  ): Promise<Wallet> {
    return this._wallets.createWallet(createWalletDTO);
  }

  @Get('/:id')
  getWalletById(@Param('id', ParseIntPipe) walletId: number): Promise<Wallet> {
    return this._wallets.getWalletById(walletId);
  }
  // @Delete('/:id')
  // deleteWallet(@Param('id') walletId): Promise<void> {
  //   return this._wallets.deleteWallet(walletId);
  // }

  // @Patch('/:id/status')
  // upDateWallet(
  //   @Param('id') walletId,
  //   @Body('status', WalletStatusValidationPipe) status: WalletStatus,
  // ): Promise<Wallet> {
  //   return this._wallets.updateWallet(walletId, status);
  // }
}
