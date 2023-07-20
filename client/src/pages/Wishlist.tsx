import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../components/RatingStars'
import { CartContext } from '../contexts/CartContext'
import { UserContext } from '../contexts/UserContext'

export function Wishlist() {
	const { user, removeFromWishlistMutation } = useContext(UserContext)
	const { updateCart, cart } = useContext(CartContext)
	return (
		<>
			<h1 className='text-h2 font-semibold mb-5'>Wishlist</h1>
			<div className='flex gap-5 flex-col '>
				{user.wishlist.map((product) => {
					return (
						<div
							key={product._id}
							className='grid grid-cols-8 gap-2 items-center'>
							<Link
								to={`/product/${product._id}`}
								className='flex col-span-4 gap-3 items-center'>
								<img
									src={product.image}
									className='rounded-lg'
									alt=''
									width={150}
								/>
								<div>
									<h2 className='text-lg font-medium'>{product.title}</h2>
									<div className='flex items-center'>
										<RatingStars
											value={product.averageRating}
											className='text-amber-600 dark:text-amber-400'
										/>
										<p className=' dark: font-normal text-sm'>
											({product.numOfReviews})
										</p>
									</div>
								</div>
							</Link>
							<div className='cols-span-2'>
								<h1 className='text-2xl font-medium'>${product.price}</h1>
							</div>
							<button
								className='dark:hover:bg-zinc-800  bg-zinc-900 transition ease-in-out  px-10 p-2 rounded-lg col-span-2 justify-self-end'
								onClick={() =>
									updateCart.mutate({
										product: product._id,
										quantity:
											(cart.products.find(
												(cproduct) => cproduct.product._id === product._id,
											)?.quantity || 0) + 1,
									})
								}>
								Add to cart
							</button>
							<button
								title='Remove from the wishlist'
								onClick={() =>
									removeFromWishlistMutation.mutate({ product: product._id })
								}>
								<i className='bi bi-x'></i>
							</button>
						</div>
					)
				})}
			</div>
		</>
	)
}
