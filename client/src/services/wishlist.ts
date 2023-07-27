import { api } from './api'

export async function addToWishlist({
	product,
}: {
	product: string
}): Promise<{}> {
	const data = await api.post('/users/wishlist', { product })
	return data
}

export async function removeFromWishlist({
	product,
}: {
	product: string
}): Promise<{}> {
	const data = await api.delete(`/users/wishlist/${product}`)
	return data
}
