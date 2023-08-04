import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { IProduct } from '../../../shared/Types/IProduct'
import { IReview } from '../../../shared/Types/IReview'
import ProductCard from '../components/ProductCard'
import Review from '../components/Review'

export default function Admin() {
	const { data } = useQuery<unknown, unknown, AdminData>({
		placeholderData: {},
		keepPreviousData: true,
		queryFn: async () => {
			const res = await api.get('/admin')
			return res.data
		},
		queryKey: ['values'],
	})
	if (!data) return null
	console.log(data)
	return (
		<div className=''>
			<span className='text-red-500'>*still working on it</span>
			<h1 className='py-4 font-semibold text-4xl text-zinc-900 dark:text-zinc-200'>
				Admin
			</h1>
			<ul className='grid grid-cols-4'>
				{data.infos?.map((info) => (
					<li
						key={info.title}
						className=''>
						<h1 className='text-sm'>{info.title}</h1>
						<p className='text-zinc-900 dark:text-zinc-200 font-semibold text-3xl'>
							{info.value}
						</p>
					</li>
				))}
				<li>
					<h1 className='text-3xl font-semibold mb-5 	text-zinc-900 dark:text-zinc-200'>
						Newest Product
					</h1>
					{data.newestProduct && (
						<ProductCard
							isWished={false}
							product={data.newestProduct}
						/>
					)}
				</li>
			</ul>
			<div>
				<h1 className='text-3xl font-semibold mb-5 	text-zinc-900 dark:text-zinc-200'>
					Newest Review
				</h1>
				{data.newestReview && <Review review={data.newestReview} />}
			</div>
		</div>
	)
}

type AdminData = {
	infos?: {
		title: string
		value: string
	}[]
	newestProduct?: IProduct
	newestReview?: IReview
}
