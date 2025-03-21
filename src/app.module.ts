import { Module } from '@nestjs/common';
import { TaskModule } from './task.module';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration  from './configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'nest_api_challenge',
      logging: true,
      autoLoadEntities: true
    }),
    TaskModule,
    UserModule,
    AuthModule,
  ],
  exports: []
})
export class AppModule { }
