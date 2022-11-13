import { DataSourceOptions, DataSource } from 'typeorm';
import { Book } from './models/Books'
import path from 'path';

const root = path.resolve(__dirname, "..")
const dbOptions: DataSourceOptions = {
  type: 'sqlite',
  database: `${root}/db.sqlite`,
  entities: [Book],
  // Automigrate tables from entities.
  synchronize: true,
  // logging: true
}
const db = new DataSource(dbOptions);

export default db