import {RequestAPI} from './api'

export const loginRequest = async () => {
    try {
        const request = await RequestAPI.get('/funcionarios')
        console.log(request)
        return request
    } catch (e) {
        console.log(e.response)
        return e.response
    }
}