import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Admin() {
	const { data: infos } = useQuery<
		unknown,
		unknown,
		{ title: string; value: string }[]
	>({
		placeholderData: [],
		keepPreviousData: true,
		queryFn: async () => {
			const res = await api.get('/admin')
			return res.data.infos
		},
		queryKey: ['values'],
	})
	if (!infos) return null
	return (
		<div className=''>
			<span className='text-red-500'>*still working on it</span>
			<h1 className='py-4 font-semibold text-h1 text-zinc-900 dark:text-zinc-200'>
				Admin
			</h1>
			<ul className='grid grid-cols-4'>
				{infos.map((info) => (
					<li
						key={info.title}
						className=''>
						<h1 className='text-sm'>{info.title}</h1>
						<p className='text-zinc-900 dark:text-zinc-200 font-semibold text-h2'>
							{info.value}
						</p>
					</li>
				))}
			</ul>
		</div>
	)
}
