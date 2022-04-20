import { get } from 'apis/axiosClient'

export const getAllCategory = () => get('/products/categories')