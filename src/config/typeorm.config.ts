import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-167-168-52.compute-1.amazonaws.com',
  port: 5432,
  username: 'zxchndrkhxiuwq',
  password: 'a0d47a29b67805a9b0cf83cea7c41a6dc6bf1302d337a9fefa5badf9df563090',
  database: 'd64b6oo613uvvc',
  //  host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: '@ONLYONE1826b',
  // database: 'oliphoenix',
  // synchronize: true,
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
