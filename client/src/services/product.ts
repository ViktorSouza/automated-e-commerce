import { IProduct } from '../../../shared/Types/IProduct'
import { api } from './api'

export const getProducts = async (queryParams: {}): Promise<{
	products: IProduct[]
	currentPage: number
	totalPages: number
	totalResults: number
}> => {
	const response = await api.get('/product', { params: queryParams })

	return response.data as {
		products: IProduct[]
		currentPage: number
		totalPages: number
		totalResults: number
	}
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
