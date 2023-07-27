import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingStars from '../components/RatingStars'
import { IProduct } from 'shared/Types/IProduct'
import { IReview } from 'shared/Types/IReview'
import { getSingleProduct } from '../services/product'
import { InputNumber } from '../components/InputNumber'
import { CartContext } from '../contexts/CartContext'
import { UserContext } from '../contexts/UserContext'
import { CEPInput } from './CEPInput'
import Reviews from './Reviews'

function ProductDetails() {
	const [infos, setInfos] = useState<{ product: IProduct; reviews: IReview[] }>(
		defaultData,
	)
	const { cart, updateCart } = useContext(CartContext)
	const bah = useContext(CartContext)
	console.log(bah)
	const { id } = useParams()
	useEffect(() => {
		;(async () => {
			const value = await getSingleProduct(id, { get_reviews: true })
			setInfos(value)
		})()
	}, [])
	const { user, addToWishlistMutation, removeFromWishlistMutation } =
		useContext(UserContext)
	const isWished = user.wishlist.some((wish) => wish._id == infos.product._id)
	return (
		<>
			<section className='w-12/12'>
				<div className='grid grid-cols-2  h-3/6 justify-items-stretch'>
					<div className='flex justify-stretch rounded-lg overflow-hidden bg-zinc-900 h-[493px]'>
						<img
							className='object-cover h-12/12 w-12/12'
							src={infos.product.image}
							alt=''
						/>
					</div>
					<div className='col-start-2 col-end-3 px-5'>
						<div className='mb-5'>
							{' '}
							<h1 className='text-h1 font-semibold '>{infos.product.title}</h1>
							<RatingStars
								className='text-amber-600 dark:text-amber-400'
								value={infos.product.averageRating || 0}
							/>
							<p className='my-2 dark:text-zinc-400'>
								{infos.product.description}
							</p>
						</div>

						<div className='my-5 flex gap-2'>
							<div>
								<h3 className='text-1xl font-semibold'>Colors</h3>
								<p className='dark:text-zinc-400 text-xs'>in stock</p>
							</div>
							<div className='flex gap-2'>
								{infos.product.colors.map((color) => {
									return (
										<div
											key={color}
											className={`w-10 h-10 rounded-lg border-sky-500 border-2`}
											style={{ background: color }}></div>
									)
								})}
							</div>
						</div>

						<div className='my-5'>
							<h2 className='text-h2 font-semibold'>
								${infos.product.price.toFixed(2)}
							</h2>
							<p className='text-xs dark:text-zinc-400 font-semibold'>
								in 12x of ${(infos.product.price / 12).toFixed(2)}
							</p>
						</div>

						<div className='my-5 flex flex-row gap-5'>
							<InputNumber
								onClickIncrease={() =>
									updateCart.mutate({
										product: infos.product._id,
										quantity:
											(cart.products.find(
												(cartProduct) =>
													cartProduct.product._id == infos.product._id,
											)?.quantity ?? 0) + 1,
									})
								}
								onClickDecrease={() =>
									updateCart.mutate({
										product: infos.product._id,
										quantity:
											(cart.products.find(
												(cartProduct) =>
													cartProduct.product._id == infos.product._id,
											)?.quantity ?? 0) - 1,
									})
								}
								value={
									cart.products.find(
										(cartProduct) =>
											cartProduct.product._id == infos.product._id,
									)?.quantity
								}
							/>
							<button
								className='bg-sky-500 transition ease-in-out hover:bg-sky-400  px-10 p-2 rounded-lg text-white dark:text-inherit'
								onClick={() =>
									updateCart.mutate({
										product: infos.product._id,
										quantity:
											(cart.products.find(
												(cproduct) =>
													cproduct.product._id === infos.product._id,
											)?.quantity ?? 0) + 1,
									})
								}>
								Add to cart
							</button>
							<button className=' dark:bg-zinc-900 dark:text-zinc-200 bg-zinc-200 dark:text-inherit transition ease-in-out hover:bg-zinc-800 px-10 p-2 rounded-lg'>
								Buy Now
							</button>
						</div>
						<div className='my-5 flex items-baseline gap-10'>
							<button
								onClick={() => {
									isWished
										? removeFromWishlistMutation.mutate({
												product: infos.product._id,
										  })
										: addToWishlistMutation.mutate({
												product: infos.product._id,
										  })
								}}>
								<i
									className={`bi bi-heart${isWished ? '-fill' : ''} mr-2 ${
										isWished ? 'text-red-600' : 'dark:text-zinc-400'
									}`}></i>
								<span className='dark:text-zinc-400 font-semibold'>
									Wishlist
								</span>
							</button>

							<button
								className='flex items-baseline'
								onClick={() =>
									navigator.clipboard.writeText(window.location.href)
								}>
								<i className='bi bi-share-fill dark:text-zinc-400 mr-2'></i>
								<span className='dark:text-zinc-400 font-semibold'>Share</span>
							</button>
						</div>
						<CEPInput />
					</div>
				</div>
				<Reviews product={infos.product} />
			</section>
		</>
	)
}

const defaultData = {
	product: {
		_id: '',
		description: '',
		averageRating: 0,
		numOfReviews: 0,
		image: '',
		title: '',
		price: 0,
		user: '',
		colors: [],
		__v: 1,
	},
	reviews: [],
}
export default ProductDetails
