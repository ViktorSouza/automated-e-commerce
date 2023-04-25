import { useQuery } from '@tanstack/react-query'
import { createContext } from 'react'
import { ICart, ICartPopulated } from 'shared/Types/ICart'

const CartContext = createContext<{ cart: ICartPopulated }>({
	cart: [
		{
			product: {
				__v: 0,
				_id: '',
				averageRating:0,
				colors:[''],
				description:'',
				image:'',
				numOfReviews:0,
				price:0,
				title:'',
				user:''s
			},


		},
	],
})
const CartProvider = () => {
	const {} = useQuery(['cart'], {})
	return <CartContext.Provider value={{}}></CartContext.Provider>
}
