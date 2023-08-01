import { IReview } from '../../../shared/Types/IReview'
import RatingStars from './RatingStars'

export default function Review({ review }: { review: IReview }) {
	return (
		<div
			key={review._id}
			className='pt-3 my-3 border-t dark:border-zinc-900'>
			<div className='flex gap-14 items-center'>
				<h3 className='text-lg font-medium text-zinc-900 dark:text-zinc-200'>{`${review.user.name.first} ${review.user.name.last}`}</h3>
				<div className='flex gap-2'>
					<RatingStars
						key={review._id}
						value={review.rating}
						className='text-amber-600 dark:text-amber-400'
					/>
					<p title={`${review.rating || 0} stars`}>{review.rating || 0}</p>
				</div>
				<span>{new Date(Date.now()).toLocaleDateString()}</span>
			</div>
			<div className=''>
				<p className='dark:  mt-3'>{review.comment}</p>
				<div className='flex flex-row gap-10 mt-3'>
					<div className='cursor-pointer dark:hover:bg-zinc-900 px-2 py-1 rounded transition-all text-zinc-900 dark:text-zinc-200'>
						<i className='bi bi-chevron-up mr-2'></i>
						<span className='dark:text-zinc-400 text-sm font-medium'>0</span>
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
	)
}
