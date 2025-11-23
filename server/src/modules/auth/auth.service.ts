import { FastifyRequest } from "fastify"
import { errorResponse } from "../../utils/response.utils"
import { ErrorNotAuth } from "../errors"
import config from "../../utils/config"

class AuthService {

  public async cheackJwtInHeader(req: any, reply: any, next: () => void) {
    try {
      await req.jwtVerify({})
    } catch (e) {
      return errorResponse(new ErrorNotAuth("NOT AUTH"), reply)
    }
  }

  public async cheackRootJwtInHeader(req: FastifyRequest, reply: any, next: () => void) {
    try {
      const { secret } = await req.jwtVerify<{ secret: string }>()
      if (secret !== config.JWT_SECRET) return errorResponse(new ErrorNotAuth("invalid access secret"), reply)
    } catch (e) {
      return errorResponse(new ErrorNotAuth("NOT AUTH"), reply)
    }
  }

}

export default new AuthService()
