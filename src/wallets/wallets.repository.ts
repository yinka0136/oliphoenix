import { User } from './../auth/user.entity';
import { CreateWalletDTO } from './dto/create-wallets.dto';
import { EntityRepository, QueryBuilder, Repository } from 'typeorm';
import { Wallet } from './wallets.entity';
import { WalletStatus } from './wallets.enum';
import { GetWalletsFilterDTO } from './dto/get-wallets-filter.dto';
@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  async createwallet(
    createWalletDTO: CreateWalletDTO,
    user: User,
  ): Promise<Wallet> {
    const { title, walletType } = createWalletDTO;

    const wallet = new Wallet();
    (wallet.title = title),
      (wallet.walletType = walletType),
      (wallet.status = WalletStatus.IN_PROGRESS),
      (wallet.user = user);

    await wallet.save();
    delete wallet.user;
    return wallet;
  }

  async getWallets(
    filterDTO: GetWalletsFilterDTO,
    user: User,
  ): Promise<Wallet[]> {
    const { search, status, walletType } = filterDTO;

    const query = this.createQueryBuilder('wallet');
    query.where('wallet.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('wallet.status = :status', { status });
    }
    if (walletType) {
      query.andWhere('wallet.walletType = :walletType', { walletType });
    }
    if (search) {
      query.andWhere('wallet.title LIKE :search', { search: `%${search}%` });
    }
    const wallets = await query.getMany();
    return wallets;
  }
}
