import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@ONLYONE1826b',
  database: 'oliphoenix',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
