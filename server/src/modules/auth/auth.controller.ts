import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { errorResponse } from '../../utils/response.utils'
import { ErrorBadRequest } from '../errors'
import config from '../../utils/config'

export default class AuthController {
  private server: FastifyInstance
  constructor(server: FastifyInstance) {
    this.server = server
  }
  private simpleAuth(login: string, password: string) {
    if (!login || !password) {
        throw new ErrorBadRequest("Login and password are required")
    }
    if(login !== config.CLIENT_LOGIN || password !== config.CLIENT_PASSWORD) {
      throw new ErrorBadRequest("The login or password is entered incorrectly")
    }
  }
  async signin(req: FastifyRequest<{ Body: { login: string, password: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const { login, password } = req.body
      this.simpleAuth(login, password)
      const access = this.server.jwt.sign({ secret: login }, { expiresIn: "10d" })
      const refresh = this.server.jwt.sign({ secret: login }, { expiresIn: "69d" })
      return reply
        .setCookie(
          'refreshToken',
          refresh,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 30 * 24 * 60 * 60
          }
        )
        .status(200)
        .send({
          status: 'success',
          auth: true,
          accessToken: access,
          refreshToken: refresh
        })
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}
