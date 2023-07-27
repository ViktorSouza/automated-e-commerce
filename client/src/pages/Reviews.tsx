import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '../../../shared/Types/IProduct'
import { IReview } from '../../../shared/Types/IReview'
import RatingStars from '../components/RatingStars'
import { api } from '../services/api'
import { Pagination } from '../components/Pagination'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext'

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
			<h1 className='font-semibold text-h1 mb-4 text-zinc-900 dark:text-zinc-200'>
				Reviews
			</h1>
			<div className='flex w-full h-56 gap-5'>
				<div className='space-y'>
					<h2 className='text-7xl  font-medium text-zinc-900 dark:text-zinc-200'>
						{product.averageRating.toFixed(1)}
					</h2>
					<span className='sr-only'>stars</span>
					<RatingStars
						value={product.averageRating}
						className='text-amber-600 dark:text-amber-400'
					/>
					<p>{product.numOfReviews} reviews</p>
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
				<div
					key={review._id}
					className='pt-3 my-3 border-t dark:border-zinc-900'>
					<div className='flex gap-14 items-center'>
						<h3 className='text-lg font-medium text-zinc-900 dark:text-zinc-200'>{`${review.user.name.first} ${review.user.name.last}`}</h3>
						<div className='flex gap-2'>
							<p title={`${review.rating || 0} stars`}>{review.rating || 0}</p>
							<RatingStars
								key={review._id}
								value={review.rating}
								className='text-amber-600 dark:text-amber-400'
							/>
						</div>
					</div>
					<div className=''>
						<p className='dark:  mt-3'>{review.comment}</p>
						<div className='flex flex-row gap-10 mt-3'>
							<div className='cursor-pointer dark:hover:bg-zinc-900 px-2 py-1 rounded transition-all text-zinc-900 dark:text-zinc-200'>
								<i className='bi bi-chevron-up mr-2'></i>
								<span className='dark:text-zinc-400 text-sm font-medium'>
									0
								</span>
							</div>
							<div className='cursor-pointer dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-200 px-2 py-1 rounded transition-all'>
								<i className='bi bi-chat-left-text mr-2'></i>
								<span className='dark:text-zinc-400 text-sm font-medium'>
									Comment
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
			<Pagination
				totalPages={data.totalPages}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</div>
	)
}
