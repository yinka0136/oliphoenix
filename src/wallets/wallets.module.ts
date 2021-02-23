import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletRepository } from './wallets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WalletRepository])],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
