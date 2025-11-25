import fastify from "fastify"
import formBody from "@fastify/formbody"
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from "@fastify/static"
import cookie from "@fastify/cookie"
import config from "../utils/config"
import { cheackOrCreateInitFiles, getPath } from "../utils/helper"
import AuthController from "../modules/auth/auth.controller"
import { setupGlobalErrorHandlers } from "../utils/setupGlobalErrorHandlers"
import { logger } from "../modules/logger/logger"
import slidersController from "../modules/sliders/sliders.controller"
import DatabaseService from "../modules/db/db.service"
import authService from "../modules/auth/auth.service"

const startServer = async () => {
  const server = fastify({ logger: true })
  try {
    await DatabaseService.connect()
    logger.log('DatabaseService initialized successfully')
  } catch (error) {
    logger.error('Failed to connect to database:', error)
    process.exit(1)
  }
  await server.register(formBody)
  await server.register(cookie)
  await server.register(fastifyJwt, {
    secret: config.JWT_SECRET,
    decoratorName: 'jwt'
  })
  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
  await server.register(fastifyStatic, {
    root: getPath("static"),
    prefix: "/api/public",
    decorateReply: false
  })
  if (!server.jwt) throw new Error('JWT plugin not initialized')
  const authController = new AuthController(server)
  server.get('/api', async (_, reply) => reply.send({ msg: "pong" }))
  server.post('/api/signin', authController.signin.bind(authController))
  server.get('/api/sliders', {
    preHandler: authService.cheackJwtInHeader,
    handler: slidersController.GET
  })
  server.get('/api/sliders/:_id', {
    preHandler: authService.cheackJwtInHeader,
    handler: slidersController.GET
  })
  try {
    await cheackOrCreateInitFiles()
    setupGlobalErrorHandlers()
    await server.listen({
      port: config.PORT,
      host: '0.0.0.0'
    })
    logger.log(`Server started on port ${config.PORT}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer().catch(err => {
  console.error('Server failed:', err)
  process.exit(1)
})
