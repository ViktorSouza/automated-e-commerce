import { ICartPopulated } from '../../../shared/Types/ICart'
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

	return res.data as ICartPopulated
}

export async function deleteProductFromCart({ product }: { product: string }) {
	const res = await api.delete(`/carts/${product}`)
	return res.status
}
