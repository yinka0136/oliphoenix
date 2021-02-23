import { WalletRepository } from './wallets.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateWalletDTO } from './dto/create-wallets.dto';
import { GetWalletsFilterDTO } from './dto/get-wallets-filter.dto';
import { Wallet } from './wallets.entity';
import { WalletStatus } from './wallets.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletRepository)
    private walletRepository: WalletRepository,
  ) {}
  // getAllWallets(): Wallet[] {
  //   return this.wallets;
  // }
  // getWalletsByFilter(getWalletsByFilterDTO: GetWalletsFilterDTO): Wallet[] {
  //   const { status, walletType, title } = getWalletsByFilterDTO;
  //   let wallets = this.getAllWallets();
  //   if (status) {
  //     wallets = wallets.filter((w) => w.status === status);
  //     console.log(wallets, status);
  //   }
  //   if (title) {
  //     wallets = wallets.filter(
  //       (w) => w.title.includes(title) || w.title.includes(title),
  //     );
  //     console.log(wallets);
  //   }
  //   if (walletType) {
  //     wallets = wallets.filter((w) => w.walletType === walletType);
  //   }
  //   console.log(wallets);
  //   return wallets;
  // }
  async createWallet(createWalletDTO: CreateWalletDTO): Promise<Wallet> {
    return this.walletRepository.createwallet(createWalletDTO);
  }
  async getWalletById(walletId: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(walletId);
    if (!wallet)
      throw new NotFoundException(`No wallet with id ${walletId} found`);
    return wallet;
  }
  // async deleteWallet(walletId: string): Promise<void> {
  //   const found = await this.getWalletById(walletId);
  //   this.wallets = await this.wallets.filter((w) => w.id !== found['id']);
  // }
  // async updateWallet(walletId: string, status: WalletStatus): Promise<Wallet> {
  //   const existingWallet = await this.wallets.find((w) => w.id === walletId);
  //   if (!existingWallet) throw new Error('No wallet with this is found');
  //   existingWallet.status = status;
  //   return existingWallet;
  // }
}
