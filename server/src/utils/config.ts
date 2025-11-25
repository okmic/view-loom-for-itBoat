import { config } from "dotenv"
config()
function valueOrError(key: string): string {
    if(process.env[key]) return process.env[key]
    else throw new Error(`Invalid key: ${key} in proccess env`)
}
export default {
    PORT: Number(valueOrError("PORT")),
    JWT_SECRET: valueOrError("JWT_SECRET"),
    CLIENT_LOGIN: valueOrError("CLIENT_LOGIN"),
    CLIENT_PASSWORD: valueOrError("CLIENT_PASSWORD"),
    MONGODB_URI: valueOrError("MONGODB_URI"),
    DB_NAME: valueOrError("DB_NAME"),
}
