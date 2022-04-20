import { post } from './axiosClient'

export const login = (body) => post('/auth/login', body) 