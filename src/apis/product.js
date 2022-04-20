import { get, post, patch, destroy } from './axiosClient'

export const getProduct = (params) => get('/products', params)
export const addProduct = (body) => post('/products', body)
export const deleteProduct = (params) => destroy('/products', params)
export const updateProduct = (id, body) => patch(`/products/${id}`, body)