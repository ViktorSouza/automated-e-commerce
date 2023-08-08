'use client'
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { ICart, ICartPopulated } from 'shared/Types/ICart'
import { api } from '../services/api'
import { updateCart as updateProductFromCart } from '../services/cart'
import { UserContext } from './UserContext'
import { getUser } from '../services/user'
const defaultCart: ICartPopulated = {
	createdAt: new Date(0),
	shippingFee: 0,
	updatedAt: new Date(0),
	tax: 0,
	products: [],
	user: '',
	_id: '',
}
// type IUpdateCart = UseMutationResult<
// 	ICartPopulated,
// 	unknown,
// 	{
// 		product?: string
// 		quantity?: number
// 	},
// 	unknown
// >

const CartContext = createContext<{
	cart: ICartPopulated
	updateCart: ({}: { product: string; quantity: number }) => any
}>({
	updateCart: () => {},
	cart: defaultCart,
})

const CartProvider = ({ children }: { children: ReactNode }) => {
	const { isLogin } = useContext(UserContext)
	const [cart, setCart] = useState(defaultCart)
	useEffect(() => {
		if (!isLogin) return
		api.get('/carts').then((res) => {
			setCart(res.data.cart)
		})
	}, [isLogin])

	const updateCart = async ({
		product,
		quantity,
	}: {
		product: string
		quantity: number
	}) => {
		return updateProductFromCart({ product, quantity }).then((data) => {
			setCart(data)
			return data
		})
	}
	const value = useMemo(
		() => ({
			cart: cart,
			updateCart,
		}),
		[cart],
	)
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartContext, CartProvider }
