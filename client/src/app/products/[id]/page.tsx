import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import RatingStars from '@/components/RatingStars'
import { IProduct } from 'shared/Types/IProduct'
import { IReview } from 'shared/Types/IReview'
import { getProducts, getSingleProduct } from '@/services/product'
import { InputNumber } from '@/components/InputNumber'
import { CEPInput } from '@/components/CEPInput'
import Reviews from '@/components/Reviews'
import { getCart } from '@/services/cart'
import { ICartPopulated } from 'shared/Types/ICart'
import { getUser } from '@/services/user'
import { AddToWishlist } from '../../../components/AddToWishlist'
import ProductCard from '../../../components/ProductCard'

export default async function ProductDetails({
	params,
	searchParams,
}: {
	searchParams: {}
	params: { id: string }
}) {
	const cart = await getCart()

	const infos: { product: IProduct; reviews: IReview[] } =
		await getSingleProduct(params.id, { get_reviews: true })

	const fiveProducts = await getProducts({ search: infos.product.title })
	const user = await getUser()

	const isWished =
		user?.wishlist.some((wish) => wish._id == infos.product._id) ?? false

	return (
		<>
			<section className='w-12/12'>
				<div className='md:grid grid-cols-2  h-3/6 justify-items-stretch'>
					<div className='flex justify-stretch rounded-lg overflow-hidden bg-zinc-900 md:h-[493px]'>
						<img
							className='object-cover h-12/12 w-12/12'
							src={infos.product.image}
							alt=''
						/>
					</div>
					<div className='col-start-2 col-end-3 md:px-5'>
						<div className='mb-5 flex flex-col'>
							<h1 className='text-4xl font-semibold text-primary'>
								{infos.product.title}
							</h1>
							<RatingStars
								className='text-amber-600 md:order-2 dark:text-amber-400'
								value={infos.product.averageRating || 0}
							/>
						</div>

						<div className='my-5 flex gap-2'>
							<div>
								<h3 className='text-1xl font-semibold text-primary'>Colors</h3>
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
							<h2 className='text-3xl font-semibold text-primary'>
								${infos.product.price.toFixed(2)}
							</h2>
							<p className='text-xs dark:text-zinc-400 font-semibold'>
								in 12x of ${(infos.product.price / 12).toFixed(2)}
							</p>
						</div>

						<div className='my-5 flex flex-col-reverse md:flex-row gap-5'>
							<div>
								<span className='text-sm md:hidden pl-1 text-zinc-500'>
									Items
								</span>
								<InputNumber
									className='w-full'
									// onClickIncrease={() =>
									// 	updateCart({
									// 		product: infos.product._id,
									// 		quantity:
									// 			(cart?.products.find(
									// 				(cartProduct) =>
									// 					cartProduct.product._id == infos.product._id,
									// 			)?.quantity ?? 0) + 1,
									// 	})
									// }
									// onClickDecrease={() =>
									// 	updateCart({
									// 		product: infos.product._id,
									// 		quantity:
									// 			(cart?.products.find(
									// 				(cartProduct) =>
									// 					cartProduct.product._id == infos.product._id,
									// 			)?.quantity ?? 0) - 1,
									// 	})
									// }
									value={
										cart?.products.find(
											(cartProduct) =>
												cartProduct.product._id == infos.product._id,
										)?.quantity
									}
								/>
							</div>
							<button
								className='bg-sky-500 transition ease-in-out hover:bg-sky-400  px-10 p-2 rounded-lg text-white'
								//TODO enable
								// onClick={() =>
								// 	updateCart({
								// 		product: infos.product._id,
								// 		quantity:
								// 			(cart?.products.find(
								// 				(cproduct) =>
								// 					cproduct.product._id === infos.product._id,
								// 			)?.quantity ?? 0) + 1,
								// 	})
								// }
							>
								Add to cart
							</button>
						</div>
						<div className='my-5 flex items-baseline gap-10'>
							<AddToWishlist
								isWished={isWished}
								productId={infos.product._id}
							/>

							<button
								className='flex items-baseline text-primary'
								//TODO enable
								// onClick={() =>
								// 	navigator.clipboard.writeText(window.location.href)
								// }
							>
								<i className='bi bi-share-fill mr-2'></i>
								<span className=' font-semibold'>Share</span>
							</button>
						</div>
						<CEPInput />
					</div>
				</div>
				<Accordion
					type='single'
					collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='text-primary'>
							Description
						</AccordionTrigger>
						<AccordionContent>{infos.product.description}</AccordionContent>
					</AccordionItem>
				</Accordion>
				<section className='my-5'>
					<h1 className='py-4 font-semibold text-4xl text-primary'>
						You may also like
					</h1>
					<div className='grid gap-6 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 auto-cols-fr'>
						{fiveProducts.products
							.filter((product) => product._id !== infos.product._id)
							.slice(5, 9)
							.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									isWished={isWished}
								/>
							))}
					</div>
				</section>
				<Reviews
					product={infos.product}
					searchParams={searchParams}
				/>
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
