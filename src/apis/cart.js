import { get } from './axiosClient'

export const getCarts = (params) => get('/carts', params)