import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { ICart, ICartPopulated } from 'shared/Types/ICart'
import { api } from '../services/api'
import { updateCart as updateProductFromCart } from '../services/cart'
import { UserContext } from './UserContext'
const defaultCart: ICartPopulated = {
	products: [],
	user: '',
	_id: '',
}
type IUpdateCart = UseMutationResult<
	ICartPopulated,
	unknown,
	{
		product?: string
		quantity?: number
	},
	unknown
>

const CartContext = createContext<{
	cart: ICartPopulated
	updateCart: IUpdateCart
}>({
	updateCart: {} as IUpdateCart,
	cart: defaultCart,
})

const CartProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient()
	const { isLogin } = useContext(UserContext)
	const { data: cart, status: cartStatus } = useQuery<ICartPopulated>(
		['cart'],
		{
			enabled: isLogin,
			keepPreviousData: true,
			placeholderData: defaultCart,
			queryFn: async () => (await api.get('/carts')).data.cart,
		},
	)

	const updateCart = useMutation({
		mutationFn: ({
			product = '',
			quantity = 0,
		}: {
			product?: string
			quantity?: number
		}) => updateProductFromCart({ product, quantity }),
		onSuccess() {
			queryClient.invalidateQueries(['cart'])
		},
	})
	const value = useMemo(
		() => ({
			cart: cartStatus === 'success' ? cart : defaultCart,
			updateCart,
		}),
		[cart, updateCart],
	)
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartContext, CartProvider }
