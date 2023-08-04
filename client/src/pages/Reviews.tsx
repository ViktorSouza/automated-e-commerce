import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '../../../shared/Types/IProduct'
import { IReview } from '../../../shared/Types/IReview'
import RatingStars from '../components/RatingStars'
import { api } from '../services/api'
import { Pagination } from '../components/Pagination'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Review from '../components/Review'

export default function Reviews({ product }: { product: IProduct }) {
	const [currentPage, setCurrentPage] = useState(0)
	const { data } = useQuery<{
		reviews: IReview[]
		totalPages: 0
		currentPage: 0
		totalResults: 0
		amount: 0
	}>({
		keepPreviousData: true,
		placeholderData: {
			reviews: [],
			totalPages: 0,
			currentPage: 0,
			totalResults: 0,
			amount: 0,
		},
		enabled: product._id !== '',
		async queryFn() {
			const res = await api.get(`/products/${product._id}/reviews`, {
				params: { page_number: currentPage },
			})
			return res.data
		},
		queryKey: ['reviews', currentPage],
	})

	const { setSearchParams, searchParams } = useContext(ProductContext)

	const queryClient = useQueryClient()
	//TODO refractor
	useEffect(() => {
		searchParams.set('page_number', currentPage.toString())
		setSearchParams(new URLSearchParams(searchParams.toString()))

		queryClient.refetchQueries({ queryKey: ['reviews', currentPage] })
	}, [data?.totalPages, currentPage])

	if (!data) return null
	return (
		<div className=' flex flex-col mt-10'>
			<h1 className='font-semibold text-4xl mb-4 text-primary'>Reviews</h1>
			<div className='flex w-full h-56 gap-5'>
				<div className='space-y'>
					<h2 className='text-7xl  font-medium text-primary'>
						{(Number(product.averageRating) || 0).toFixed(1)}
					</h2>
					<span className='sr-only'>stars</span>
					<RatingStars
						value={product.averageRating}
						className='text-amber-600 dark:text-amber-400'
					/>
					<p>{product.numOfReviews || 0} reviews</p>
				</div>
				<div className='flex flex-col-reverse justify-end'>
					{data.reviews
						.reduce<number[]>(
							(prev, curr, index) => {
								const newValues = [...prev]
								newValues[Number(curr.rating.toFixed(0))]++
								return newValues
							},
							[0, 0, 0, 0, 0, 0],
						)
						.map((value, index) => {
							return (
								<div
									key={index}
									className='flex items-center gap-3'>
									<RatingStars
										value={index}
										className='text-amber-600 dark:text-amber-400'
									/>
									<p className=''>{value}</p>
								</div>
							)
						})}
				</div>
			</div>
			{data.reviews.map((review) => (
				<Review
					key={review._id}
					review={review}
				/>
			))}
			<Pagination
				totalPages={data.totalPages}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</div>
	)
}
