import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { api } from '../services/api'
import { IOrder } from '../../../shared/Types/IOrder'

export function Orders() {
	const { data } = useQuery<
		unknown,
		unknown,
		{
			orders: IOrder[]
			totalPages: number
			currentPage: number
			totalResults: number
			amount: number
		}
	>({
		async queryFn() {
			return (await api.get('/orders')).data as { orders: IOrder[] }
		},
		queryKey: ['order', 1],
	})

	console.log(data)
	return (
		<div>
			<h1 className='text-h2 font-semibold mb-5 	text-zinc-900 dark:text-zinc-200'>
				Orders
			</h1>

			<ul className='divide-y dark:divide-zinc-900  flex flex-col-reverse'>
				{data?.orders.map((order) => {
					return (
						<li
							key={order._id}
							className='grid grid-cols-5 justify-between p-3'>
							<div>
								<h1 className='text-zinc-900 dark:text-zinc-200 font-medium mb-3'>
									Status
								</h1>
								<span
									className={`${
										order.status === 'pendent'
											? 'text-amber-500'
											: 'text-green-500'
									}`}>
									{order.status}
								</span>
							</div>
							<div>
								<h1 className='text-zinc-900 dark:text-zinc-200 font-medium mb-3'>
									Date
								</h1>
								<span>{new Date(order.createdAt).toLocaleDateString()}</span>
							</div>
							<div>
								<h1 className='text-zinc-900 dark:text-zinc-200 font-medium mb-3'>
									Total
								</h1>
								<span>{order.total}</span>
							</div>
							<div>
								<h1 className='text-zinc-900 dark:text-zinc-200 font-medium'>
									Details
								</h1>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
