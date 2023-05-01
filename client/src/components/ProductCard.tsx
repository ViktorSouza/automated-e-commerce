import React, { useContext, useState } from 'react'
import RatingStars from './RatingStars'
import { Link } from 'react-router-dom'
import { IProduct } from 'shared/Types/IProduct'
import { UserContext } from '../contexts/UserContext'

function ProductCard({
	product,
	isWished,
}: {
	product: IProduct
	isWished: boolean
}) {
	const [isHeartHovered, setHeartHovered] = useState(false)

	const { addToWishlistMutation, removeFromWishlistMutation } =
		useContext(UserContext)
	return (
		<div className='w-12/12 relative'>
			<button
				className='right-2 top-1 absolute'
				onClick={() => {
					isWished
						? removeFromWishlistMutation.mutate({ product: product._id })
						: addToWishlistMutation.mutate({ product: product._id })
				}}>
				<i
					onMouseEnter={() => setHeartHovered(true)}
					onMouseLeave={() => setHeartHovered(false)}
					className={`bi bi-heart${
						isHeartHovered || isWished ? '-fill' : ''
					} text-xl text-red-600`}></i>
			</button>

			<div className='overflow-hidden h-52 h-min-52 rounded bg-zinc-900'>
				<img
					className='object-cover'
					// width={}
					src={product.image}
					alt='Image of the product'
				/>
			</div>
			<div className='my-2'>
				<h1 className='text-lg font-medium'>{product.title}</h1>
				<div className='flex items-center gap-1'>
					<RatingStars
						value={product.averageRating || 0}
						className='text-yellow-400 '
					/>
					<p className=' text-zinc-300 font-normal text-sm'>
						({product.numOfReviews})
					</p>
				</div>
				<p className='overflow-ellipsis line-clamp-1 text-sm font-light '>
					{product.description}
				</p>
				<h2 className='font-semibold text-xl '>${product.price.toFixed(2)}</h2>
			</div>
			<Link to={`/product/${product._id}`}>
				<p className='w-full text-center bg-sky-500 px-4 py-2 rounded-lg'>
					Buy
				</p>
			</Link>
		</div>
	)
}

export default ProductCard
