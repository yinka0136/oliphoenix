import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { WalletsModule } from './wallets/wallets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, WalletsModule, TypeOrmModule.forRoot(TypeOrmConfig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
