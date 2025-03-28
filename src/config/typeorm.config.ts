import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  entities: [
    './src/infrastructure/models/*Model.ts',
  ],
  migrations: [
    './src/database/migrations/*.ts',
  ],
  migrationsRun: false,
  logging: true,
  ssl: process.env.POSTGRES_SSL === "true",
  extra: {
    ssl:
      process.env.POSTGRES_SSL === "true"
        ? {
          rejectUnauthorized: false,
        }
        : null,
  },
});

export default AppDataSource;