import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import RatingStars from '../components/RatingStars'
import { IProduct } from 'shared/Types/IProduct'
import { IReview } from 'shared/Types/IReview'
import { getSingleProduct } from '../services/product'
import { InputNumber } from '../components/InputNumber'
import { CartContext } from '../contexts/CartContext'

function ProductDetails() {
	const [infos, setInfos] = useState<{ product: IProduct; reviews: IReview[] }>(
		defaultData,
	)
	const { cart, updateCart } = useContext(CartContext)
	const { id } = useParams()
	useEffect(() => {
		;(async () => {
			const value = await getSingleProduct(id, { get_reviews: true })

			setInfos(value)
		})()
	}, [])
	console.log(
		cart.products.find((cproduct) => cproduct.product._id == infos.product._id)
			?.quantity,
	)
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
								className='text-yellow-400'
								value={infos.product.averageRating || 0}
							/>
							<p className='my-2 text-zinc-400'>{infos.product.description}</p>
						</div>

						<div className='my-5 flex gap-2'>
							<div>
								<h3 className='text-1xl font-semibold'>Colors</h3>
								<p className='text-zinc-400 text-xs'>in stock</p>
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
							<p className='text-xs text-zinc-400 font-semibold'>
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
											)?.quantity || 0) + 1,
									})
								}
								onClickDecrease={() =>
									updateCart.mutate({
										product: infos.product._id,
										quantity:
											(cart.products.find(
												(cartProduct) =>
													cartProduct.product._id == infos.product._id,
											)?.quantity || 0) - 1,
									})
								}
								value={
									cart.products.find(
										(cartProduct) =>
											cartProduct.product._id == infos.product._id,
									)?.quantity
								}
								//TODO make this
								onChange={() => {}}
							/>
							<button
								className='bg-sky-500 transition ease-in-out hover:bg-sky-400  px-10 p-2 rounded-lg'
								onClick={() =>
									updateCart.mutate({
										product: infos.product._id,
										quantity:
											(cart.products.find(
												(cproduct) =>
													cproduct.product._id === infos.product._id,
											)?.quantity || 0) + 1,
									})
								}>
								Add to cart
							</button>
							<button className=' bg-zinc-900 transition ease-in-out hover:bg-zinc-800 px-10 p-2 rounded-lg'>
								Buy Now
							</button>
						</div>
						<div className='my-5 flex items-baseline gap-10'>
							<div>
								<i className='bi bi-heart mr-2 text-zinc-400'></i>
								<span className='text-zinc-400 font-semibold'>Wishlist</span>
							</div>

							<div className='flex items-baseline'>
								<i className='bi bi-share-fill text-zinc-400 mr-2'></i>
								<span className='text-zinc-400 font-semibold'>Share</span>
							</div>
						</div>
						<CEPInput />
					</div>
				</div>
				<div className=' flex flex-col mt-10'>
					<h1 className='font-semibold text-h1 mb-4'>Reviews</h1>
					{infos.reviews.map((review) => (
						<div
							key={review._id}
							className='pt-3 my-3 border-t border-zinc-900'>
							<div className='flex gap-14 items-center'>
								<h3 className='text-lg font-medium'>{`${review.user.name.first} ${review.user.name.last}`}</h3>
								<div className='flex gap-2'>
									<p>{review.rating || 0}</p>
									<RatingStars
										key={review._id}
										value={review.rating}
										className='text-yellow-400'
									/>
								</div>
							</div>
							<div className=''>
								<p className='text-zinc-300  mt-3'>{review.comment}</p>
								<div className='flex flex-row gap-10 mt-3'>
									<div className='cursor-pointer hover:bg-zinc-900 px-2 py-1 rounded transition-all'>
										<i className='bi bi-chevron-up mr-2'></i>
										<span className='text-zinc-400 text-sm font-medium'>0</span>
									</div>
									<div className='cursor-pointer hover:bg-zinc-900 px-2 py-1 rounded transition-all'>
										<i className='bi bi-chat-left-text mr-2'></i>
										<span className='text-zinc-400 text-sm font-medium'>
											Comment
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	)
}

function CEPInput() {
	const [inputValue, setInputValue] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let input = e.target.value
		// Remove any non-digit characters from the input value
		input = input.replace(/\D/g, '')
		// Format the input value as "00000-000"
		if (input.length <= 5) {
			setInputValue(input)
		} else if (input.length > 5 && input.length <= 8) {
			setInputValue(input.slice(0, 5) + '-' + input.slice(5))
		} else if (input.length > 8) {
			setInputValue(input.slice(0, 5) + '-' + input.slice(5, 8))
		}
	}
	return (
		<div className='flex flex-col gap-1'>
			<label
				htmlFor='cep'
				className='text-xs'>
				Consult your CEP
			</label>
			<div>
				<input
					type='text'
					name='cep'
					placeholder='0000-000'
					onChange={handleChange}
					value={inputValue}
					id='cep'
					// pattern='\d{4}-\d{3}'
					title='Please enter a valid number pattern: 0000-000'
					className='border mr-2 border-zinc-900 w-40 transition ease-in-out bg-transparent p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none'
				/>
				<button className='p-2 px-3 bg-zinc-900 rounded-lg transition-all hover:bg-zinc-800 font-medium'>
					Ok
				</button>
			</div>
		</div>
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
		colors: ['', ''],
		__v: 1,
	},
	reviews: [
		{
			_id: '000000000000000000000000',
			__v: 0,
			product: '000000000000000000000000',
			comment: '',
			rating: 0,
			user: {
				name: {
					first: '',
					last: '',
				},
				_id: '000000000000000000000000',
			},
		},
	],
}
export default ProductDetails
