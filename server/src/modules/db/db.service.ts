import { MikroORM } from '@mikro-orm/postgresql'
import { logger } from '../logger/logger'

export class DatabaseService {
  private static logPrefix = "DATABASE-SERVICE"
  private static orm: MikroORM

  static async connect(): Promise<void> {
    try {
      this.orm = await MikroORM.init({
        entities: ['dist/entities/**/*.js'],
        entitiesTs: ['src/entities/**/*.ts'],
        dbName: process.env.DB_NAME || 'myapp',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        debug: process.env.NODE_ENV === 'development',
        migrations: {
          path: 'dist/migrations',
          pathTs: 'src/migrations',
        },
      })

      logger.log(`[${this.logPrefix}-${new Date().toDateString()}] - ✅ PostgreSQL connected successfully`)
      await this.orm.em.getConnection().execute('SELECT 1')
      
    } catch (error) {
      logger.error(`[ERROR-${this.logPrefix}-${new Date().toDateString()}] -❌ Database connection failed:`, error)
      throw error
    }
  }

  static getOrm(): MikroORM {
    if (!this.orm) {
      throw new Error('Database not connected. Call connect() first.')
    }
    return this.orm
  }

  static getEntityManager() {
    return this.getOrm().em
  }

  static async disconnect(): Promise<void> {
    if (this.orm) {
      await this.orm.close()
      logger.log(`[${this.logPrefix}-${new Date().toDateString()}] - ✅ PostgreSQL disconnected`)
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      if (!this.orm) return false
      await this.orm.em.getConnection().execute('SELECT 1')
      return true
    } catch {
      return false
    }
  }

  static async isConnected(): Promise<boolean> {
    return this.healthCheck()
  }
}
