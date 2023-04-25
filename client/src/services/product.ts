import { api } from './api'

export const getProducts = async (queryParams: {}) => {
	const response = await api.get('/product', { params: queryParams })
	return response.data
}
export const getSingleProduct = async (
	productId?: string,
	queryParams?: {},
) => {
	const response = await api.get(`/product/${productId}`, {
		params: queryParams,
	})
	return response.data
}
