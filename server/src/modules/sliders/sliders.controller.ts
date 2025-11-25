import { FastifyReply, FastifyRequest } from "fastify"
import { errorResponse, successResponse } from "../../utils/response.utils"
import { Slide } from "../../models/Slide"
class SlidersController {
    public async GET(req: FastifyRequest, reply: FastifyReply) {
        try {
            const slides = await Slide.model.find()
            return successResponse("success", { slides }, reply)
        } catch (error) {
            req.server.log.error(error)
            return errorResponse(error, reply)
        }
    }
    public async GET_ONE(req: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) {
        try {
            const { _id } = req.params
            const slide = await Slide.model.find({ _id })
            if (!slide) {
                return reply.status(404).send({ error: 'Slide not found' })
            }
            return successResponse("success", { slide }, reply)
        } catch (error) {
            req.server.log.error(error)
            return errorResponse(error, reply)
        }
    }
}

export default new SlidersController()
