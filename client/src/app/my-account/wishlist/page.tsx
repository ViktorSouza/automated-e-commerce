'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import RatingStars from '@/components/RatingStars'
import { CartContext } from '@/contexts/CartContext'
import { UserContext } from '@/contexts/UserContext'
import { Pagination } from '@/components/Pagination'
import { removeFromWishlist } from '@/services/wishlist'
import { IProduct } from 'shared/Types/IProduct'

export default function Wishlist() {
	const [currentPage, setCurrentPage] = useState(0)
	const size = 10
	const { user } = useContext(UserContext)
	const { cart, updateCart } = useContext(CartContext)

	return (
		<>
			<h1 className='text-3xl font-semibold mb-5 	text-primary'>Wishlist</h1>
			<div className='flex gap-5 flex-col '>
				{user.wishlist.length ? (
					<>
						{user.wishlist
							.slice(currentPage * size, currentPage * size + size)
							.map((product: IProduct) => {
								return (
									<div
										key={product._id}
										className='grid grid-cols-8 gap-2 items-center'>
										<Link
											href={`/products/${product._id}`}
											className='flex col-span-4 gap-3 items-center'>
											<img
												src={product.image}
												className='rounded-lg hidden sm:block'
												alt=''
												width={150}
											/>
											<div>
												<h2 className='text-lg font-medium 	text-primary'>
													{product.title}
												</h2>
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
											<h1 className='text-2xl font-medium 	text-primary'>
												${product.price}
											</h1>
										</div>
										<button
											className='dark:hover:bg-zinc-800  dark:bg-zinc-900 bg-zinc-200 hover:bg-zinc-300 	text-primary transition ease-in-out  px-10 p-2 rounded-lg col-span-2 justify-self-end w-max '
											onClick={() =>
												updateCart({
													product: product._id,
													quantity: 1,
												})
											}>
											Add to cart
										</button>
										<button
											title='Remove from the wishlist'
											onClick={() =>
												removeFromWishlist({
													product: product._id,
												})
											}>
											<i className='bi bi-x text-xl'></i>
										</button>
									</div>
								)
							})}
						<Pagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPages={Math.ceil(user.wishlist.length / size)}
						/>
					</>
				) : (
					"You don't have any product in your wishlist"
				)}
			</div>
		</>
	)
}
