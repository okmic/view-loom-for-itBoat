import { FastifyReply } from "fastify";
import { ErrorBadRequest, ErrorForbidden, ErrorNotAuth } from "../modules/errors";

export const successResponse = async (msg: string, data: any, reply: FastifyReply, status: number = 200) => {
    return reply
    .status(status)
    .send({
        status: 'success',
        msg,
        ...data
    })
}

export const errorResponse = async (error: any, reply: FastifyReply, errorData?: any) => {
    if(error instanceof ErrorNotAuth) {
        return reply
        .status(401)
        .send({errorMsg: 'NOT AUTH', alertMsg: error.message, errorData })
    }
    if(error instanceof ErrorBadRequest) {
        return reply
        .status(400)
        .send({errorMsg: 'Validate error', alertMsg: error.message, errorData })
    }
    if(error instanceof ErrorForbidden) {
        return reply
        .status(403)
        .send({errorMsg: 'Forbidden', alertMsg: error.message, errorData })
    }
    return reply
    .status(500)
    .send({state: 'Some error', error: { message: "Server error" }, alertMsg: error.message })
}
