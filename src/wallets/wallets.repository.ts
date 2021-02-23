import { CreateWalletDTO } from './dto/create-wallets.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from './wallets.entity';
import { WalletStatus } from './wallets.enum';
@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  async createwallet(createWalletDTO: CreateWalletDTO): Promise<Wallet> {
    const { title, walletType } = createWalletDTO;
    const wallet = new Wallet();
    (wallet.title = title),
      (wallet.walletType = walletType),
      (wallet.status = WalletStatus.IN_PROGRESS),
      await wallet.save();
    return wallet.save();
  }
}
