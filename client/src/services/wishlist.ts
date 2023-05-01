import { api } from './api'

export async function addToWishlist({
	product,
}: {
	product: string
}): Promise<{}> {
	const data = await api.post('/user/wishlist', { product })
	return data
}
export async function removeFromWishlist({
	product,
}: {
	product: string
}): Promise<{}> {
	const data = await api.delete(`/user/wishlist/${product}`)
	console.log(data)
	console.log(product)

	return data
}
