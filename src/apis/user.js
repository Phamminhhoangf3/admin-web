import { get } from './axiosClient'

export const getUser = (params) => get('/users', params)