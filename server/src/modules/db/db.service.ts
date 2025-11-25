import mongoose from 'mongoose'
import { MongoClient, Db } from 'mongodb'
import { logger } from '../logger/logger'
import config from '../../utils/config'

class DatabaseService {
  private uri: string = config.MONGODB_URI
  private dbName: string = config.DB_NAME
  private nativeClient: MongoClient | null = null
  private nativeDb: Db | null = null
  private connectionPromise: Promise<void> | null = null
  constructor() {
    mongoose.set('strictQuery', false)
  }
  private async initNativeDriver(): Promise<void> {
    try {
      this.nativeClient = new MongoClient(this.uri)
      await this.nativeClient.connect()
      this.nativeDb = this.nativeClient.db(this.dbName)
      logger.info('🟢 Native MongoDB driver connected')
    } catch (e) {
      logger.error('🔴 Native driver connection error:', e)
      throw e
    }
  }
  public async connect(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise
    }
    this.connectionPromise = new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(this.uri, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 10000
        })
        await this.initNativeDriver()
        logger.info('🟢 MongoDB connected successfully')
        resolve()
      } catch (e) {
        logger.error('🔴 MongoDB connection failed:', e)
        reject(e)
      }
    })
    return this.connectionPromise
  }
  public async getDb(): Promise<Db> {
    if (!this.nativeDb) {
      await this.connect()
    }
    if (!this.nativeDb) {
      throw new Error('Native MongoDB driver initialization failed')
    }
    return this.nativeDb
  }
  public async close(): Promise<void> {
    try {
      await mongoose.disconnect()
      if (this.nativeClient) {
        await this.nativeClient.close()
      }
      this.nativeClient = null
      this.nativeDb = null
      this.connectionPromise = null
      logger.info('🔴 MongoDB connections closed')
    } catch (e) {
      logger.error('Error closing MongoDB connections:', e)
      throw e
    }
  }
  public isConnected(): boolean {
    return mongoose.connection.readyState === 1
  }
}

export default new DatabaseService()
