import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import dotenv from "dotenv"
import { errorResponse } from '../../utils/response.utils'
import { ErrorBadRequest, ErrorNotAuth } from '../errors'
dotenv.config()

export default class AuthController {

  private server: FastifyInstance

  constructor(server: FastifyInstance) {
    this.server = server
  }

  async auth(req: FastifyRequest<{ Body: { secret: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const { secret } = req.body
      //logic auth
      
      const access = this.server.jwt.sign({ secret }, { expiresIn: "30d" })
      const refresh = this.server.jwt.sign({ secret }, { expiresIn: "69d" })

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
          auth: true, accessToken: access, refreshToken: refresh
        })

    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}




