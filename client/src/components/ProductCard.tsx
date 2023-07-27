import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from 'shared/Types/IProduct'
import { CartContext } from '../contexts/CartContext'
import { UserContext } from '../contexts/UserContext'
import RatingStars from './RatingStars'

function ProductCard({
	product,
	isWished,
}: {
	product: IProduct
	isWished: boolean
}) {
	const [isHeartHovered, setHeartHovered] = useState(false)
	const { updateCart } = useContext(CartContext)

	const { addToWishlistMutation, removeFromWishlistMutation } =
		useContext(UserContext)
	return (
		<div className='relative'>
			<button
				title='Add or remove from wishlist'
				className='absolute z-10 right-2 top-1'
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

			<Link to={`/products/${product._id}`}>
				<div className='relative overflow-hidden rounded-lg bg-zinc-900 min-h-[200px]'>
					<img
						className='object-cover '
						height={200}
						src={product.image}
						alt='Image of the product'
					/>
				</div>
				<div className='my-2'>
					<h1 className='text-lg font-medium'>{product.title}</h1>
					<div className='flex items-center gap-1'>
						<RatingStars
							value={product.averageRating || 0}
							className='text-amber-600 dark:text-amber-400 '
						/>
						<p className='text-sm font-normal dark:'>
							({product.numOfReviews})
						</p>
					</div>
					<p className='text-sm font-light overflow-ellipsis line-clamp-1 '>
						{product.description}
					</p>
					<h2 className='text-xl font-semibold '>
						${product.price.toFixed(2)}
					</h2>
				</div>
			</Link>
			<button
				className='w-full px-4 py-2 text-center transition-all border rounded-lg dark:border-zinc-900 dark:hover:bg-zinc-900 hover:bg-zinc-200'
				onClick={() =>
					updateCart.mutate({ product: product._id, quantity: 1 })
				}>
				<i className='mr-1 bi bi-cart'></i>Add to Cart
			</button>
		</div>
	)
}

export default ProductCard
