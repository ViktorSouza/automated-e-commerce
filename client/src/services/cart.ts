import { ICartPopulated } from 'shared/Types/ICart'
import { api } from './api'

export async function updateCart({
	product,
	quantity,
}: {
	product: string
	quantity: number
}): Promise<ICartPopulated> {
	const res = await api.post('/carts', {
		product,
		quantity: Math.max(0, quantity),
	})

	return res.data.cart as ICartPopulated
}
export async function getCart(): Promise<ICartPopulated | null> {
	try {
		const res = (await api.get('/carts')).data.cart
		return res
	} catch (error) {
		return null
	}
}

export async function deleteProductFromCart({ product }: { product: string }) {
	const res = await api.delete(`/carts/${product}`)
	return res.status
}
