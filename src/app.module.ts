import { Module } from '@nestjs/common';
import { TaskModule } from './task.module';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      logging: true,
      autoLoadEntities: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    TaskModule,
    UserModule,
    AuthModule,
  ],
  exports: []
})
export class AppModule { }
