import { User } from './../auth/user.entity';
import { WalletRepository } from './wallets.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateWalletDTO } from './dto/create-wallets.dto';
import { GetWalletsFilterDTO } from './dto/get-wallets-filter.dto';
import { Wallet } from './wallets.entity';
import { WalletStatus } from './wallets.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletRepository)
    private walletRepository: WalletRepository,
  ) {}
  async getWallets(
    filterDTO: GetWalletsFilterDTO,
    user: User,
  ): Promise<Wallet[]> {
    return this.walletRepository.getWallets(filterDTO, user);
  }

  async createWallet(
    createWalletDTO: CreateWalletDTO,
    user: User,
  ): Promise<Wallet> {
    return this.walletRepository.createwallet(createWalletDTO, user);
  }
  async getWalletById(walletId: number, user: User): Promise<Wallet> {
    const found = await this.walletRepository.findOne({
      where: { id: walletId, userId: user.id },
    });
    if (!found)
      throw new NotFoundException(`No wallet with id ${walletId} found`);
    return found;
  }
  async deleteWallet(walletId: number, user: User): Promise<DeleteResult> {
    const affected: DeleteResult = await this.walletRepository.delete({id:walletId, userId:user.id});
    if (affected.affected === 0) {
      throw new NotFoundException(`No wallet with id ${walletId} found`);
    }

    return affected.raw;
  }
  async updateWallet(
    walletId: number,
    status: WalletStatus,
    user: User,
  ): Promise<Wallet> {
    const existingWallet = await this.getWalletById(walletId, user);
    existingWallet.status = status;
    await existingWallet.save();
    return existingWallet;
  }
}
