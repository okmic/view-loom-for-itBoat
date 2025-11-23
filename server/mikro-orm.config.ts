import { MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'my_database',
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  type: 'postgresql',
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  debug: process.env.NODE_ENV !== 'production',
} as Parameters<typeof MikroORM.init>[0];