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
import { DatabaseService } from "../modules/db/db.service"

const startServer = async () => {
  const server = fastify({ logger: true })
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
  server.post('/api/signin', authController.auth.bind(authController))

  try {
    await cheackOrCreateInitFiles()
    setupGlobalErrorHandlers()
    await DatabaseService.connect()
    await server.listen({
      port: config.PORT,
      host: '0.0.0.0'
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer()
.catch(err => {
  console.error('Server failed:', err)
  process.exit(1)
})