import axios, { type AxiosInstance } from 'axios'
import store from '../../store/store'
import config from '../config'
import { authStatus } from '../../store/slices/auth.slice'

class ApiAuthService {
    private axiosInstance: AxiosInstance
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.BACKEND_HOST,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    async signin(login: string, password: string) {
        try {
            return await this.axiosInstance.post(
                `/api/signin`,
                { login, password },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then(r => {
                store.dispatch(
                    authStatus({ status: "loading" })
                )
                localStorage.setItem('token', r.data.accessToken)
            })
        } catch (e) {
            throw e
        }
    }
    async signup(login: string, password: string) {
        try {
            return await this.axiosInstance.post(
                `/api/signup`,
                { login, password },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then(r => {
                store.dispatch(
                    authStatus({ status: "loading" })
                )
                localStorage.setItem('token', r.data.accessToken)
            })
        } catch (e) {
            throw e
        }
    }
}
export default new ApiAuthService()
