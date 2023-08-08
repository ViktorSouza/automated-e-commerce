'use client'
import { IReview } from '../../../shared/Types/IReview'
import { api } from '../services/api'
import RatingStars from './RatingStars'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { cn } from '../lib/utils'
import { getUser } from '../services/user'
import { IUser } from '../../../api/src/Types/IUser'
import { useRouter } from 'next/navigation'

export default function Review({
	review,
	className,
}: {
	review: IReview
	className?: string
}) {
	const [user, setUser] = useState<IUser>({
		_id: '',
		email: '',
		name: { first: '', last: '' },
		roles: [],
		wishlist: [],
	})
	const router = useRouter()
	return (
		<div
			key={review._id}
			className={cn('pt-3 my-3 border-t dark:border-zinc-900 ', className)}>
			<div className='flex gap-14 items-center'>
				<h3 className='text-lg font-medium text-primary'>{`${review.user.name.first} ${review.user.name.last}`}</h3>
				<RatingStars
					key={review._id}
					value={review.rating}
					className='text-amber-600 dark:text-amber-400'
				/>
				<p
					className='sr-only'
					title={`${review.rating || 0} stars`}>
					{review.rating || 0} stars
				</p>
				<span className='text-sm'>
					{new Date(review.createdAt || 0).toLocaleDateString()}
				</span>
			</div>
			<div className=''>
				<p className='dark:  mt-3'>{review.comment}</p>
				<div className='flex flex-row gap-10 mt-3'>
					<button
						onClick={() => {
							review.votes.some((vote) => vote.user === user._id)
								? api.delete(`/reviews/${review._id}/votes`).then(() => {
										//TODO enable
										// queryClient.invalidateQueries(['reviews'])
										router.refresh()
								  })
								: api.put(`/reviews/${review._id}/votes`).then(() => {
										//TODO enable
										// queryClient.invalidateQueries(['reviews'])
										router.refresh()
								  })
						}}
						className='cursor-pointer dark:hover:bg-zinc-900 px-2 py-1 rounded transition-all text-primary'>
						<i className='bi bi-chevron-up mr-2'></i>
						<span className='dark:text-zinc-400 text-sm font-medium'>
							{review.votes.length}
						</span>
					</button>
					<div className='cursor-pointer dark:hover:bg-zinc-900 text-primary px-2 py-1 rounded transition-all'>
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
