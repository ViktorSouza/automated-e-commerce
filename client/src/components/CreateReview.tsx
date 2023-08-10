'use client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useContext, useState } from 'react'
import { Slider } from './ui/slider'
import RatingStars from './RatingStars'
import Review from './Review'
import { Controller, useForm } from 'react-hook-form'
import { User } from '../../../shared/Types/IReview'
// import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { api } from '../services/api'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function CreateReview() {
	// const [rating, setRating] = useState(0)
	const params = useParams()
	const id = params?.id ?? ''
	const [open, setOpen] = useState(false)
	const { user } = useContext(UserContext)
	// const queryClient = useQueryClient()
	const {
		register,
		watch,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<{
		comment: string
		votes: { createdAt: Date; user: string }[]
		rating: number
		product: string
		user: User
	}>({})

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger className='text-primary hover:bg-primary-foreground p-1 rounded-md'>
				Create a Review
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Review</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(
						(data) => {
							const review = {
								comment: data.comment,
								rating: data.rating,
								product: id,
							}
							console.log(data)

							api
								.post('/reviews', review)
								.then((res) => {
									// queryClient.invalidateQueries(['reviews'])
									toast(JSON.stringify(res.data), {})
									setOpen(false)
									reset()
								})
								.catch(console.log)
						},
						(e) => {
							setOpen(false)
						},
					)}
					className='flex flex-col gap-5 justify-start'>
					<span className='text-red-500'>*still creating</span>
					<div>
						<label htmlFor='email'>Your review</label>
						<textarea
							className='input w-full'
							{...register('comment', { required: true, maxLength: 215 })}
							id='review-message'
							placeholder='Your message...'
							required
						/>
					</div>
					<div className='flex gap-3 items-center'>
						<label htmlFor='stars'>Stars</label>
						<Controller
							name='rating'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<Slider
									onValueChange={(value) => onChange(value[0])}
									max={5}
									onBlur={onBlur}
									value={[value]}
									onValueCommit={(value) => onChange(value[0])}
									defaultValue={[5]}
									step={1}
								/>
							)}
						/>
						<RatingStars value={watch('rating')} />
					</div>
					<button className='bg-sky-500  p-2 rounded-md text-white'>
						Create Review
					</button>
					<div>
						<h1 className='text-primary'>Preview</h1>
						<Review
							className='border-t-0'
							review={{
								createdAt: new Date(Date.now()).toString(),
								_id: '',
								product: (id as string) ?? '',
								__v: 1,
								rating: watch('rating'),
								user: { _id: user._id.toString(), name: user.name },
								votes: [],
								comment: watch('comment'),
							}}
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
