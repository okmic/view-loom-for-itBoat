import '@fastify/jwt'
import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { Slide } from '../entities/Slide'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign(payload: any, options?: any): string
      verify(secret: string): Promise<any>
    }
    orm: {
      em: EntityManager
    }
  }
  interface FastifyRequest {
    jwtVerify<T = { secret: string }>(): Promise<T>
    server: FastifyInstance 
  }
}