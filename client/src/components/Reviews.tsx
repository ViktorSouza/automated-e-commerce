import { IProduct } from 'shared/Types/IProduct'
import { IReview } from 'shared/Types/IReview'
import RatingStars from '@/components/RatingStars'
import { api } from '@/services/api'
import { Pagination } from '@/components/Pagination'
import Review from '@/components/Review'
import CreateReview from '@/components/CreateReview'
import { Options } from '@/components/Options'
import { useSearchParams } from 'next/navigation'
import SortBy from './SortBy'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function Reviews({
	product,
	searchParams,
}: {
	product: IProduct
	searchParams: Record<string, string>
}) {
	// const [currentPage, setCurrentPage] = useState(0)
	// const searchParams = useSearchParams()
	console.log(searchParams)
	const data: {
		reviews: IReview[]
		totalPages: 0
		currentPage: 0
		totalResults: 0
		amount: 0
	} = (
		await api.get(`/products/${product._id}/reviews`, { params: searchParams })
	).data

	const sortOptions = [
		{
			name: 'Date',
			value: 'createdAt',
		},
		{
			name: 'Highest Rate',
			value: '-rating',
		},
		{
			name: 'Lowest Rate',
			value: 'rating',
		},
		{
			name: 'Most Liked',
			value: 'vote',
		},
	]
	function sortBy(by: string) {
		// searchParams.set('sort_by', by)
		// setSearchParams(new URLSearchParams(searchParams.toString()))
		// queryClient.invalidateQueries({ queryKey: ['reviews'] })
	}

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
			<div className='flex justify-between'>
				<CreateReview />
				<SortBy sortOptions={sortOptions} />
			</div>
			{data.reviews.map((review) => (
				<Review
					key={review._id}
					review={review}
				/>
			))}
			<Pagination
				totalPages={data.totalPages}
				currentPage={data.currentPage}
			/>
		</div>
	)
}
