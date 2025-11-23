import { config } from "dotenv"
config()

function valueOrError(key: string): string {
    if(process.env[key]) return process.env[key]
    else throw new Error(`Invalid key: ${key} in proccess env`)
}

export default {
    PORT: Number(valueOrError("PORT")),
    JWT_SECRET: valueOrError("JWT_SECRET")
}
