import { IProduct } from '../../../shared/Types/IProduct'
import { api } from './api'

export type GetProductsResponse = {
	amount: number
	products: IProduct[]
	currentPage: number
	totalPages: number
	totalResults: number
}

export const getProducts =
	async (queryParams?: {}): Promise<GetProductsResponse> => {
		const response = await api.get('/products', { params: queryParams ?? {} })

		return response.data as GetProductsResponse
	}
export const getSingleProduct = async (
	productId?: string,
	queryParams?: {},
) => {
	const response = await api.get(`/products/${productId}`, {
		params: queryParams,
	})
	return response.data
}
