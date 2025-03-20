import path from "path";
import { DataSource } from "typeorm";


const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'nest_api_challenge',
    synchronize: false,
    entities: [
        './src/infrastructure/models/*Model.ts',  
      ],
      migrations: [
        './src/database/migrations/*.ts',  
      ],
    migrationsRun: false,
    logging: true,
});

export default AppDataSource;