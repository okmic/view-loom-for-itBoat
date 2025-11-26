import axios, { type AxiosInstance } from 'axios'
import config from '../config'
import type { ISlide } from "../../../../shared/types/slide"

class ApiExportService {
    private axiosInstance: AxiosInstance
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.BACKEND_HOST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
    }
    async getSlides(): Promise<ISlide[] | null> {
        try {
            return await this.axiosInstance.get(
                `${config.BACKEND_HOST}/api/sliders`
            ).then(r => r.data.slides || null)
        } catch (e) {
            return null
        }
    }
}

export default new ApiExportService()
