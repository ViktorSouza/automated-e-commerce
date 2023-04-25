import React, { useState } from 'react'
import RatingStars from './RatingStars'
import noimage from '../assets/no-image.png'
import { Link } from 'react-router-dom'
import { IProduct } from 'shared/Types/IProduct'

function ProductCard({ product }: { product: IProduct }) {
	const [isHeartHovered, setHeartHovered] = useState(false)
	return (
		<div className='w-12/12 relative'>
			<button className='right-2 top-1 absolute'>
				<i
					onMouseEnter={() => setHeartHovered(true)}
					onMouseLeave={() => setHeartHovered(false)}
					className={`bi bi-heart${
						isHeartHovered ? '-fill' : ''
					} text-xl text-red-600`}></i>
			</button>

			<div className='overflow-hidden h-52 h-min-52 rounded bg-slate-900'>
				<img
					className='object-cover'
					// width={}
					src={product.image}
					alt='Image of the product'
				/>
			</div>
			<div className='my-2'>
				<h3 className=''>{product.title}</h3>

				<div className='flex items-center gap-1'>
					<p>{product.averageRating?.toFixed(1) || 0}</p>
					<RatingStars
						value={product.averageRating || 0}
						className='text-yellow-400 '
					/>
					<p>({product.numOfReviews})</p>
				</div>
				<p className='overflow-ellipsis line-clamp-1 text-sm font-light '>
					{product.description}
				</p>
				<h2 className='font-semibold text-xl '>${product.price.toFixed(2)}</h2>
			</div>
			<Link to={`/product/${product._id}`}>
				<p className='w-full text-center bg-sky-500 px-4 py-2 rounded-lg'>Buy</p>
			</Link>
		</div>
	)
}

export default ProductCard
