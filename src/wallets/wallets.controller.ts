import { User } from './../auth/user.entity';
import { DeleteResult } from 'typeorm';
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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDTO } from './dto/create-wallets.dto';
import { GetWalletsFilterDTO } from './dto/get-wallets-filter.dto';
import { Wallet } from './wallets.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';

@Controller('wallets')
@UseGuards(AuthGuard())
export class WalletsController {
  constructor(private _wallets: WalletsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getWallets(
    @Query() GetWalletsFilterDTO: GetWalletsFilterDTO,
    @GetUser() user: User,
  ): Promise<Wallet[]> {
    return this._wallets.getWallets(GetWalletsFilterDTO, user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createWallet(
    @Body() createWalletDTO: CreateWalletDTO,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this._wallets.createWallet(createWalletDTO, user);
  }

  @Get('/:id')
  getWalletById(
    @Param('id', ParseIntPipe) walletId: number,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this._wallets.getWalletById(walletId, user);
  }
  @Delete('/:id')
  deleteWallet(
    @Param('id', ParseIntPipe) walletId: number,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this._wallets.deleteWallet(walletId, user);
  }

  @Patch('/:id/status')
  updateWallet(
    @Param('id', ParseIntPipe) walletId: number,
    @Body('status', WalletStatusValidationPipe) status: WalletStatus,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this._wallets.updateWallet(walletId, status, user);
  }
}
